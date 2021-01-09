/* eslint-disable no-undef */
/// <reference types="cypress" />
context("Test commit and push file --> delete file in repo (push)", () => {
    it('Should create a new file, then push it to GitHub. Then delete file in GitHub', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        // Add repo
        cy.get('[data-cy=addRepo]').click();
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(0).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();

       // Add new file
       cy.get('[data-cy=NewAdrFile]').click({force: true});
       cy.contains('0000-*').click();
       cy.get('[data-cy=pushIcon]').click();
       
       // Check dialogn commit & push
       cy.get('[data-cy=btnOfDialogCommitForPush]').should('be.disabled');
       cy.get('[data-cy=mdiAlertNotSelected]').should('be.visible');
       cy.get('[data-cy=mdiAlertCommitMessage]').should('be.visible');
       cy.get('[data-cy=newFilesCommitMessage]').click();
       cy.get('[data-cy=newFileCheckBox]').check({force: true});
       cy.get('[data-cy=mdiCheckSelected]').should('be.visible');
       cy.get('[data-cy=textFieldCommitMessage]').type("Etwas");
       cy.get('[data-cy=mdiCheckCommitMessage]').should('be.visible');
       cy.get('[data-cy=btnOfDialogCommitForPush]').click();
       cy.intercept('POST', '**/github/repos**').as('getRepos');
       cy.contains('OK').click();
       // Delete AdrFile
       cy.wait(60000)
       cy.get('[data-cy=deleteAdrBtn]').click();
       cy.get('[data-cy=dialogDeleteAdrBtn').click();
       cy.get('[data-cy=pushIcon]').click();
       cy.get('[data-cy=deletedFilesAdr]').click();
       cy.get('[data-cy=deletedFileCheckBox]').check({force: true});
       cy.get('[data-cy=textFieldCommitMessage]').type("Delet File");
       cy.get('[data-cy=btnOfDialogCommitForPush]').click();
       cy.intercept('POST', '**/github/repos**').as('getRepos');
       cy.contains('OK').click();
    });
})