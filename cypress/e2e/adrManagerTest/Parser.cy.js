import { REST_LIST_REPO_URL, TEST_BASE_URL } from "../../support/e2e";

context("Using Markdown modes", () => {
    it("Convert raw Markdown", () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("OAUTH_E2E_AUTH_ID"));
        window.localStorage.setItem("user", Cypress.env("USER"));
        cy.visit(TEST_BASE_URL);

        // add ADR Manager repo
        cy.intercept("GET", REST_LIST_REPO_URL).as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
        cy.get("[data-cy=listRepo]").contains("ADR-Manager").click();
        cy.get("[data-cy=addRepoDialog]").click();
        cy.get("[data-cy=repoNameList]").click();

        // add a new ADR
        cy.get("[data-cy=repoNameList]").click();
        cy.get("[data-cy=newADR]").click();

        // switch to raw Markdown mode
        cy.contains(" Raw Markdown ").click();
        // clear existing Markdown in new ADR
        cy.get("[data-cy=markdownText]").click().type("{ctrl+a}{del}");
        // input Markdown that doesn't correspond to the MADR template
        cy.get("[data-cy=markdownText]")
            .click()
            .type(
                "# ADR-Manager Test\n> All artefacts related to a research project to propose a tool-supported approach for the efficient creation and management of [architectural decision records (ADRs)](https://adr.github.io) via a graphical user interface (GUI)\n## Developer Instructions"
            );
        // navigate to conversion view
        cy.contains(" Convert ").click();
        // check for some required UI elements
        cy.get("[data-cy=convertEditor]").should(($editor) => {
            expect($editor).to.contain("https://github.com/adr/madr/blob/master/template/template.md");
            expect($editor).to.contain("Your ADR");
            expect($editor).to.contain("Result");
        });
        // accept the conversion
        cy.get("[data-cy=acceptDiv]").click();

        // check title
        cy.get("[data-cy=titleAdr]").should("have.value", "ADR-Manager Test");
        // switch to Markdown preview mode
        cy.contains(" Markdown Preview ").click();
        // check title
        cy.get("[data-cy=markdownPreview]").should("contain", "ADR-Manager Test");
    });
});
