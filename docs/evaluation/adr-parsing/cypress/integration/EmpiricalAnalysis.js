/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var REPO_NAMES = [
    // These repositories are public, i.e., this test relies
    // on the functionality to load public repositories
    // into the ADR-Manager using the search field.
    "adr/adr-log",
    "adr/madr",
    "npryce/adr-tools",
    "api-platform/core",
    "archivematica/archivematica-architectural-decisions", // <- Fixed typo
    "bbc/digital-paper-edit-client",
    "bbc/digital-paper-edit-firebase",
    "change-metrics/monocle",
    "dante-ev/docker-texlive",
    "eclipse/winery",
    "elastic/cloud-on-k8s",
    "elastisys/compliantkubernetes",
    "Enalean/tuleap",
    "island-is/island.is", // <- Fixed typo
    "JabRef/jabref",
    "knizamov/ecar-charge-pricing",
    "mozilla/experimenter",
    "mozilla/fxa",
    "nodejs/nodejs.dev",
    "opendatahub-io/odh-manifests",
    "operate-first/blueprint",
    "opinionated-digital-center/architecture-decision-records",
    "raiden-network/raiden",
    "raiden-network/raiden-services",
    "Sylius/Sylius", // <- Fixed typo
    "theupdateframework/python-tuf",
    "thomvaill/log4brains",
    "UST-MICO/docs",
]

context("Empirically test if ADRs can be opened by the ADR-Manager and count how many are accepted by the parser without the 'Diff' screen.", () => {

    beforeEach(() => {
        cy.visit("http://localhost:8080/#/manager");
        window.localStorage.clear();
        window.localStorage.setItem(
            "authId",
            Cypress.env("PIZZLY_E2E_AUTH_ID")
        );

        cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos")
            .its("response.statusCode")
            .should("eq", 200);

    });

    for (var j = 0; j < REPO_NAMES.length; j++) {
        let i = j // Store loop variable into the local scope.
        function testDiff() {
            if (i == 0) {
                // In the first iteration create counters
                cy.writeFile("cypress/fixtures/CounterDiffAllRepos.json", {
                    counter: 0
                });
                cy.writeFile("cypress/fixtures/CounterAdrsAllRepos.json", {
                    counter: 0
                });
                cy.writeFile("cypress/fixtures/CounterDiffPerRepo.json", {
                    [REPO_NAMES[i]]: 0
                });
                cy.writeFile("cypress/fixtures/CounterAdrsPerRepo.json", {
                    [REPO_NAMES[i]]: 0
                });
            } else {
                // Add repo-specific counters
                cy.readFile(
                    "cypress/fixtures/CounterAdrsPerRepo.json"
                ).then(counter => {
                    counter[REPO_NAMES[i]] = 0;
                    cy.writeFile("cypress/fixtures/CounterAdrsPerRepo.json", counter);
                });
                cy.readFile(
                    "cypress/fixtures/CounterDiffPerRepo.json"
                ).then(counter => {
                    counter[REPO_NAMES[i]] = 0;
                    cy.writeFile("cypress/fixtures/CounterDiffPerRepo.json", counter);
                });
            }
            // add the repo
            cy.log(REPO_NAMES[i]);
            cy.get("[data-cy=search-field-for-adding-repository]")
                .type(REPO_NAMES[i]);
            cy.contains(REPO_NAMES[i])
                .click();
            cy.get("[data-cy=addRepoDialog]").click({ force: true });
            cy.intercept("GET", "**/repos**").as("showRepos");
            cy.wait("@showRepos", { timeout: 10000 });

            // Iterate through the ADRs and count how often the Convert Tab is opened.
            cy.get("[data-cy=adrList]")
                .each(($adr, index, $adrs) => {
                    cy.get($adr).click();
                    cy.get("header").then($a => {
                        cy.log("text", $a.text());
                        if ($a.text().includes("Convert")) {
                            cy.log("Convert Tab opened");
                            // Update Diff counters
                            cy.readFile(
                                "cypress/fixtures/CounterDiffPerRepo.json"
                            ).then(counter => {
                                counter[REPO_NAMES[i]] = counter[REPO_NAMES[i]] + 1;
                                cy.writeFile(
                                    "cypress/fixtures/CounterDiffPerRepo.json",
                                    counter
                                );
                            });
                            cy.readFile(
                                "cypress/fixtures/CounterDiffAllRepos.json"
                            ).then(counter => {
                                counter.counter = counter.counter + 1;
                                cy.writeFile(
                                    "cypress/fixtures/CounterDiffAllRepos.json",
                                    counter
                                );
                            });
                        } else cy.log(i + " not visible");

                        // Update ADR counters
                        cy.readFile(
                            "cypress/fixtures/CounterAdrsPerRepo.json"
                        ).then(counter => {
                            counter[REPO_NAMES[i]] = counter[REPO_NAMES[i]] + 1;
                            cy.writeFile(
                                "cypress/fixtures/CounterAdrsPerRepo.json",
                                counter
                            );
                        });
                        cy.readFile(
                            "cypress/fixtures/CounterAdrsAllRepos.json"
                        ).then(counter => {
                            counter.counter = counter.counter + 1;
                            cy.writeFile(
                                "cypress/fixtures/CounterAdrsAllRepos.json",
                                counter
                            );
                        });
                    });
                });
            cy.get("[data-cy=removeRepo]").click();
            cy.get("[data-cy=removeRepoBtn]").click();

            cy.readFile("cypress/fixtures/CounterDiffPerRepo.json").then(
                counter => {
                    cy.log("diff", counter.counter);
                }
            );
            cy.readFile("cypress/fixtures/CounterAdrsPerRepo.json").then(
                counter => {
                    cy.log("adr", counter.counter);
                }
            );
        }

        // Create the actual tests
        it("Test ADRs of the repository " + REPO_NAMES[i], testDiff);
    }
});
