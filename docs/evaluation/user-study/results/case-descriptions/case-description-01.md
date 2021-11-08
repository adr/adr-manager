# Case Description 1

## Demographic and Professional Background

* Role: Professor, software architecture lecturer
* Domain: software quality and architecture, some experience in other fields (business information systems, autonomous systems)
* Years of work experience: 20 years
* ADR experience: 10 years, but not with [MADR](https://github.com/adr/madr)
* Team size: _(question was not asked)_
* Used template: none, free text in documentation
* Tools: depends on project, e.g. Jira or other documentation like a READMEs

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.

Needed time: 18 min

* O: No problems while connecting to GitHub, adding a repository, and creating an ADR.
* P: Title field is confusing, as the field does not have a label.
* O: Participant switches to Professional mode.
* P: In general, there should be more labels and explanations for the fields.
* O: Participant fills in `Decision Drivers`.
* O: While filling in the `Considered Options`, participant does not see how to add the second option.
  * Note: The problem may be that the first option expanded automatically and thus there were many fields. After collapsing the option, the participant understood that the last field is for the next option.
* O: Participant fills in the fields in `Decision Outcome`.
* O: Participant notices that branch selection is bugged.
* I: Organizers show where the `Commit and Push` button is, because the participant does not find it.
  * P: `Commit and Push` icon is confusing.

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* Connection to GitHub was easy.
* Needed functionality is there.

**Which additional functionality would you need to consider using the tool in your professional work?**

* A plugin in the IDE would be better, as it wouldn't require a context switch and it would fit better to the participant's workflow.
* Using free text with syntax highlighting and feedback for completeness would be better.
* (Template) feature suggestion: Weighting decision drivers and pros/cons with stars to see which ones are more important.

### Usability

**How understandable was the user interface for you?**

* UI is confusing as there are too few labels. Possible improvements: 
  * Labels for all test fields
  * Explanations, e.g. through explanations on hover
  * Maybe wizard for guidance
* Good: interactive and modern

**How efficiently usable was the user interface for you?**

* Raw Markdown may be faster.
* IDE plugin would be better.
* The web application may be prettier in meetings.

**Which mode would you use most often?**

* Depends on the decision to be documented
  * Smaller decisions can be documented in Basic mode.
  * Most architectural decisions are complex enough that Professional mode is required. Particularly, the rationale behind the decision, e.g. decision drivers, are important to capture.

#### Would you switch between modes?

* Maybe

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |         |   x   |                |
| 2. The usability of the tool allows its convenient usage.             |                   |          |    x    |       |                |
| 3. It is likely that I will use the tool in the future.               |                   |    x     |         |       |                |

Additional comments:

- Usability facets: learnability (1), aesthetics (4 or 5)
- They would use the tool only if it was a plugin for Visual Studio Code. They would maybe use the tool in meetings.
