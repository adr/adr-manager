/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

context("Should test empirical add and open function of adr-manager", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");
        cy.get('[data-cy=addRepo]').click();

        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
    })

    it('Should test empirical add and open function of jabref repo', () => {
        cy.writeFile('cypress/fixtures/CounterDiff.json', { counter: "0" });
        cy.writeFile('cypress/fixtures/CounterAdrs.json', { counter: "0" });
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(0).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 21).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('body').then($button => {
                if ($button.find('[data-cy=acceptDiv]').length > 0) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiff.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiff.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('not visible')
                cy.readFile('cypress/fixtures/CounterAdrs.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrs.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();
    });

    it('Should test empirical add and open function of adr-tools repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(1).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 0);
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();
    });

    it('Should test empirical add and open function of adr-log repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(2).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 7).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('body').then($button => {
                if ($button.find('[data-cy=acceptDiv]').length > 0) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiff.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiff.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('not visible')
                cy.readFile('cypress/fixtures/CounterAdrs.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrs.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();
    });

    it('Should test empirical add and open function of madr repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(3).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 14).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('body').then($button => {
                if ($button.find('[data-cy=acceptDiv]').length > 0) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiff.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiff.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('not visible')
                cy.readFile('cypress/fixtures/CounterAdrs.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrs.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();

        cy.readFile('cypress/fixtures/CounterDiff.json').then((counter) => {
            cy.log('diff', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterAdrs.json').then((counter) => {
            cy.log('adr', counter.counter)
        })
    });
})