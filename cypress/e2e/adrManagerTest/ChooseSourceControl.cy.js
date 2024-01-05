import { TEST_BASE_URL } from "../../support/e2e";
context("Choosing from different source control soptions", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("OAUTH_E2E_AUTH_ID"));
        window.localStorage.setItem("user", Cypress.env("USER"));
        cy.visit(TEST_BASE_URL);
    })

    it('Different source control options should be visible', () => {
        cy.get("[data-cy=disconnect]").click()
        cy.get("[data-cy=connectToGithub]").click();
        cy.get("[data-cy=loadOptions]").should('exist');
    });
})