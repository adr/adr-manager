# Case Description 5

## Demographic and Professional Background

* Role: lead architect and developer
* Domain: quantum computing and AI
* Years of work experience: 4 years
* ADR experience: 6 years
* Team size: 4-10 people
* Used template: [MADR](https://github.com/adr/madr)
* Tools: None specifically, mostly GitHub Editor

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.

Needed time: 18 min

* There were technical problems when using the browser Safari, so the participant uses Chrome instead.
* O: No problems while connecting to GitHub, adding a repository, and creating a new ADR.
* O: Participant tries to fill in full descriptions, pros and cons of the options as Markdown in Basic mode (where the UI only expects option titles).
* O: After switching to `Raw Markdown`-Tab and back the content is lost.   
* I: Organizers inform them about different modes.
* O: Participant switches to Professional mode.
* O: Participant understands UI concept of options (only) after they filled in a new option title in `Professional` mode and it automatically expands.
* P: Participant would like "automatic" lists.
* P: Icon of deciders confused participant.
  * They expected it to behave like the lists, i.e. that a new text field appears for additional deciders.

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* They liked that the interface was very simple and did not have too many functions.

**Which additional functionality would you need to consider using the tool in your professional work?**

* Support for referencing an ADR in a commit and showing the related commits when displaying the ADR.
* Support for superseding / deprecation of ADRs and navigating from one ADR to another.
  * Partially satisfied by `Status` field, but misses possibility to reference other ADRs.

### Usability

**How understandable was the user interface for you?**

* Consistency: When there appears a new text field for lists, then it should do so for `Deciders`, too.
* The modes are nice because they allow to start with quickly sketching an ADR and then writing more details. However, a workflow to use them naturally is missing.
* Mini-HowTo for modes would help.

**How efficiently usable was the user interface for you?**

* Very efficient
* It's nice that the user does not have to take care of the Markdown.

**Which mode would you use most often?**

* Basic mode for quick drafting and Professional for more detailed ADRs.
* They most likely would not need Advanced mode.

#### Would you switch between modes?

* Most likely yes

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |         |   x   |                |
| 2. The usability of the tool allows its convenient usage.             |                   |          |         |   x   |                |
| 3. It is likely that I will use the tool in the future.               |                   |          |         |       |       x        |

Additional comments:

- Missing deprecation of ADRs.
- Tab key for navigating between text fields would be nice.
- Only regular usage if the tool will support GitLab.
