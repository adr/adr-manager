# Case Description 8

## Demographic and Professional Background

* Role: architect and developer
* Domain: backend, data science
* Years of work experience: 20 years
* ADR experience: 10 years
* Team size: 5-15 person
* Used template: specific for each project
* Tools: Wikiwebs, Sharepoint, Git with Markdown

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.  

Needed time: 20 min

* There were technical problems while connecting to GitHub. This was due to a `no script` plugin, as Heroku requires JavaScript.
* P: Confusion when adding a repository. Where should the repository be taken from? Local?
* O: Participant creates an ADR.
* P: Spelling correction would be very helpful.
* O: Participant fills in the fields in `Considered Options`.
* O: Participant fills in the fields in `Decision Outcome`.
* I: Organizers inform about modes because the participant believes they are done with filling in the ADR.
* O: Participant fills in the fields in `Positive Consequences`.
* O: Participant fills in the fields in `Negative Consequences`.
* O: Participant fills in the fields in `Decision Drivers`.
* O: Participant switches to `Raw Markdown`.
* I: With the help of the researchers, the participant can find the additional fields in `Considered Options`.
* O: Participant fills in the fields in  `Good, because...` and `Bad, because...`.
* O: Participant commits and pushes the ADR.

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* Needed functionality is there.
* Additional free text field (if it doesn't break concept of ADRs).
* `Convert` should give clearer information that content is lost.
  * Raw Markdown mode seems like you can write whatever you want but it is lost when switching to Editor, which is very frustrating.

**Which additional functionality would you need to consider using the tool in your professional work?**

* Include or link images in Markdown.
* Reset content of a single file and repository.
* Option to determine who edited the ADR and when. List of people who have said what.
* Undo function
* Function to see what has been changed and the changes between different versions. Show Git history of the ADRs.

### Usability

**How understandable was the user interface for you?**

* Sufficiently well
* For new users, more explanations in the UI would be helpful, e.g. through explanations on hover
* Modes should be explained.
* Deletion of options should give a warning.

**How efficiently usable was the user interface for you?**

* Not really efficient, the participant will prefer to write raw Markdown with Emacs.

**Which mode would you use most often?**

* `Professional` mode, because it is simple enough.

#### Would you switch between modes?

* No, the `Professional` mode is enough.

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |         |   x   |                |
| 2. The usability of the tool allows its convenient usage.             |                   |          |         |   x   |                |
| 3. It is likely that I will use the tool in the future.               |         x         |          |         |       |                |

Additional comments:

- Functional completeness (4), functional correctness (4), functional appropriateness (4)
- Learnability (4), operability (4), aesthetics (3)
- Templates are dynamic and the used tools depend on the team but, in general, the tool could be used in this field.
