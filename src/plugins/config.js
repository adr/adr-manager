/* global __ADR_ROOT_FOLDER__ */

/**
 * Root folder (inside a linked repository) where the ADR Manager looks for and
 * creates ADRs.
 *
 * Configurable at build time through the `ADR_ROOT_FOLDER` environment variable,
 * which is injected as the compile-time constant `__ADR_ROOT_FOLDER__` by
 * vite.config.js. When the variable is not set it defaults to "adr/decisions".
 *
 * The value is normalized to have no leading slash and exactly one trailing
 * slash (e.g. "adr/decisions/"), because ADR file paths are built by concatenation:
 * `ADR_ROOT_FOLDER + "0001-some-title.md"`.
 */
const rawAdrRootFolder = typeof __ADR_ROOT_FOLDER__ === "string" ? __ADR_ROOT_FOLDER__ : "adr/decisions";

export const ADR_ROOT_FOLDER = rawAdrRootFolder.trim().replace(/^\/+|\/+$/g, "") + "/";
