# Clean Data

## Improving of Functionality

* Bug
  * Branch selection is bugged.  (Participant ID: 1, 9)
* Refinement
  * If the parser in the "Convert Tab" has problems, content are lost. (Participant ID: 5)
* Satisfactory
  * All currently implemented functions worked well and do not need to be improved (Participant ID: 2, 3, 4, 6, 7, 8)

## Needed Functionality

* Traceability
  * Hard: Implementing timeline for changes (First used Selenium, later Cypress...) (Participant ID: 8)
  * Hard: Linking "Decisions" to other "Decisions" (Participant ID: 4)
  * Medium: Implementing a function to see what has been changed and the changes between different versions. Show git history of the ADRs (Participant ID: 2)
  * Medium: Referencing an ADR in a commit and showing the related commits when displaying the ADR (Participant ID: 5)
  * Medium: Supporting superseding / deprecation of ADRs and navigating from one ADR to another (Participant ID: 5)
  * Easy: Implementing a field for status tracking (Who made first proposal? What changes were made, when was individual status changed?) (Participant ID: 6)
  * Easy: Including opinions of "Deciders" and who was responsible (Participant ID: 7, 8)
* Template Modification
  * Easy: Implementing a field for resubmission date (Participant ID: 7) 
  * Easy: Selecting multiple options (Participant ID: 2)
  * Easy: Weighting "Decision Drivers" and pros/cons with stars (Participant ID: 1)
* Editing
  * Hard: Supporting graphics and images (Participant ID: 3, 4, 6, 7, 8)
  * Medium: Implementing undo function (Participant ID: 8)
  * Medium: Spelling correction would be very helpful (Participant ID: 8)
  * Easy: Adding new "Deciders" dynamically like options (Participant ID: 5)
  * Easy: Implementing auto completion for "Deciders" (Participant ID: 4)
  * Easy: Implementing syntax highlighting and feedback for completeness (Participant ID: 1)
  * Easy: Supporting copy-paste in lists (Participant ID: 4)
* Management
  * Medium: Generating automatically a concise report as pretty presentation (Participant ID: 2)
  * Medium: Searching for "Decisions" as well as within "Decisions" (Participant ID: 4)
  * Easy: Implementing a field for vote (Participant ID: 7, 9)
  * Easy: Importing existing ADRs (Participant ID: 2)
  * Easy: Resetting content of a single file and repository (Participant ID: 8)
* Support for different Workflows
  * Hard: Implementing plugin for the IDE (Participant ID: 1)
  * Medium: Implementing offline mode (Participant ID: 2)
  * Medium: Supporting GitLab (Participant ID: 3)

## Understandability of User Interface  

* Negative
  * A short motivational text, which explains what ADRs are for (Participant ID: 3)
  * "Add Repository": From where do you take the repository (Local?) (Participant ID: 8)
  * Bigger text fields to show multi-line (Participant ID: 3)
  * "Commit and Push" button should be bottom right or green and bigger (Participant ID: 7)  
  * "Commit and Push" button to close at remove repository button (Participant ID: 4)
  * "Commit and Push" button was hard to find (Participant ID: 7, 9)
  * "Commit and Push" icon may be confusing (Participant ID: 2)
  * "Considered Option": Expand feature hard to see / only in advanced & professional mode (Participant ID: 1, 2, 4, 5, 6, 7)
  * "Convert Tab": Cancel functionality missing / not clear how to go back to editor (Participant ID: 2, 3, 8)
  * Deletion of options should give a warning (Participant ID: 8)
  * "Deciders" description is needed and should behave like lists (Participant ID: 3, 4, 5, 6, 7)
  * Dot at the start of list to show that it's a list (Participant ID: 3)
  * Explanation/How-to for modes is needed (Participant ID: 2, 3, 4, 5, 6, 7, 8)
  * Modes don't support workflow and is not understandable (Participant ID: 1)
  * New ADR button is so big that ADR could also be written out (Participant ID: 2)
  * Not clear that the list extends automatically (copy and paste problem) (Participant ID: 4, 7)
  * Not sure if you have to write in Markdown (Participant ID: 6, 9)
  * Status of the file not sure (Automatically saved?) (Participant ID: 2, 9)
  * The application has too few labels (Participant ID: 1, 3, 4, 6, 9)
  * The default text (see below) of the because field in "Decision Outcome" is confusing (Participant ID: 3, 7)
* Neutral
  * Advanced mode is not required (Participant ID: 2, 7)
* Positive
  * It was very well understandable (Participant ID: 1, 2, 3, 5)
  * Preview of the formatted markdown is good (Participant ID: 3)
  * Push dialog was understandable (Participant ID: 7)
  * Workflow is intuitive and understandable (Participant ID: 4)
## Efficiency of User Interface

* Negative
  * Copy-paste (particularly in lists) may be annoying over time (Participant ID: 2)
  * IDE plugin would be better (Participant ID: 1, 2)
  * Pure markdown may be faster than UI (Participant ID: 1, 8, 9)
* Neutral
  * A few small starting problems that were clear after the first use (modes, expandable options, push button), therefore the efficiency is okay (Participant ID: 7)
* Positive
  * Efficient (the UI is fast and clearly structured) (Participant ID: 1, 2, 3, 5, 6, 9)
  * If you know the workflow, the interface is efficient to use (Participant ID: 4)
  * It makes it more efficient that the user does not have to take care of the Markdown (Participant ID: 5)
  * Web application may be prettier in meetings, but altogether the application is efficient to use (Participant ID: 1)

## Most often used Mode

* Basic & Professional (Participant ID: 1, 2, 4, 5)
* Customizable mode (Participant ID: 3)
* Professional mode (Participant ID: 6, 7, 8, 9)

## Switching between Modes

* No (Participant ID: 6, 8, 9)
* Maybe (Participant ID: 1, 3, 4)
* Yes (Participant ID: 2, 5, 7)

## Functional Suitability is fitting for its Purpose

* 3 (Participant ID: 7)
* 4 (Participant ID: 1, 2, 4, 5, 8)
* 5 (Participant ID: 3, 6, 9)

Average: 4,2

## Usability allows its convenient Usage

* 3 (Participant ID: 1, 7, 9)
* 4 (Participant ID: 3, 4, 5, 6, 8)
* 5 (Participant ID:2)

Average: 3,8

## Likely to Use the Tool

* 1 (Participant ID:8)
* 2 (Participant ID: 1)
* 3 (Participant ID: 3, 4, 6, 9)
* 4 (Participant ID: 7)
* 5 (Participant ID: 2, 5)

Average: 3,2

## Think-Aloud Interference

* Informed where to find "Commit and Push" button (Participant ID: 1)
* Informed about modes (Participant ID: 2, 3, 4, 5, 6, 7, 8, 9)
* Informed about different fields in "Considered Options" list (Participant ID: 4, 8)
* Informed about expandability of "Considered Options", calendar function, status and "Deciders" in Advanced mode (Participant ID: 4)
