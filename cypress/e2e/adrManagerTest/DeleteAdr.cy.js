import { TEST_BASE_URL } from "../../support/e2e";

context("Deleting an ADR from a repo", () => {
    it("Remove one ADR", () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("PIZZLY_E2E_AUTH_ID"));
        cy.visit(TEST_BASE_URL);

        // add the ADR-Manager repo
        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
        cy.get("[data-cy=listRepo]").contains("ADR-Manager").click();
        cy.get("[data-cy=addRepoDialog]").click();
        cy.intercept("GET", "**/repos**").as("showRepos");
        cy.wait("@showRepos", { timeout: 10000 });

        cy.get("[data-cy=adrList]").then((adrList) => {
            // get number of ADRs in repo
            const adrCount = Cypress.$(adrList).length;

            // delete the last one
            cy.get("[data-cy=deleteAdrBtn]").eq(0).click();
            cy.get("[data-cy=dialogDeleteAdrBtn]").click();
            // check if it's gone
            cy.get("[data-cy=adrList]").should("have.length", adrCount - 1);

            cy.get("[data-cy=adrList]").should(() => {
                // check if localeStorage has been set accordingly
                const addedRepos = JSON.parse(localStorage.getItem("addedRepositories"));
                expect(addedRepos[0].adrs.length).to.eq(adrCount - 1);
                expect(addedRepos[0].deletedAdrs.length).to.eq(1);
            });
        });
    });
});
