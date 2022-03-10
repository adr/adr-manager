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
            .contains("adr-manager-test-repository")
            .click();
        cy.get("[data-cy=addRepoDialog]").click();
        cy.get("[data-cy=repoNameList]").click();

        // add new ADR
        cy.get("[data-cy=NewAdrFile]").click({ force: true });
        cy.get("[data-cy=titleAdr]").type("use x to accomplish y");
        // initiate commit dialog
        cy.get("[data-cy=pushIcon]").click();
        // check for dialog
        cy.get("[data-cy=btnOfDialogCommitForPush]").should("be.disabled");
        cy.get("[data-cy=mdiAlertNotSelected]").should("be.visible");
        cy.get("[data-cy=mdiAlertCommitMessage]").should("be.visible");
        // set commit message and commit
        cy.get("[data-cy=newFilesCommitMessage]").click();

        cy.get("[data-cy=newFileCheckBoxOuter]").contains(/[0-9][0-9][0-9][0-9]-use-x-to-accomplish-y.md/g);

        cy.get("[data-cy=newFileCheckBox]").check({ force: true });
        cy.get("[data-cy=mdiCheckSelected]").should("be.visible");
        cy.get("[data-cy=textFieldCommitMessage]").type(
            "Commit Message to add a new ADR."
        );
        cy.get("[data-cy=mdiCheckCommitMessage]").should("be.visible");
        // push to GitHub
        cy.intercept("GET", "**/repos/**/branches/**").as("getCommitSha");
        cy.intercept("POST", "**/repos/**/git/commits?**").as("commitRequest");
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();
        cy.wait("@getCommitSha");
        cy.wait("@commitRequest").then((val) => {
            cy.log(val.request);
            for (let item in val.request) {
                cy.log(item);
            }
            cy.log(val.request.body.author);
        });
        cy.contains("OK").click();

        // Remove repository
        cy.get("[data-cy=removeRepo]").click();
        cy.get("[data-cy=removeRepoBtn]").click();
        cy.get("[data-cy=listRepo]").should("have.length", 0);
        // Re-add the repository
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos")
            .its("response.statusCode")
            .should("eq", 200);
        cy.get("[data-cy=listRepo]")
            .contains("ADR-Manager")
            .click();
        cy.get("[data-cy=addRepoDialog]").click();

        // Check that element was added
        cy.get("[data-cy=adrList]")
            .filter(":contains(\"Use X To Accomplish Y\")")
            .should("have.length.gte", 1);

        // delete the ADR
        cy.get("[data-cy=adrList]")
            .filter(":contains(\"Use X To Accomplish Y\")")
            .find("[data-cy=deleteAdrBtn]")
            .each((el) => {
                el.click();
                cy.get("[data-cy=dialogDeleteAdrBtn] :visible").first().click();
            });

        // commit and push
        cy.wait(60000);
        cy.get("[data-cy=pushIcon]").click();
        cy.get("[data-cy=deletedFilesAdr]").click();
        cy.get("[data-cy=deletedFileCheckBox]").check({ force: true });
        cy.get("[data-cy=textFieldCommitMessage]").type("Delete File");
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();
        cy.contains("OK").click();
        cy.wait("@getCommitSha");
    });
});
