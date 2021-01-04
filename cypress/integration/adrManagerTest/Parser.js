/* eslint-disable no-undef */

context("Test new adr function", () => {
    it('Should create and fill a new adr', () => {
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
        
        cy.contains(' Markdown Preview ').click();
        cy.contains(' Raw Markdown ').click();
    });
})