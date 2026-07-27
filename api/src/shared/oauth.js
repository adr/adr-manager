"use strict";

const crypto = require("node:crypto");

/**
 * GitHub OAuth scopes required by the ADR Manager to read and write ADRs.
 * Mirrors the scopes that were previously requested through Firebase.
 */
const SCOPES = "repo read:user gist workflow read:org";

/** Name of the short-lived cookie used to protect the OAuth flow against CSRF. */
const STATE_COOKIE = "adr_oauth_state";

/**
 * Derive the public origin (scheme + host) of the incoming request.
 * Azure Static Web Apps sits behind a reverse proxy, so the original host is
 * exposed through the `x-forwarded-*` headers rather than `host` alone.
 *
 * @param {import("@azure/functions").HttpRequest} request
 * @returns {string} e.g. "https://white-sky-123.azurestaticapps.net"
 */
function getOrigin(request) {
    const proto = request.headers.get("x-forwarded-proto") || "https";
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
    return `${proto}://${host}`;
}

// Returning null omits redirect_uri so GitHub uses the OAuth App's registered
// callback URL. Set GITHUB_REDIRECT_URI to pin it when serving from multiple hosts.
function getConfiguredRedirectUri() {
    const value = process.env.GITHUB_REDIRECT_URI;
    return value && value.trim() ? value.trim() : null;
}

function getAppOrigin(request) {
    const configured = getConfiguredRedirectUri();
    if (configured) {
        try {
            return new URL(configured).origin;
        } catch {
            // Malformed GITHUB_REDIRECT_URI: fall through to the request host.
        }
    }
    return getOrigin(request);
}

/** Generate a cryptographically-random state value. */
function createState() {
    return crypto.randomBytes(16).toString("hex");
}

/**
 * Build the `Set-Cookie` header value that stores the OAuth state.
 * `SameSite=Lax` is required so the cookie is still sent on the top-level GET
 * redirect that GitHub performs back to `/api/callback`.
 *
 * @param {string} state
 * @returns {string}
 */
function buildStateCookie(state) {
    return `${STATE_COOKIE}=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`;
}

/** Build the `Set-Cookie` header value that clears the OAuth state cookie. */
function clearStateCookie() {
    return `${STATE_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}

/**
 * Parse a `Cookie` request header into a plain object.
 *
 * @param {string | null} cookieHeader
 * @returns {Record<string, string>}
 */
function parseCookies(cookieHeader) {
    /** @type {Record<string, string>} */
    const cookies = {};
    if (!cookieHeader) {
        return cookies;
    }
    for (const part of cookieHeader.split(";")) {
        const index = part.indexOf("=");
        if (index > -1) {
            const name = part.slice(0, index).trim();
            const value = part.slice(index + 1).trim();
            cookies[name] = decodeURIComponent(value);
        }
    }
    return cookies;
}

/**
 * Build the HTML response returned inside the OAuth popup. It relays the result
 * (token + login, or an error) to the application window via `postMessage` and
 * then closes itself. The state cookie is cleared on the way out.
 *
 * The payload is serialized with `<`, `>`, `&` and the JS line separators
 * escaped so it is safe to embed inside an inline `<script>` block.
 *
 * @param {string} targetOrigin - the exact origin allowed to receive the message
 * @param {{ token?: string, login?: string | null, error?: string }} payload
 */
function popupResultResponse(targetOrigin, payload) {
    const serialized = JSON.stringify(payload)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");

    const body = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Connecting to GitHub…</title>
    </head>
    <body>
        <p>Completing GitHub sign-in… you can close this window.</p>
        <script>
            (function () {
                var payload = ${serialized};
                var targetOrigin = ${JSON.stringify(targetOrigin)};
                try {
                    if (window.opener) {
                        window.opener.postMessage(
                            Object.assign({ source: "adr-github-oauth" }, payload),
                            targetOrigin
                        );
                    }
                } catch (e) {
                    /* If we cannot reach the opener there is nothing more to do. */
                }
                window.close();
            })();
        </script>
    </body>
</html>`;

    return {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store",
            "Set-Cookie": clearStateCookie()
        },
        body
    };
}

module.exports = {
    SCOPES,
    STATE_COOKIE,
    getOrigin,
    getAppOrigin,
    getConfiguredRedirectUri,
    createState,
    buildStateCookie,
    clearStateCookie,
    parseCookies,
    popupResultResponse
};
