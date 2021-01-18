/* eslint-disable no-undef */

context("Test add repository", () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");
        cy.visit("http://localhost:8080/#/manager");

        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
    });

    // This is the only test that relies on having exactly 5 repositories.
    it('Check if all repositories are displayed', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5);
    });

    it('Test adding all repositories', () => {
        cy.get('[data-cy=listRepo]')
            .then(listing => {
                const listingCount = Cypress.$(listing).length;
                cy.get('[data-cy=listRepo]').each(() => {
                    cy.get('[data-cy=listRepo]').eq(0).click();
                });

                cy.get('[data-cy=noRepo]').should('have.text', ' Sorry, no repositories were found! ');

                cy.get('[data-cy=addRepoDialog]').click();
                cy.intercept('GET', '**/repos**').as('showRepos');
                cy.wait('@showRepos', {timeout: 15000});

                cy.get('[data-cy=repoNameList]').children().should('have.length', listingCount);
                cy.get('[data-cy=repoNameList]').click();

                cy.get('[data-cy=adrList]').contains('ResearchProject').should('have.length', 0);
            });
    });

    it('Test adding three repositories', () => {
        cy.get('[data-cy=listRepo]').should('have.length.greaterThan', 2);

        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();
        cy.get('[data-cy=listRepo]').eq(0).click();

        cy.get('[data-cy=addRepoDialog]').click();
        cy.intercept('GET', '**/repos**').as('showRepos');
        cy.wait('@showRepos', {timeout: 10000});

        cy.get('[data-cy=repoNameList]').children().should('have.length', 3);
        cy.get('[data-cy=repoNameList]').click();

        cy.get('[data-cy=adrList]').contains('ResearchProject').should('have.length', 0);
    });

})