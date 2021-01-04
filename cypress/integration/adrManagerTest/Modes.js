/* eslint-disable no-undef */

context("Test modes", () => {
    it('Should select and fill untested fields', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        // Add repo
        cy.get('[data-cy=addRepo]').click();
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();


        // One adr in list
        cy.get('[data-cy=newADR]').click();
        
        // Clicks through modes
        cy.contains(' advanced ').click();
        cy.contains(' professional ').click();
        
        // Select status
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('proposed').click();
        cy.get('[data-cy=statusPro]').click();
        cy.get('.v-list-item__title').contains('rejected').click();
        cy.get('[data-cy=statusPro]').should('have.class', 'red red--text');
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
        cy.get('[data-cy=considerOptTextAdr]').type('Cons. opt.');
        
        cy.get('[data-cy=considerOptAddBtnAdr]').click();
        cy.get('[data-cy=considerOptAddBtnAdr]').click();
        cy.get('[data-cy=considerOptAddBtnAdr]').click();
        cy.get('[data-cy=considerOptAddBtnAdr]').click();
        cy.get('[data-cy=considerOptAddBtnAdr]').click();
    });
})