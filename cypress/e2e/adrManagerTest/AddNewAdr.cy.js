import { TEST_BASE_URL } from "../../support/e2e";

context("Adding a new ADR to a repo", () => {
    it("Create a new ADR", () => {
        window.localStorage.clear();
        window.localStorage.setItem("authId", Cypress.env("OAUTH_E2E_AUTH_ID"));
        cy.visit(TEST_BASE_URL);

        // add the ADR-Manager repo
        // cy.intercept("GET", "**/user/repos**").as("getRepos");
        cy.intercept('POST', 'https://api.github.com/graphql', (req) => {
            const authToken = window.localStorage.getItem("authId");

            if (!authToken) {
                // Handle missing authentication token
                req.reply({
                    statusCode: 401,
                    body: { error: 'Unauthorized' },
                });
                return;
            }

            const { body } = req;
            const expectedQuery = `query {
                    user(login: "Moneexa") {
                      repositories(first: 5, after: null, orderBy: { field: UPDATED_AT, direction: DESC }) {
                        nodes {
                          id
                          resourcePath
                          updatedAt
                          description
                          defaultBranchRef {
                            name
                          }
                        }
                      }
                    }
                  }`

            if (Object.values(body)[0].includes(expectedQuery)) {
                // Handle the GraphQL query as needed
                req.reply({
                    statusCode: 200,
                    body: {
                        "data": {
                            "data": {
                                "user": {
                                    "repositories": {
                                        "nodes": [
                                            {
                                                "id": "MDEwOlJlcG9zaXRvcnkzMDQwMTM4MjY=",
                                                "resourcePath": "/adr/adr-manager",
                                                "updatedAt": "2023-11-13T13:30:58Z",
                                                "description": "ADR-Manager",
                                                "defaultBranchRef": {
                                                    "name": "main"
                                                }
                                            },
                                            {
                                                "id": "R_kgDOKsK_Sw",
                                                "resourcePath": "/tasbihaasim/crowdnave",
                                                "updatedAt": "2023-11-11T14:45:09Z",
                                                "description": null,
                                                "defaultBranchRef": {
                                                    "name": "master"
                                                }
                                            },
                                            {
                                                "id": "R_kgDOKsK6Ww",
                                                "resourcePath": "/tasbihaasim/UPISAS",
                                                "updatedAt": "2023-11-11T11:50:40Z",
                                                "description": "unofficial fork of the UPISAS repository",
                                                "defaultBranchRef": {
                                                    "name": "main"
                                                }
                                            },
                                            {
                                                "id": "R_kgDOKrHqDg",
                                                "resourcePath": "/Moneexa/CrowdNav",
                                                "updatedAt": "2023-11-09T11:32:01Z",
                                                "description": "A model problem for big data self adaptive systems using SUMO and TraCI",
                                                "defaultBranchRef": {
                                                    "name": "master"
                                                }
                                            },
                                            {
                                                "id": "R_kgDOKiLYvA",
                                                "resourcePath": "/Moneexa/MyArdoqTask",
                                                "updatedAt": "2023-10-18T22:43:31Z",
                                                "description": null,
                                                "defaultBranchRef": {
                                                    "name": "master"
                                                }
                                            }
                                        ]
                                    }
                                }
                            }
                        }
                    }
                });
            } else {
                // Fallback for unexpected requests
                req.reply({
                    statusCode: 500,
                    body: { error: 'Unexpected request' },
                });
            }
        }).as('getRepos');

        // Continue with your Cypress test logic
        cy.get("[data-cy=addRepo]").click();
        cy.wait("@getRepos").its("response.statusCode").should("eq", 200);
        cy.get("[data-cy=listRepo]").contains("ADR-Manager").click();
        cy.get("[data-cy=addRepoDialog]").click();
        cy.get("[data-cy=repoNameList]").click();

        cy.get("[data-cy=adrList]").then((adrList) => {
            // get number of ADRs in repo
            const adrCount = Cypress.$(adrList).length;
            // add new ADR
            cy.get("[data-cy=newADR]").click({ force: true });
            // length should be adrCount + 1
            cy.get("[data-cy=adrList]").should("have.length", adrCount + 1);
            cy.get("[data-cy=adrList]").should(() => {
                expect(localStorage.getItem("addedRepositories")).to.not.eq("[]");
            });

            // add title to new ADR
            cy.get("[data-cy=titleAdr]").click();
            cy.get("[data-cy=titleAdr]").type("TestTitle");

            // add context to new ADR
            cy.get("[data-cy=contextAdr]").click();
            cy.get("[data-cy=contextAdr] textarea").eq(1).type("ContextAdr", {
                force: true
            });

            // add considered options text to new ADR and test the add btn
            cy.get("[data-cy=considerOptTextAdr]").children().eq(1).type("Con. Opt 1)").should("have.length", 1);
            cy.get("[data-cy=considerOptTextAdr]").children().should("have.length", 2);

            // choose decision outcome
            cy.get("[data-cy=decOutChooseAdr]").click();
            cy.get(".v-list-item__title").contains("Con. Opt 1)").click();
            cy.get("[data-cy=checkConsOptAdr]").should("be.visible");

            // add because to decision outcome
            cy.get("[data-cy=decOutBecAdr]").click();
            cy.get("[data-cy=decOutBecAdr]").type("it has to be");
        });
    });
});
