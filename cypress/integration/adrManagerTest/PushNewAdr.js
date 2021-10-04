/* eslint-disable no-undef */

context("Committing, pushing, and remote-deleting an ADR", () => {
    it("Commit and push new ADR, then delete from GitHub", () => {
        window.localStorage.clear();
        window.localStorage.setItem(
            "authId",
            Cypress.env("PIZZLY_E2E_AUTH_ID")
        );
        cy.visit("http://localhost:8080/#/manager");

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
        cy.get("[data-cy=repoNameList]").click();

        // add new ADR
        cy.get("[data-cy=NewAdrFile]").click({ force: true });
        // initiate commit dialog
        cy.get("[data-cy=pushIcon]").click();
        // check for dialog
        cy.get("[data-cy=btnOfDialogCommitForPush]").should("be.disabled");
        cy.get("[data-cy=mdiAlertNotSelected]").should("be.visible");
        cy.get("[data-cy=mdiAlertCommitMessage]").should("be.visible");
        // set commit message and commit
        cy.get("[data-cy=newFilesCommitMessage]").click();
        cy.get("[data-cy=newFileCheckBox]").check({ force: true });
        cy.get("[data-cy=mdiCheckSelected]").should("be.visible");
        cy.get("[data-cy=textFieldCommitMessage]").type(
            "Commit Message to add a new ADR."
        );
        cy.get("[data-cy=mdiCheckCommitMessage]").should("be.visible");
        // push to GitHub
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();
        cy.intercept("POST", "**/github/repos**").as("getRepos");
        cy.wait("@getRepos");
        cy.contains("OK").click();
        // delete the ADR
        cy.get("[data-cy=deleteAdrBtn]")
            .last()
            .click();
        cy.get("[data-cy=dialogDeleteAdrBtn").click();

        // commit and push
        cy.wait(62000);
        cy.get("[data-cy=pushIcon]").click();
        cy.get("[data-cy=deletedFilesAdr]").click();
        cy.get("[data-cy=deletedFileCheckBox]").check({ force: true });
        cy.get("[data-cy=textFieldCommitMessage]").type("Delete File");
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();
        cy.intercept("POST", "**/github/repos**").as("getRepos");
        cy.contains("OK").click();
    });
});
