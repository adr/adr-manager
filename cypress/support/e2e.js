// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
// cypress/support/index.js
import "@cypress/code-coverage/support";

export const TEST_BASE_URL = "http://localhost:8000/adr-manager/#/manager";
export const REST_LIST_REPO_URL = "**/user/repos**";
export const REST_REPO_URL = "**/repos/**";
export const REST_BRANCH_URL = "**/repos/**/branches/**";
export const REST_COMMIT_URL = "**/repos/**/git/commits?**";
