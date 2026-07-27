"use strict";

const { app } = require("@azure/functions");
const { SCOPES, getConfiguredRedirectUri, createState, buildStateCookie } = require("../shared/oauth");

/**
 * GET /api/login
 *
 * Starts the GitHub OAuth "web application flow": generates an anti-CSRF state,
 * stores it in a short-lived cookie, and redirects the popup to GitHub's
 * authorization screen. The client secret never leaves the server.
 */
app.http("login", {
    methods: ["GET"],
    authLevel: "anonymous",
    route: "login",
    handler: async (request, context) => {
        const clientId = process.env.GITHUB_CLIENT_ID;
        if (!clientId) {
            context.error("GITHUB_CLIENT_ID application setting is not configured.");
            return {
                status: 500,
                headers: { "Content-Type": "text/plain; charset=utf-8" },
                body: "GitHub sign-in is not configured. Missing GITHUB_CLIENT_ID."
            };
        }

        const state = createState();
        const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
        authorizeUrl.searchParams.set("client_id", clientId);
        authorizeUrl.searchParams.set("scope", SCOPES);
        authorizeUrl.searchParams.set("state", state);
        authorizeUrl.searchParams.set("allow_signup", "false");

        const redirectUri = getConfiguredRedirectUri();
        if (redirectUri) {
            authorizeUrl.searchParams.set("redirect_uri", redirectUri);
        }

        return {
            status: 302,
            headers: {
                Location: authorizeUrl.toString(),
                "Set-Cookie": buildStateCookie(state),
                "Cache-Control": "no-store"
            }
        };
    }
});
