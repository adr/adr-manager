"use strict";

const crypto = require("node:crypto");

/**
 * GitHub OAuth scopes required by the ADR Manager to read and write ADRs.
 * Mirrors the scopes that were previously requested through Firebase.
 */
const SCOPES = "repo read:user gist workflow read:org";

/** Name of the short-lived cookie used to protect the OAuth flow against CSRF. */
const STATE_COOKIE = "adr_oauth_state";

// Returning null omits redirect_uri so GitHub uses the OAuth App's registered
// callback URL. Set GITHUB_REDIRECT_URI to pin it when serving from multiple hosts.
function getConfiguredRedirectUri() {
    const value = process.env.GITHUB_REDIRECT_URI;
    return value && value.trim() ? value.trim() : null;
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

function escapeForScript(value) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function appRedirectResponse(token, login) {
    const body = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Signing in…</title>
    </head>
    <body>
        <p>Completing GitHub sign-in…</p>
        <script>
            (function () {
                try {
                    localStorage.setItem("authId", ${escapeForScript(token)});
                    var login = ${escapeForScript(login || "")};
                    if (login) {
                        localStorage.setItem("user", login);
                    }
                } catch (e) {
                    console.error("Could not persist GitHub token.", e);
                }
                window.location.replace("/");
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

function errorPageResponse(message) {
    const body = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Sign-in failed</title>
    </head>
    <body style="font-family: sans-serif; text-align: center; padding: 2rem;">
        <h1>GitHub sign-in failed</h1>
        <p>${escapeHtml(message)}</p>
        <p><a href="/">Return to ADR Manager</a></p>
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
    getConfiguredRedirectUri,
    createState,
    buildStateCookie,
    parseCookies,
    appRedirectResponse,
    errorPageResponse
};
