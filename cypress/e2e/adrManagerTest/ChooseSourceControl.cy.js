context("Choosing from different source control soptions", () => {
    it('Different source control options should be visible', () => {
        cy.visit("http://localhost:8000/adr-manager/#/");
        cy.get("[data-cy=disconnect]").click();
        cy.get("[data-cy=connectToGithub]").click();
        cy.get("[data-cy=loadOptions]").should('exist');
    });
    it('Clicking should open oauth window', () => {
        cy.get("[data-cy=signInWithGithubFree]").click()

    })
})