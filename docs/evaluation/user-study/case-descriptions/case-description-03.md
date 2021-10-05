# Case Description 3

## Demographic and Professional Background

* Role: PhD Student, currently sole developer: lead developer, architect, and other roles
* Domain: research, generation of unit test cases, open source
* Years of work experience: 3 years
* ADR experience: 2 years
* Team size: 2-5 people
* Used template: formless, sometimes with diagrams
* Tools: pen and paper or text documents in Git

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement.
* O = Observation: An observation by the researchers that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The researchers helped or pointed out something that the participant had trouble with.

Needed time: 13 min

* O: No problems while connecting to GitHub, adding a repository, and creating an ADR.
* O: No problems while filling in title, options, and selecting the chosen option.
* P: The default text `(see below)` of the `because` field in `Decision Outcome` is confusing.
* I: Organizers inform participant about modes.
* P: Participant is unsure what the fields `Deciders`, `Technical Story`, and `Decision Drivers` are for. Particularly:
  * Should the `Deciders` field contain all deciders or just the recorder of the meeting?
  * What is the difference between `Technical Story` and `Context and Problem Statement`?
* O: Participant finds possibility to expand options (by accident).
* P: Preview of the formatted Markdown is good.
* O: No problems while pushing to GitHub.

## Interview

### Functional Suitability

**Which provided functionality needs to be improved?**

* Given functions of the tool work well.
* The text field for deciders was confusing. It should be like lists.

**Which additional functionality would you need to consider using the tool in your professional work?**

* Support for including images.
* GitHub as host is great for the participant but their colleagues would require GitLab.
* If the participant wanted to capture ADRs in teams, they would use the tool, because it gives an external structure.

### Usability

**How understandable was the user interface for you?**

* Modes were confusing. It was hard to understand that they were related to the editor.
* More explanations for each sections would be helpful, e.g. a question mark next to title which shows an explanation on hover.
* List items should have a dot at the start to show that it's a list.
* Multi-line text fields (like `Context and Problem Statement`) should be bigger.
* In the `Convert` tab, it's confusing what to do when one does not want to accept. Maybe a button saying `Cancel` or `Let me edit it` could be added that redirects to `Raw Markdown` tab.
* "Would a short tutorial at the start be helpful?" --> A tutorial may overdo it, but a short motivational text which explains what ADRs are for would be helpful.

**How efficiently usable was the user interface for you?**

* Good, the UI is fast and clearly structured.

**Which mode would you use most often?**

* The participant would prefer to customize which fields are visible, e.g. they would use `Links` (from Professional mode) but not `Technical Story` (from Advanced mode). Ideally, all headings should be visible but collapsible.

#### Would you switch between modes?

* Maybe

### Final Verdict

| Statement                                                             | strongly disagree | disagree | neutral | agree | strongly agree |
| --------------------------------------------------------------------- | :---------------: | :------: | :-----: | :---: | :------------: |
| 1. The functional suitability of the tool is fitting for its purpose. |                   |          |         |       |       x        |
| 2. The usability of the tool allows its convenient usage.             |                   |          |         |   x   |                |
| 3. It is likely that I will use the tool in the future.               |                   |          |    x    |       |                |

Additional comments:

- Functional completeness (5), functional correctness (5), functional appropriateness (4)
- Learnability (3), operability (5), user interface aesthetics (4)
- Very dependent on the other members of a team
