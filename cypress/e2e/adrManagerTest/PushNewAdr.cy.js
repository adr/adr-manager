import { REST_BRANCH_URL, REST_LIST_REPO_URL, REST_COMMIT_URL, TEST_BASE_URL } from "../../support/e2e";

context("Committing, pushing, and remote-deleting an ADR", () => {
    it("Commit and push new ADR, then delete from GitHub", () => {
        const REPO_NAME = "adr/adr-test-repository-empty";
        const BRANCH_NAME = "testing-branch";

        function addRepositoryAndSwitchBranch() {
            cy.intercept("GET", REST_LIST_REPO_URL).as("getRepos");
            cy.get("[data-cy=addRepo]").click();
            cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
            cy.get("[data-cy=search-field-for-adding-repository]").type(REPO_NAME);
            cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
            cy.get("[data-cy=listRepo]").contains(REPO_NAME).click();
            cy.get("[data-cy=addRepoDialog]").click();
            cy.get("[data-cy=repoNameList]").click();

            // Select branch
            // Trigger loading of the branch
            cy.get("[data-cy=branchSelect]").trigger("click");
            // Select branch to commit to
            cy.get("[data-cy=branchSelect]").select(BRANCH_NAME);
            // Accept
            cy.contains("OK").click();

            // Make sure the branch was changed.
            cy.get("[data-cy=branchSelect]").contains(BRANCH_NAME);

            // Reloading the repository typically takes some time ...
            cy.wait(2000);
        }
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("OAUTH_E2E_AUTH_ID"));
        window.localStorage.setItem("user", Cypress.env("USER"));
        cy.visit(TEST_BASE_URL);
        addRepositoryAndSwitchBranch();

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
        cy.get("[data-cy=textFieldCommitMessage]").type("[E2ETest] Add a new ADR");
        cy.get("[data-cy=mdiCheckCommitMessage]").should("be.visible");
        // push to GitHub
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();

        cy.intercept("GET", REST_BRANCH_URL).as("getCommitSha");
        cy.intercept("POST", REST_COMMIT_URL).as("commitRequest");
        cy.contains("OK").click();

        // Remove repository
        cy.get("[data-cy=removeRepo]").click();
        cy.get("[data-cy=removeRepoBtn]").click();
        cy.get("[data-cy=listRepo]").should("have.length", 0);

        // Re-add the repository
        addRepositoryAndSwitchBranch();

        // Check that element was added
        cy.get("[data-cy=adrList]").filter(':contains("Use X To Accomplish Y")').should("have.length.gte", 1);

        // delete the ADR
        cy.get("[data-cy=adrList]")
            .filter(':contains("Use X To Accomplish Y")')
            .find("[data-cy=deleteAdrBtn]")
            .each((el) => {
                el.click();
                cy.get("[data-cy=dialogDeleteAdrBtn] :visible").first().click();
            });

        // commit and push
        cy.wait(5000);
        cy.get("[data-cy=pushIcon]").click();
        cy.get("[data-cy=deletedFilesAdr]").click();
        cy.get("[data-cy=deletedFileCheckBox]").check({ force: true });
        cy.get("[data-cy=textFieldCommitMessage]").type("[E2ETest] Delete the ADR");
        cy.get("[data-cy=btnOfDialogCommitForPush]").click();
        cy.contains("OK").click();
        cy.wait("@getCommitSha");
    });
});
