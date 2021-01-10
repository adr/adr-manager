/* eslint-disable no-undef */

context("Test delete adr function", () => {
    
    it('Should create a new adr and then delete it', () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");
        cy.visit("http://localhost:8080/manager");

        // Add repo
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.get('[data-cy=addRepo]').click();
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').contains('ResearchProject').click();
        cy.get('[data-cy=addRepoDialog]').click();

        // If the repository is not expanded automatically, click on it.
        cy.get("[data-cy=newADR]").then($header => {
            if ($header.is(':visible')) {
                //you get here only if button EXISTS and is VISIBLE
            } else {
                //you get here only if button EXISTS but is INVISIBLE
                cy.get('[data-cy=repoNameList]').click();
            }
        });

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