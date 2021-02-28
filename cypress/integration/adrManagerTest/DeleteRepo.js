/* eslint-disable no-undef */
import { authId } from "./constants.js"

context("Test delete repository function", () => {
    it('Should delete a repo', () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", authId);
        cy.visit("http://localhost:8080/#/manager");

        // Add repo
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
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