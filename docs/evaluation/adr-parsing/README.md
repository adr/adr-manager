
# Parser test

## Manual test

The results of the manual check are included in [adr-parsing-manual-results.csv](./adr-parsing-manual-results.csv).

## Automatic test

An automatic test checking whether an ADR can be parsed was implemented.

### Prerequisites

1. The repositories that are checked are defined in the list `REPO_NAMES` in `cypress/integration/EmpriricalAnalysis.js`. Your GitHub account must have access to those.
2. Add a file `cypress.env.json` in this folder with the auth ID of an active session. While running the ADR-Manager, you can find your `authId` in the local storage.
   The file content of `cypress.env.json` should look like

   ```[JavaScript]
   {
      "OAUTH_E2E_AUTH_ID": "abcdefg-123456"
   }
   ```

   where `abcdefg-123456` is your `authId`.

### Execute tests

1. Start the ADR-Manager locally: In the `adr-manager` directory execute:

   ```[bash]
   npm run serve
   ```

2. Run the tests: In this directory (i.e. the same as this `README`, `cypress.json` and `cypress.env.json`) execute one of the following commands

   ```[bash]
   # Open the Cypress GUI to execute tests interactively
   npx cypress open
   
   # Run all tests in the command line
   npx cypress run --spec "./cypress/integration/EmpiricalAnalysis.js"
   ```

   Possible reasons for failing tests:

   * The ADR-Manager is not run at `localhost:8080`. --> Start it.
   * The auth ID is not valid. --> Add or update `cypress.env.json`.
   * The repository was not found. Possible reasons I can think of:
      * You do not have access to a repository with a name defined in `REPO_NAMES`. --> Only include repositories you have access to.
      * <s>The repository does not appear in the first tab of the "Add repositories" dialogue because e.g. are too many other repositories that were recently updated. (I didn't have problems with that but I think it will cause issues...)
        * A possible quick fix might be increase the maximum displayed repositories in the adr-manager's source code...
        * Alternatively one could modify the test to press the Next button. That would require to add a `data-cy` attribute to the Next button in the adr-manager source code
          and I would need to remember how to use if/else in the asynchronous setting of Cypress... </s>

        The test now uses the search field. The pagination of repositories should not cause problems anymore.
      * The search function could be bugged.
        I'm having a feeling that, if someone has access to maaaany repositories, then searching will take veeeery long.
        This is because, while searching, all private repositories are fetched and compared to the search term before the public repositories are fetched.

   * The `docs/adr` folder doesn't exist, i.e., no ADR is found. --> Move ADRs into this folder.

   When in doubt, open the Cypress GUI and check which step fails.

### View results

* `cypress/fixtures/CounterAdrsPerRepo.json`: Number of all ADRs per repository.
* `cypress/fixtures/CounterDiffPerRepo.json`: Number of times the Convert tab was opened per repository.
* `cypress/fixtures/Counter{Diff|Adrs}AllRepos.json`: Total numbers, i.e., sum of the above per-repository-counters.
* `cypress/videos/EmpiricalAnalysis.js.mp4`: If the test was run with `npx cypress run --spec` a video is generated in `cypress/videos` where you can watch cypress clicking through the repositories. (Or possibly check what went wrong in case of failures.)
