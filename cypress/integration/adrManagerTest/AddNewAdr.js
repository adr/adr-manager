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
        cy.get('[data-cy=listRepo]').contains('ResearchProject').click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();


        // One adr in list
        cy.get('[data-cy=newADR]').click({force: true});
        cy.get('[data-cy=adrList]').should('have.length', 1);
        cy.get('[data-cy=adrList]').should(() => {
            expect(localStorage.getItem('addedRepositories')).to.not.eq('[]');
        });

        // Add title to new adr
        cy.get('[data-cy=titleAdr]').click();
        cy.get('[data-cy=titleAdr]').type("TestTitle");

        // Add context to new adr
        cy.get('[data-cy=contextAdr]').click();
        cy.get('[data-cy=contextAdr]').type("ContextAdr");

        // Add cons. opt. text to new adr and test the add btn
        cy.get('[data-cy=considerOptTextAdr]').children().eq(1).type('Con. Opt 1)')
            .should('have.length', 1);
        cy.get('[data-cy=considerOptTextAdr]').children().should('have.length', 2);

        // Choose decision outcome
        cy.get('[data-cy=decOutChooseAdr]').click();
        cy.get('.v-list-item__title').contains('Con. Opt 1)').click();
        cy.get('[data-cy=checkConsOptAdr]').should('be.visible');

        // Add because to decision outcome
        cy.get('[data-cy=decOutBecAdr]').click();
        cy.get('[data-cy=decOutBecAdr]').type("it has to be");
    });
})