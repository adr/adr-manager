/* eslint-disable no-undef */

context("Routing and correct URLs", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem(
            "authId",
            Cypress.env("PIZZLY_E2E_AUTH_ID")
        );
        cy.visit("http://localhost:8080/#/manager");
    });

    it("URL corresponds to opened repo and ADR", () => {
        cy.url().should("equal", "http://localhost:8080/#/manager");

        // add the ADR-Manager repo
        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos")
            .its("response.statusCode")
            .should("eq", 200);
        cy.get("[data-cy=listRepo]")
            .contains("ADR-Manager")
            .click();
        cy.get("[data-cy=addRepoDialog]").click();

        // URL should contain full name, branch, and ADR name
        cy.url().should(
            "equal",
            "http://localhost:8080/#/manager/adr/adr-manager/main/0000-use-markdown-architectural-decision-records.md"
        );

        cy.get("[data-cy=adrList]").then(adrList => {
            // get number of ADRs in repo
            const adrCount = Cypress.$(adrList).length;
            expect(adrCount).to.be.greaterThan(3);
            // add new ADR, it should be opened automatically
            cy.get("[data-cy=newADR]").click({ force: true });
            // with an opened ADR, the URL should contain full name, branch, and new ADR name
            cy.url().should(
                "equal",
                `http://localhost:8080/#/manager/adr/adr-manager/main/${String(
                    adrCount
                ).padStart(4, "0")}-.md`
            );

            // remove all ADRs
            cy.get("[data-cy=deleteAdrBtn]").each($el => {
                cy.wrap($el).click();
                cy.get("[data-cy=dialogDeleteAdrBtn]").click();
            });

            // URL should contain full name and branch
            cy.url().should(
                "equal",
                "http://localhost:8080/#/manager/adr/adr-manager/main"
            );
        });
    });

    it("Redirect to /login if localStorage does not contain the authId", () => {
        cy.url().should("contain", "http://localhost:8080/#/manager");
        cy.clearLocalStorage();
        cy.reload();
        cy.url().should("contain", "http://localhost:8080/#/login");
    });
});
