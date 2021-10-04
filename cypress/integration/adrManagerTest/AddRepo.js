/* eslint-disable no-undef */

context("Listing and adding repositories", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem(
            "authId",
            Cypress.env("PIZZLY_E2E_AUTH_ID")
        );
        cy.visit("http://localhost:8080/#/manager");

        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos")
            .its("response.statusCode")
            .should("eq", 200);
    });

    it("Check if at least 1 repository is displayed", () => {
        cy.get("[data-cy=listRepo]").should("have.length.greaterThan", 0);
    });

    it("Add all repositories", () => {
        cy.get("[data-cy=listRepo]").then(listing => {
            const listingCount = Cypress.$(listing).length;
            // add each repo with a click
            cy.get("[data-cy=listRepo]").each(() => {
                cy.get("[data-cy=listRepo]")
                    .eq(0)
                    .click();
            });

            // check if the text for no further repos is displayed
            cy.get("[data-cy=noRepo]").should(
                "have.text",
                " Sorry, no repositories were found! "
            );

            // confirm repo adding dialog
            cy.get("[data-cy=addRepoDialog]").click();
            cy.intercept("GET", "**/repos**").as("showRepos");
            cy.wait("@showRepos", { timeout: 15000 });

            // check if the correct number of repos was added
            cy.get("[data-cy=repoNameList]")
                .children()
                .should("have.length", listingCount);
        });
    });
});
