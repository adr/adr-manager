import axios from "axios";
const BASE_URL_USER = "https://api.github.com/user";
const BASE_URL_REPO = "https://api.github.com/repos";

/**
 * Attach the current GitHub token (stored in localStorage after the OAuth popup
 * completes) to every request through an axios request interceptor.
 *
 * Using an interceptor rather than a one-time default header ensures the token
 * is picked up immediately after sign-in, without requiring a page reload, and
 * that no stale "Bearer null" header is sent before the user connects.
 */
let interceptorId = null;
const setHeaders = () => {
    if (interceptorId !== null) {
        return;
    }
    interceptorId = axios.interceptors.request.use((config) => {
        const token = localStorage?.getItem("authId");
        if (token) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    });
};
export { BASE_URL_REPO, BASE_URL_USER, setHeaders };
