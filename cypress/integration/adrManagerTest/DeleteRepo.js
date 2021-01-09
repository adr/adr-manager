/* eslint-disable no-undef */

context("Test delete repository function", () => {
    it('Should delete a repo', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        // Add repo
        cy.get('[data-cy=addRepo]').click();
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').contains('ResearchProject').click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();

        // Delete repo
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();
        cy.get('[data-cy=listRepo]').should('have.length', 0);
        cy.get('[data-cy=addRepo]').should(() => {
            expect(localStorage.getItem('addedRepositories')).to.eq('[]');
        })
    });
})