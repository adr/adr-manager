**Meeting protocol - 12.01.2021, 14:00 to 17:30**

**Recorder**: Anna Mustermann



| **name**        | **present** |
| --------------- | ----------- |
| Anna Mustermann | yes         |
| Bob Musterfrau  | yes         |
| Marco Mayer     | yes         |
| Matt Müller     | no          |

## Meeting Topic

Using an end-to-end (e2e) testing framework

**Context**

We need an e2e test framework for our application. It needs to support JavaScript. Which test framework can we use?

**Options**

- Anna proposes the use of Cypress tests
- Bob is more in favor of using Selenium tests
- Marco is against e2e tests

**Discussion**

- Cypress
    - Advantages
        - Cypress runs directly in the browser and is fast
        - It can be installed quickly and no configuration is required
        - Tests can be debugged easily
        - No previous knowledge is required
        - Captures snapshots at the time of test execution
    - Disadvantages
        - Does not support multi-tabs
        - Limited support for iFrames
        - Supports only JavaScript to create test cases

- Selenium
    - Advantages
        - Compatible with the latest browsers
        - Multiple browser instances
        - Mobile tests
    - Disadvantages
        - The setup is difficult
        - Execution speed is slow
        - Time travel is not available

- No e2e tests
    - Advantages
        - Time saving
    - Disadvantages
        - Test coverage is not increased
        - Bugs can remain undetected

**Outcome**:

- Cypress was selected as the framework for e2e testing
    - Positive consequences
        - Good coverage of code through Cypress e2e tests
        - Fast implementation
        - Errors can be easily debugged
        - Create screenshots and videos in the pipeline
    - Negative consequences
        - Time-consuming execution of the pipeline
        - Time-consuming adaptation of tests when changes are made to the code
- Links
    - https://www.cypress.io

**Next recorder with expected date**: Bob Musterfrau, next meeting: 22.01.2021, 2 pm
