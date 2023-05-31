import { TEST_BASE_URL } from "../../support/e2e";

context("Listing and adding repositories", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("PIZZLY_E2E_AUTH_ID"));
        cy.visit(TEST_BASE_URL);

        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
    });

    it("Check if at least 1 repository is displayed", () => {
        cy.get("[data-cy=listRepo]").should("have.length.greaterThan", 0);
    });

    it("Add all repositories", () => {
        cy.get("[data-cy=listRepo]").then((listing) => {
            const numberOfAddedRepositories = 3;

            let counter = 0;
            // add each repo with a click
            cy.get("[data-cy=listRepo]").each(() => {
                counter++;
                if (counter > numberOfAddedRepositories) {
                    return;
                }
                cy.get("[data-cy=listRepo]").eq(0).click();
            });

            // confirm repo adding dialog
            cy.get("[data-cy=addRepoDialog]").click();
            cy.intercept("GET", "**/repos**").as("showRepos");
            cy.wait("@showRepos", { timeout: 15000 });

            // check if the correct number of repos was added
            cy.get("[data-cy=repoNameList]").children().should("have.length", numberOfAddedRepositories);
        });
    });
});
