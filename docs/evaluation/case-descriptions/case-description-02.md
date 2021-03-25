# Case Description 2

## Demographic and Professional Background

* Role: Software Architecture Lecturer, Consultant
* Domain: General Integration Architectures, no specific domain
* Years of work experience: 32 years work experience, 15 years as researcher, 7 years as lecturer
* ADR experience: 20 years
* Team size: varies a lot, both alone and in large teams
* Used template: Y-Statements
    * MADR only in toy examples
* Tools: Plain text in Markdown, sometimes e-adr when in combination with code

## Think-Aloud Protocol

_Abbreviations_: In the following, each statement is started with a letter describing the context of the statement:
* O = Observation: An observation by the organizers, that the participant did not explicitly mention.
* P = Participant: A statement of the participant.
* I = Interference: The organizers helped or pointed out something that the participant had trouble with.

Needed time: 18 min

* O: No problems while connecting to GitHub and adding the repository.
* P: Since the `New ADR` button is so big, it could be labeled `new architectural decision record`.
* O: Participant copy-pastes option titles and understands that they need to put each option in a different line.
* P: Participant is unsure if they should save the ADR or whether it is auto-saved.
* I: Organizers inform about modes.
* P: `Basic, Advanced, Professional` should have a small explanation, maybe label it with `Usage Mode: `.
* P: Participant copy-pastes consequences (i.e. list in one field).
* O: After going to the Preview tab and back, they land in Convert-Tab. This tab was confusing. Participant did not immediately understand what to do there. Particularly, they did not know what is meant by "MADR-Editor".
* P: Difference between `Advanced` and `Professional` mode seems too small.
* P: Participant didn't find that they could expand options in Professional mode on their own, but they liked UI-Concept of modes.
  * Expanding the option when clicking on pencil would be more intuitive. 
* O: No problems while pushing to GitHub. 
* P: The `Commit and Push` icon may be confusing.

## Interview

### Functional Suitability

#### Which provided functionality needs to be improved?

* Good: Every part of Y-Statements exists in MADR.
* It should also be possible to document changes over time.

#### Which additional functionality would you need to consider using the tool in your professional work?

* sometimes it's not XOR of options 
   * Support for changes over time: Sometimes one option is chosen as fast solution but another option is planned be implemented later. 
   * Combinations of options

* Offline Mode (often documentation is done offline without internet)
* Import of existing ADRs.
* Automatic generation of a concise report as pretty presentation, e.g., Y-Statements can be put on one slide.
   * e.g. using PowerPoint or a white board like Miro

### Usability

#### How understandable was the user interface for you?

* very well understandable, not too much and not too less.

#### How efficiently usable was the user interface for you?

* Good in the example of this study.
* Copy-paste (particularly in lists) may be annoying over time.
* Visual Studio Code Plugin may be better.

#### Which mode would you use most often?

* Basic and Professional

#### Would you switch between modes?

* Yes.

### Final Verdict

|Statement|strongly disagree|disagree|neutral|agree|strongly agree|
|---|:-:|:-:|:-:|:-:|:-:|
|1. The functional suitability of the tool is fitting for its purpose.||||x||
|2. The usability of the tool allows its convenient usage.            |||||x|
|3. It is likely that I will use the tool in the future.              |||||x|

Additional comments:

1. 
2. 
3. Participant is likely to try out the tool, but unsure whether in long term.
