/* eslint-disable no-undef */
/// <reference types="cypress" />

import { authId } from "./constants.js"

context("Test commit and push file --> delete file in repo (push)", () => {
    it('Should create a new file, then push it to GitHub. Then delete file in GitHub', () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", authId);
        cy.visit("http://localhost:8080/#/manager");

        // Add repo
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(0).click();
        
        cy.intercept('GET', '**/repos**').as('showRepos');
        cy.get('[data-cy=addRepoDialog]').click();
        cy.intercept('GET', '**/repos**').as('showRepos');
        cy.wait('@showRepos', {timeout: 10000});
        
        // If the repository is not expanded automatically, click on it.
        cy.get("body").then($body => {
            if ($body.find("[data-cy=newADR]").length > 0) {
                //if button exists at all
                cy.get("[data-cy=newADR]").then($header => {
                    if (!$header.is(':visible')) {
                        //if button is INVISIBLE
                        cy.get('[data-cy=repoNameList]').click();
                    }
                });
            } else {
                //if the button DOESN'T EXIST
                cy.get('[data-cy=repoNameList]').click();
            }
        });

       // Add new file
       cy.get('[data-cy=NewAdrFile]').click({force: true});
       cy.contains('0001-*').click();
       cy.get('[data-cy=pushIcon]').click();
       
       // Check dialog commit & push
       cy.get('[data-cy=btnOfDialogCommitForPush]').should('be.disabled');
       cy.get('[data-cy=mdiAlertNotSelected]').should('be.visible');
       cy.get('[data-cy=mdiAlertCommitMessage]').should('be.visible');
       cy.get('[data-cy=newFilesCommitMessage]').click();
       cy.get('[data-cy=newFileCheckBox]').check({force: true});
       cy.get('[data-cy=mdiCheckSelected]').should('be.visible');
       cy.get('[data-cy=textFieldCommitMessage]').type("Commit Message to add a new ADR.");
       cy.get('[data-cy=mdiCheckCommitMessage]').should('be.visible');
       cy.get('[data-cy=btnOfDialogCommitForPush]').click();
       cy.intercept('POST', '**/github/repos**').as('getRepos');
       cy.wait('@getRepos');
       cy.contains('OK').click();
       cy.get('[data-cy=deleteAdrBtn]').click();
       cy.get('[data-cy=dialogDeleteAdrBtn').click();

       // Delete AdrFile
       cy.wait(60000);
       cy.get('[data-cy=pushIcon]').click();
       cy.get('[data-cy=deletedFilesAdr]').click();
       cy.get('[data-cy=deletedFileCheckBox]').check({force: true});
       cy.get('[data-cy=textFieldCommitMessage]').type("Delete File");
       cy.get('[data-cy=btnOfDialogCommitForPush]').click();
       cy.intercept('POST', '**/github/repos**').as('getRepos');
       cy.contains('OK').click();
    });
})