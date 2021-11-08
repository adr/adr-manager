# Case Description 7

## Demographic and Professional Background

* Role: enterprise architect 
* Domain: software and IT services
* Years of work experience: 20 years
* ADR experience: 10 years
* Team size: 40 people
* Used template: different templates that depend on project, no experience with [MADR](https://github.com/adr/madr)
* Tools: Confluence

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.

Needed time: 10 min

* Technical problem while connecting to GitHub: very long loading time and repositories did not load (possibly the Internet connection).
  * After disconnecting and connecting again, there were no problems anymore.
* P: Participant gets confused by default text of the `because` field of `Decision Outcome`.
* I: Organizers inform about different modes. Participant switches to professional mode.
* O: Participant tries to enter several advantages and disadvantages in one field at the decision outcome.
* O: Deciders are not directly clear.
* O: The title, the date, and the status are filled in at the end.
* O: The participant does not find the possibility to expand considered options.
* O: The `Commit and Push` button was not found directly. P: The `Commit and Push` button could be highlighted more. 
* O: Push dialog was understandable.

Notes:

* Bug when putting a `/` in the title field (Has already been fixed)

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* All functions worked well and do not need to be improved. Only UI improvements and additional functionalities were mentioned.

**Which additional functionality would you need to consider using the tool in your professional work?**

* Field for vote.
* Including diagrams or images, e.g. of a whiteboard.
* Resubmission date.
* Include opinions of deciders and who was responsible.

### Usability

**How understandable was the user interface for you?**

* Did not see modes at all in the beginning.
  * Possible solution: wizard for selecting a mode, when opening the tool and creating the ADR.
* Save button should be bottom right or green and bigger.
* Workflow was intuitive.

**How efficiently usable was the user interface for you?**

* Good except for a few small starting problems that were clear after the first use (modes, expandable options, push button).

**Which mode would you use most often?**

* Basic mode to record the info shortly after the meeting. Professional to elaborate everything. 

#### Would you switch between modes?

* Yes.

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |    x    |       |                |
| 2. The usability of the tool allows its convenient usage.             |                   |          |    x    |       |                |
| 3. It is likely that I will use the tool in the future.               |                   |          |         |   x   |                |

Additional comments:

- Considered usage only if it will support BitBucket.
