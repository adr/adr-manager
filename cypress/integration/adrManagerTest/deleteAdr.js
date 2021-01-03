/* eslint-disable no-undef */

context("Test new adr function", () => {
    it('Should store the authId in local storage', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        // Add repo with no adrs inside
        cy.get('[data-cy=addRepo]').click();
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();
    })
})