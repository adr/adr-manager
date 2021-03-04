/* eslint-disable no-undef */
import { authId } from "./constants.js"

context("Test for correct URLs", () => {
    beforeEach(() => {
        // Clean up local storage
        window.localStorage.clear();
        window.localStorage.setItem("authId", authId);
        cy.visit("http://localhost:8080/#/manager");
    })

    it('URL should correspond to opened repo/ADR.', () => {

        cy.url().should('equal', "http://localhost:8080/#/manager");

        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);

        // Add one repository.
        cy.get('[data-cy=listRepo]').should('have.length', 5);
        cy.contains('researchproject2020/ResearchProject').click();

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

        // Assuming the repo does not contain an ADR, the URL should contain: full name and branch.
        cy.url().should('equal', "http://localhost:8080/#/manager/researchproject2020/ResearchProject/main");
        cy.get('[data-cy=adrList]').should('have.length', 0);

        // Add one ADR to list, this ADR should be opened automatically.
        cy.get('[data-cy=newADR]').click({force: true});

        // With an opened ADR, the URL should contain: full name, branch, adr name.
        cy.url().should('equal', "http://localhost:8080/#/manager/researchproject2020/ResearchProject/main/0001-.md");

        cy.get('[data-cy=adrList]').contains('ResearchProject').should('have.length', 0);

        // Delete the ADR
        cy.get('[data-cy=deleteAdrBtn]').click();
        cy.get('[data-cy=dialogDeleteAdrBtn]').click();
        cy.get('[data-cy=adrList]').should('have.length', 0);

        // The repo does not contain an ADR again, so the URL should contain: full name and branch.
        cy.url().should('equal', "http://localhost:8080/#/manager/researchproject2020/ResearchProject/main");

        cy.get('[data-cy=removeRepo]').click();
    });
    
    it('If the local storage does not contain the auth ID, redirect to /login.', () => {
        cy.url().should('contain', "http://localhost:8080/#/manager");
        cy.clearLocalStorage();
        cy.reload();
        cy.url().should('contain', "http://localhost:8080/#/login");
    });
})