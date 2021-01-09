/* eslint-disable no-undef */

context("Test parser function", () => {
    it('Should test the convert tab', () => {
        cy.visit("http://localhost:8080/manager");
        window.localStorage.clear();
        window.localStorage.setItem("authId", "8a555390-4db1-11eb-a06d-f3ebfa774e63");

        // Add repo
        cy.get('[data-cy=addRepo]').click();
        cy.intercept('GET', '**/user/repos**').as('getRepos');
        cy.wait('@getRepos').its('response.statusCode').should('eq', 200);
        cy.get('[data-cy=listRepo]').should('have.length', 5).eq(0).click();
        cy.get('[data-cy=addRepoDialog]').click();
        cy.get('[data-cy=repoNameList]').click();


        // One adr in list
        cy.get('[data-cy=newADR]').click();
        
        cy.contains(' Markdown Preview ').click();
        cy.contains(' Raw Markdown ').click();
        cy.get('[data-cy=markdownText]').click().type("# ADR-Manager   ## Project setup   ```  npm install   ### Compiles and hot-reloads for development ```   npm run serve ``` ### Compiles and minifies for production ```  npm run build # ADR Manager Research Project > All artefacts related to a research project from the University of Stuttgart to propose a tool-supported approach for the efficient creation and management"
        + " of [architectural decision records (ADRs)](https://adr.github.io) via a graphical user interface (GUI)"
        );
        cy.contains(' Convert ').click();
    });
})