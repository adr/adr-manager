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
        cy.writeFile('cypress/fixtures/CounterDiffPerRepo.json', { counter: "0" });
        cy.writeFile('cypress/fixtures/CounterAdrsPerRepo.json', { counter: "0" });
    })

    it('Should test empirical add and open function of jabref repo', () => {
        cy.writeFile('cypress/fixtures/CounterDiffAllRepos.json', { counter: "0" });
        cy.writeFile('cypress/fixtures/CounterAdrsAllRepos.json', { counter: "0" });
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(1).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 21).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('header').then(($a) => {
                cy.log('text', $a.text())
                if ($a.text().includes('Convert')) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                    cy.readFile('cypress/fixtures/CounterDiffAllRepos.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('1not visible')
                cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
                cy.readFile('cypress/fixtures/CounterAdrsAllRepos.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();

        cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
            cy.log('diff', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
            cy.log('adr', counter.counter)
        })
    });

    it('Should test empirical add and open function of adr-tools repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(2).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 0);
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();
    });

    it('Should test empirical add and open function of adr-log repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(3).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 7).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('header').then(($a) => {
                cy.log('text', $a.text())
                if ($a.text().includes('Convert')) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                    cy.readFile('cypress/fixtures/CounterDiffAllRepos.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('1not visible')
                cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
                cy.readFile('cypress/fixtures/CounterAdrsAllRepos.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();

        cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
            cy.log('diff', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
            cy.log('adr', counter.counter)
        })
    });

    it('Should test empirical add and open function of madr repo', () => {
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(4).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=adrList]').should('have.length', 14).each(($adr, index, $adrs) => {
            cy.get($adr).click();
            cy.get('header').then(($a) => {
                cy.log('text', $a.text())
                if ($a.text().includes('Convert')) {
                    cy.log('visible')
                    cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                    cy.readFile('cypress/fixtures/CounterDiffAllRepos.json').then((counter) => {
                        cy.writeFile('cypress/fixtures/CounterDiffAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                    })
                } else cy.log('1not visible')
                cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsPerRepo.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
                cy.readFile('cypress/fixtures/CounterAdrsAllRepos.json').then((counter) => {
                    cy.writeFile('cypress/fixtures/CounterAdrsAllRepos.json', { counter: (parseInt(counter.counter) + 1).toString() });
                })
            })
        })
        cy.get('[data-cy=removeRepo]').click();
        cy.get('[data-cy=removeRepoBtn]').click();

        cy.readFile('cypress/fixtures/CounterDiffPerRepo.json').then((counter) => {
            cy.log('diff', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterAdrsPerRepo.json').then((counter) => {
            cy.log('adr', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterDiffAllRepos.json').then((counter) => {
            cy.log('diff', counter.counter)
        })
        cy.readFile('cypress/fixtures/CounterAdrsAllRepos.json').then((counter) => {
            cy.log('adr', counter.counter)
        })
    });
})