/* eslint-disable no-undef */

context("Test delete adr function", () => {
    it('Should create a new adr and then delete it', () => {
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


        // One adr in list
        cy.get('[data-cy=newADR]').click();

        // Delete Adr
        cy.get('[data-cy=deleteAdrBtn]').click();
        cy.get('[data-cy=dialogDeleteAdrBtn]').click();
        cy.get('[data-cy=adrList]').should('have.length', 0);
        cy.get('[data-cy=adrList]').should(() => {
            expect(localStorage.getItem('addedRepositories')).to.eq('[{"fullName":"researchproject2020/ResearchProject","activeBranch":"main","branches":[],"adrs":[],"addedAdrs":[],"deletedAdrs":[]}]');
        });

    });
})