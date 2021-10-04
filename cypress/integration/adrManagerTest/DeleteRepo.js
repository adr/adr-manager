/* eslint-disable no-undef */

context("Deleting repositories", () => {
    it("Remove a repo", () => {
        window.localStorage.clear();
        window.localStorage.setItem(
            "authId",
            Cypress.env("PIZZLY_E2E_AUTH_ID")
        );
        cy.visit("http://localhost:8080/#/manager");

        // add ADR Manager repo
        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos")
            .its("response.statusCode")
            .should("eq", 200);

        cy.get("[data-cy=listRepo]")
            .contains("ADR-Manager")
            .click();
        cy.get("[data-cy=addRepoDialog]").click();
        cy.get("[data-cy=repoNameList]").click();

        // delete repo
        cy.get("[data-cy=removeRepo]").click();
        cy.get("[data-cy=removeRepoBtn]").click();
        cy.get("[data-cy=listRepo]").should("have.length", 0);
        cy.get("[data-cy=addRepo]").should(() => {
            expect(localStorage.getItem("addedRepositories")).to.eq("[]");
        });
    });
});
