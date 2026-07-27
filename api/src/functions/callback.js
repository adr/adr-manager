"use strict";

const { app } = require("@azure/functions");
const {
    getAppOrigin,
    getConfiguredRedirectUri,
    parseCookies,
    popupResultResponse,
    STATE_COOKIE
} = require("../shared/oauth");

const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";
const GITHUB_USER_URL = "https://api.github.com/user";

/**
 * GET /api/callback
 *
 * GitHub redirects here with `?code` and `?state` after the user authorizes.
 * We verify the state against the cookie, exchange the code for an access token
 * (server-side, using the client secret), optionally resolve the user's login,
 * and relay the result to the app window through the popup HTML.
 */
app.http("callback", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "callback",
    handler: async (request, context) => {
        const origin = getAppOrigin(request);
        const requestUrl = new URL(request.url);
        const code = requestUrl.searchParams.get("code");
        const state = requestUrl.searchParams.get("state");
        const oauthError = requestUrl.searchParams.get("error");

        if (oauthError) {
            const description = requestUrl.searchParams.get("error_description") || oauthError;
            return popupResultResponse(origin, { error: description });
        }

        const cookies = parseCookies(request.headers.get("cookie"));
        const expectedState = cookies[STATE_COOKIE];
        if (!code || !state || !expectedState || state !== expectedState) {
            return popupResultResponse(origin, {
                error: "Invalid or expired sign-in request. Please try connecting again."
            });
        }

        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;
        if (!clientId || !clientSecret) {
            context.error("GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET application settings are not configured.");
            return popupResultResponse(origin, {
                error: "GitHub sign-in is not configured on the server."
            });
        }

        const tokenRequestBody = {
            client_id: clientId,
            client_secret: clientSecret,
            code
        };
        const redirectUri = getConfiguredRedirectUri();
        if (redirectUri) {
            tokenRequestBody.redirect_uri = redirectUri;
        }

        try {
            const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "User-Agent": "adr-manager"
                },
                body: JSON.stringify(tokenRequestBody)
            });

            const tokenData = await tokenResponse.json().catch(() => ({}));
            if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
                context.error("GitHub token exchange failed", tokenData.error || tokenResponse.status);
                return popupResultResponse(origin, {
                    error: tokenData.error_description || "Failed to obtain a GitHub access token."
                });
            }

            const token = tokenData.access_token;
            let login = null;
            try {
                const userResponse = await fetch(GITHUB_USER_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/vnd.github+json",
                        "User-Agent": "adr-manager"
                    }
                });
                if (userResponse.ok) {
                    const user = await userResponse.json();
                    login = user && typeof user.login === "string" ? user.login : null;
                }
            } catch (userError) {
                context.warn("Could not resolve GitHub user login.", userError);
            }

            return popupResultResponse(origin, { token, login });
        } catch (error) {
            context.error("Unexpected error during GitHub OAuth callback.", error);
            return popupResultResponse(origin, {
                error: "Unexpected error while completing GitHub sign-in."
            });
        }
    }
});
