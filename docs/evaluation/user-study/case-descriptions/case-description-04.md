# Case Description 4

## Demographic and Professional Background

* Role: principal architect, data engineer
* Domain: consulting
* Years of work experience: 10
* ADR experience: 5 years
* Team size: 5-8 people
* Used template: none, project-specific
* Tools: none specifically

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.

Needed time: 14 min

* O: No problems while connecting to GitHub, adding a repository, and creating an ADR.
* O: Participant overlooks the field for the title and fills in other information first.
* O: Participant first puts all options in one option field. Then gets confused when the `Chosen option` dropdown only shows it as one option.
* I: Organizers inform about different fields in considered options list.
* O: Participant gets confused by default text of the `because` field of `Decision Outcome`.
* I: Organizers inform about different modes. Participant switches to advanced mode.
* O: Participant gets confused by the name `0000-.md` of the file in the `Commit and Push` Dialog, then notices the title field of the MADR and fills it in.
* I: Organizers inform about expandability of considered options, calendar function, status, and deciders in Advanced mode.
* O: Icon of deciders confuses participant.
  * They expected it to behave like the lists, i.e. that a new text field appears for additional deciders.
* O: There were no problems while committing and pushing (upload sign for push is clear).

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* Modes were confusing: when to use each mode? 
  * It seems like you can always use Professional mode.
  * Does not see the advantages of the different modes.
  * Having fields that are only visible in one mode was confusing.
* Support for copy-paste in lists.
* As a professional tool, it would need auto completion for decision makers.

**Which additional functionality would you need to consider using the tool in your professional work?**

* Search for decisions as well as within decisions.
* Linking decisions to other decisions, e.g. one decision often depends on others or is followed by others.
* Including images
  * Either by pushing an image file to GitHub and linking it in Markdown or using rich text to create diagrams.

### Usability

**How understandable was the user interface for you?**

* User interface is easy to understand.
* Having the `Commit and Push` button directly next to the `Remove repository` button may be dangerous.
* Modes were confusing at first, but once you know the differences they are understandable.
* The `Title` field was confusing at first. It should have a label like the other fields.

**How efficiently usable was the user interface for you?**

* If you know the workflow, the interface is good to use.

**Which mode would you use most often?**

* Professional mode

#### Would you switch between modes?

* Currently, participant would use basic mode for quick drafts, because the options expand automatically in advanced and professional mode.
* However, with a few changes, the participant would only use the professional mode:
  * Default expansion of new option items slows down writing progress. If the considered options did not expand automatically in professional mode (description and pros and cons), there would be no need for basic mode.
  * The advanced mode would not be needed, since the links and the decision drivers do not take up so much space.

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |         |   x   |                |
| 2. The usability of the tool allows its convenient usage.             |                   |          |         |   x   |                |
| 3. It is likely that I will use the tool in the future.               |                   |          |    x    |       |                |

Additional comments:

- Strongly depends on client. As consultant, the participant may propose the tool to the client.
