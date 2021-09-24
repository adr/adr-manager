/* eslint-disable no-undef */
import { authId } from "./constants.js"

context("Test modes", () => {
    it('Should select and fill untested fields', () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", authId);
        cy.visit("http://localhost:8080/#/manager");

        // Add repo
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(0).click();
        
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

        // One adr in list
        cy.get('[data-cy=newADR]').click();

        // Clicks through modes
        cy.contains(' professional ').click();

        // Select status
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('rejected').click();
        cy.get('[data-cy=statusPro]').should('have.class', 'red red--text');
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('proposed').click();
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('accepted').click();
        cy.get('[data-cy=statusPro]').should('have.class', 'success success--text');
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('deprecated').click();
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('superseded').click();

        // Set author
        cy.get('[data-cy=authorPro]').click();
        cy.get('[data-cy=authorPro]').type('Max');

        // Set technical story
        cy.get('[data-cy=technicalStoryPro]').click();
        cy.get('[data-cy=technicalStoryPro]').type('Technical story here');

        // Set cons. opt.
        cy.get('[data-cy=consOptPro]').type('Cons. opt.');

        cy.get('[data-cy=descriptionConsOpt]').type('Cons. opt. description');
        cy.get('[data-cy=goodConsOpt]').type('Con. Opt 1 good').should('have.length', 1);
        cy.get('[data-cy=badConsOpt]').type('Con. Opt 1 bad').should('have.length', 1);
        
        // Choose decision outcome
        cy.get('[data-cy=decOutChooseAdr]').click();
        cy.get('.v-list-item__title').contains('Cons. opt.').click();
        
        // Write consequ.
        cy.get('[data-cy=posConseqPro]').type('Con. Opt 1 positive').should('have.length', 1);
        cy.get('[data-cy=negConseqPro]').type('Con. Opt 1 negative').should('have.length', 1);
        
        // Write Link
        cy.get('[data-cy=linkPro]').type('https://test.com').should('have.length', 1);

    });
})