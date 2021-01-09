/* eslint-disable no-undef */

context("Test add repository", () => {
    it('Shuold add a repository', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        cy.get('[data-cy=addRepo]').click();

        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        
        cy.get('[data-cy=listRepo]').should('have.length', 5);
        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();
        
        cy.get('[data-cy=noRepo]').should('have.text', ' Sorry, no repositories were found! ');
        
        cy.get('[data-cy=addRepoDialog]').click();
        cy.intercept('GET', '**/repos**').as('showRepos');
        cy.wait(5000);
        cy.wait('@showRepos');
        cy.get('[data-cy=repoNameList]').children().should('have.length', 5);
        cy.get('[data-cy=repoNameList]').click();

        cy.get('[data-cy=adrList]').contains('ResearchProject').should('have.length', 0);
    });
})