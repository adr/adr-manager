import { ArchitecturalDecisionRecord } from "../src/plugins/classes.js";

export const validMarkdownADRs = [
    // madr/master/docs/adr/0000-use-markdown-architectural-decision-records.md
    `# Use Markdown Architectural Decision Records

## Context and Problem Statement

We want to record architectural decisions made in this project.
Which format and structure should these records follow?

## Considered Options

* [MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records
* [Michael Nygard's template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions) – The first incarnation of the term "ADR"
* [Sustainable Architectural Decisions](https://www.infoq.com/articles/sustainable-architectural-design-decisions) – The Y-Statements
* Other templates listed at <https://github.com/joelparkerhenderson/architecture_decision_record>
* Formless – No conventions for file format and structure

## Decision Outcome

Chosen option: "MADR 2.1.2", because

* Implicit assumptions should be made explicit.
  Design documentation is important to enable people understanding the decisions later on.
  See also [A rational design process: How and why to fake it](https://doi.org/10.1109/TSE.1986.6312940).
* The MADR format is lean and fits our development style.
* The MADR structure is comprehensible and facilitates usage & maintenance.
* The MADR project is vivid.
* Version 2.1.2 is the latest one available when starting to document ADRs.
`,

    // madr/master/docs/adr/0006-use-names-as-identifier.md
    `# Use names as identifier

## Context and Problem Statement

An option is listed at "Considered Options" and repeated at "Pros and Cons of the Options". Finally, the chosen option is stated at "Decision Outcome".

## Decision Drivers

* Easy to read
* Easy to write
* Avoid copy and paste errors

## Considered Options

* Repeat all option names if they occur
* Assign an identifier to an option, e.g., \`[A] Use gradle as build tool\`

## Decision Outcome

Chosen option: "Assign an identifier to an option", because 1) there is no markdown standard for identifiers, 2) the document is harder to read if there are multiple options.
`,

    // madr/master/docs/adr/0007-do-not-emphasize-line-headings.md
    `# Do not emphasize line headings

## Context and Problem Statement

MADR contains lines such as \`Chosen option: "[option 1]"\`. Should "Chosen option" be emphasised?

## Decision Drivers

* MADR should be easy to read
* MADR should be easy to write

## Considered Options

* Do not emphasize line headings
* Emphysize line headings

## Decision Outcome

Chosen option: "Do not emphasize line headings", because 1) these headings always are put at the beginning of a line and followed by a colon. Thus, they are already easy to identified as line heading. 2) Readers not familiar with markdown might be confused by stars in the text.
`,

    // madr/master/docs/adr/0008-add-status-field.md
    `# Add status field

Technical Story: <https://github.com/adr/madr/issues/2>

## Context and Problem Statement

ADRs have a status. Should this be tracked? And if it should, how should we track it?

## Considered Options

* Use badge
* Use text line
* Use separate heading
* Use table
* Do not add status

## Decision Outcome

Chosen option: "Use text line", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | ... | comes out best (see below)].

## Pros and Cons of the Options

### Use badge

#### Examples

* ![grafik](https://user-images.githubusercontent.com/1366654/36786999-ca368324-1c88-11e8-966d-56f25980fd76.png)
* [![status-superseeded](https://img.shields.io/badge/status-superseeded_by_ADR_0001-orange.svg?style=flat-square)](https://github.com/adr/madr/blob/master/docs/adr/0001-use-CC0-as-license.md)

#### Pros/cons

* Good, because plain markdown
* Good, because looks good
* Bad, because hard to read in markdown source
* Bad, because relies on the online service https://shields.io or [local badges have to be generated](https://github.com/badges/shields#using-the-badge-library)
* Bad, because at local usages, many badges have to be generated (superseeded-by-ADR-0006, for each ADR number)
* Bad, because not easy to write

### Use text line

Example: \`Status: Accepted\`

* Good, because plain markdown
* Good, because easy to read
* Good, because easy to write
* Good, because looks OK in both markdown-source (MD) and in rendered versions (HTML, PDF)
* Good, because no dependencies on external tools
* Good, because single line indicates the current state
* Bad, because "Status" line needs to be maintained
* Bad, because uses space at the beginning. When users read MADR, they should directly dive into the context and problem and not into the status

### Use separate heading

Example:  ![grafik](https://user-images.githubusercontent.com/1366654/36787029-f5ea246c-1c88-11e8-9082-8e9531e4fac7.png)

* Good, because plain markdown
* Good, because easy to write
* Bad, because it uses much space: At least three lines: heading, status, separating empty line

### Use table

Example:  ![grafik](https://user-images.githubusercontent.com/1366654/36787043-0339a53e-1c89-11e8-8ebe-fb2a5752448c.png)

* Good, because history can be included
* Good, because multiple entries can be made
* Good, because already implemented in adr-tools fork
* Bad, because not covered by the [CommonMark specification 0.28 (2017-08-01)](http://spec.commonmark.org/0.28/)
* Bad, because hard to read
* Bad, because outdated entries cannot be easily identified
* Bad, because needs more markdown training

### Do not add status

* Good, because MADR is kept lean
* Bad, because users demand state field
* Bad, because not in line with other ADR templates
`,

    // madr/master/docs/adr/0009-support-links-between-adrs-inside-an-adrs.md
    `# Support links between ADRs inside an ADRs

Technical Story: https://github.com/adr/madr/issues/9

## Considered Options

* Use tables
* Use heading together with a bullet list directly after status
* Use heading together with a bullet list directly after "Decision Outcome"
* Use heading together with a bullet list at the end
* Don't add links

## Decision Outcome

Chosen option: "Use heading together with a bullet list at the end", because comes out best (see below).

## Pros and Cons of the Options

### Use tables

* Good, because easy to write
* Good, because history is shown (enabled by concept)
* Good, because current adr-tools support (https://github.com/npryce/adr-tools/pull/43) uses tables to describe links.
* Bad, because not supported by the CommonMark spec
* Bad, because unclear whether a link was superseeded by another one
* Bad, because valid links not clear at first sight (there might be outdated links shown)

### Use heading together with a bullet list directly after status

Example:
![grafik](https://user-images.githubusercontent.com/1366654/36787434-6a63e318-1c8a-11e8-8824-4dd7b3d0f2c6.png)

* Good, because easy to write
* Good, because supported by the CommonMark spec
* Bad, because not consistent with the status label (refs https://github.com/adr/madr/issues/2)

### Use heading together with a bullet list directly after "Decision Outcome"

* Good, because easy to write
* Good, because supported by the CommonMark spec
* Good, because the options are first introduced and then the links
* Good, because consistent with position of "Decision Outcome"
* Bad, because reader might get distracted: He might expect explanation of the options instead of links to something else
* Bad, because not consistent with scientific papers, where related work and future work are coming after the discussion of the content.

### Use heading together with a bullet list at the end

* Good, because easy to write
* Good, because supported by the CommonMark spec
* Good, because the options and pros/cons are kept together with the option list.
* Good, because consistent with pattern format

### Don't add links

* Good, because template stays minimal
`,

    // madr/docs/adr/0011-use-asterisk-as-list-marker.md
    `# Use asterisk as list marker

## Context and Problem Statement

Lists in markdown can be indicated by \`*\` (asterisk) or \`-\` (hypen).

## Considered Options

* Use an asterisk
* Use a hyphen

## Decision Outcome

Chosen option: "Use an asterisk", because an asterisk does not have a meaning of "good" or "bad", whereas a hypen \`-\` could be read as indicator of something negative (in contrast to \`+\`, which could be more be read as "good").

According to the [Markdown Style Guide](http://www.cirosantilli.com/markdown-style-guide/), an asterisk as list marker is more readble (see [readability profile](http://www.cirosantilli.com/markdown-style-guide/#readability-profile)).
`,
    // An ADR that uses every field
    `# Example ADR

* Status: proposed
* Deciders: Decider
* Date: 2020-12-03

Technical Story: Proposed in Issue [#30](https://github.com/koppor/adr-manager/issues/30)

## Context and Problem Statement

Context and

## Decision Drivers

* ADR-Manager should be lightweight and easy to implement.
* ADR-Manager should be easy to maintain.

## Considered Options

* Don't use any global store
* Only use local storage in combination with Events/Props
* Implement a state manager from scratch.
* Use the Vue-State-Manager Vuex

## Decision Outcome

Chosen option: "Implement a state manager from scratch", because comes out best. The data can additionally be stored in Local Storage but this should be managed by the global store as well.

### Positive Consequences

* New functionality will be easier to add.

### Negative Consequences

* asd

## Pros and Cons of the Options

### Don't use any global store

Just "cascade" updates between Vue-Components via Events and Props.
E.g. each editor tab has a prop (v-model) for the displayed ADR. Whenever the ADR is changed the Sup-Component (currently TheEditor.vue) updates the ADR in each tab.
When a new ADR is created via a toolbar menu, the event needs to cascade down to each related Editor-Component.

* Good, because it's easy to implement. It is currently done that way and requires no further actions.
* Bad, because it's a debugging nightmare.
* Bad, because GUI and functionality is more directly connected. Changes to the GUI often require updating functionality and vice versa.

### Only use local storage in combination with Events/Props

Use local storage (i.e. persistent storage) to store the state and use events (e. g. a global event bus) to communicate changes to the state.

* Good, because it's easy to implement.
* Good, because Most data should be stored in persistent storage anyway.

### Implement a state manager from scratch.

Implement a state manager from scratch as described at https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch.

* Good, because GUI and functionality are split better. Debugging is easier.
* Good, because Dialogs can be moved around between components without having to update props and events every time.

### Use the Vue-State-Manager Vuex

Docs can be found at https://vuex.vuejs.org/.

* Good, because best long-term maintainability.
* Good, because prepares for extensions like 'Undo-Redo'.
* Good, because the development team can gather experience with Vuex.
* Bad, because of more concepts and boilerplate.
* Bad, because does not fit in our project. We assume that ADR-Manager is a small-to-medium project and not a medium-to-large project

## Links

* [This is a link](example.org)
`
];

/**
 * Pairs describing the expected behaviour of the md2adr parser. When given the markdown it should output the ADR.
 */
export const MD_ParsedMADR_Pairs = [
    // madr/docs/adr/0000-use-markdown-architectural-decision-records.md
    {
        md: `# Use Markdown Architectural Decision Records

## Context and Problem Statement

We want to record architectural decisions made in this project.
Which format and structure should these records follow?

## Considered Options

* [MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records
* [Michael Nygard's template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions) – The first incarnation of the term "ADR"
* [Sustainable Architectural Decisions](https://www.infoq.com/articles/sustainable-architectural-design-decisions) – The Y-Statements
* Other templates listed at <https://github.com/joelparkerhenderson/architecture_decision_record>
* Formless – No conventions for file format and structure

## Decision Outcome

Chosen option: "MADR 2.1.2", because

* Implicit assumptions should be made explicit.
  Design documentation is important to enable people understanding the decisions later on.
  See also [A rational design process: How and why to fake it](https://doi.org/10.1109/TSE.1986.6312940).
* The MADR format is lean and fits our development style.
* The MADR structure is comprehensible and facilitates usage & maintenance.
* The MADR project is vivid.
* Version 2.1.2 is the latest one available when starting to document ADRs.
`,
        adr: new ArchitecturalDecisionRecord({
            title: "Use Markdown Architectural Decision Records",
            contextAndProblemStatement: `We want to record architectural decisions made in this project.
Which format and structure should these records follow?`,
            consideredOptions: [
                {
                    title: "[MADR](https://adr.github.io/madr/) 2.1.2 – The Markdown Architectural Decision Records",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: '[Michael Nygard\'s template](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions) – The first incarnation of the term "ADR"',
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "[Sustainable Architectural Decisions](https://www.infoq.com/articles/sustainable-architectural-design-decisions) – The Y-Statements",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "Other templates listed at <https://github.com/joelparkerhenderson/architecture_decision_record>",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "Formless – No conventions for file format and structure",
                    description: "",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "MADR 2.1.2",
                explanation: `* Implicit assumptions should be made explicit.
  Design documentation is important to enable people understanding the decisions later on.
  See also [A rational design process: How and why to fake it](https://doi.org/10.1109/TSE.1986.6312940).
* The MADR format is lean and fits our development style.
* The MADR structure is comprehensible and facilitates usage & maintenance.
* The MADR project is vivid.
* Version 2.1.2 is the latest one available when starting to document ADRs.`,
                positiveConsequences: [],
                negativeConsequences: []
            }
        })
    },

    // madr/docs/adr/0001-use-CC0-as-license.md
    {
        md: `
# Use CC0 as license

Everything needs to be licensed, otherwise the default copyright laws apply.
For instance, in Germany that means users may not alter anything without explicitly asking for permission.
For more information see <https://help.github.com/articles/licensing-a-repository/>.

We want to have MADR used without any hassle and that users can just go ahead and write MADRs.

## Considered Options

* [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)
* No license
* Other open source licenses

## Decision Outcome

Chosen option: "CC0", because this license donates the content to "public domain" and does so as legally as possible.
`,
        adr: new ArchitecturalDecisionRecord({
            title: "Use CC0 as license",
            contextAndProblemStatement: `Everything needs to be licensed, otherwise the default copyright laws apply.
For instance, in Germany that means users may not alter anything without explicitly asking for permission.
For more information see <https://help.github.com/articles/licensing-a-repository/>.

We want to have MADR used without any hassle and that users can just go ahead and write MADRs.`,
            consideredOptions: [
                {
                    title: "[CC0](https://creativecommons.org/share-your-work/public-domain/cc0/)",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "No license",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "Other open source licenses",
                    description: "",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "CC0",
                explanation: `this license donates the content to "public domain" and does so as legally as possible.`,
                positiveConsequences: [],
                negativeConsequences: []
            }
        })
    },

    // madr/docs/adr/0002-do-not-use-numbers-in-headings.md
    // Misses the '"' around the chose option and the heading 'Context and Problem Statement'
    {
        md: `# Do not use numbers in headings

How to render the first line in an ADR?
ADRs have to take a unique identifier.

## Considered Options

* Use the title only
* Add the ADR number in front of the title (e.g., "# 2. Do not use numbers in headings")

## Decision Outcome

Chosen option: Use the title only, because

* This is common in other markdown files, too.
  One does not add numbering manually at the markdown files, but tries to get the numbers injected by the rendering framework or CSS.
* Enables renaming of ADRs (before publication) easily
* Allows copy'n'paste of ADRs from other repositories without having to worry about the numbers.
`,
        adr: new ArchitecturalDecisionRecord({
            title: "Do not use numbers in headings",
            contextAndProblemStatement: `How to render the first line in an ADR?
ADRs have to take a unique identifier.`,
            consideredOptions: [
                {
                    title: "Use the title only",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: 'Add the ADR number in front of the title (e.g., "# 2. Do not use numbers in headings")',
                    description: "",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "Use the title only",
                explanation: `* This is common in other markdown files, too.
  One does not add numbering manually at the markdown files, but tries to get the numbers injected by the rendering framework or CSS.
* Enables renaming of ADRs (before publication) easily
* Allows copy'n'paste of ADRs from other repositories without having to worry about the numbers.`,
                positiveConsequences: [],
                negativeConsequences: []
            }
        })
    },

    // madr/master/docs/adr/0005-use-dashes-in-filenames.md
    {
        md: `# Use dashes in filenames

What is the pattern of the filename where an ADR is stored?

## Considered Options

* \`NNNN-title-with-dashes.md\` - format used by [adr-tools](https://github.com/npryce/adr-tools)
* \`YYYY-MM-DD Title\` - see https://github.com/joelparkerhenderson/architecture_decision_record#adr-file-name-conventions

## Decision Outcome

Chosen option: \`NNNN-title-with-dashes.md\`, because

* \`NNNN\` provides a unique number, which can be used for referencing in the forms
  * \`ADR-0001\` in plain text and
  * by \`@ADR(1)\` Java code (enabled by [e-adr](https://adr.github.io/e-adr/))
* The creation time of an ADR is of historical interest only, if it gets updated somehow.
  The arguments are similar than the ones by [Does Git have keyword expansion?](https://git.wiki.kernel.org/index.php/GitFaq#Does_Git_have_keyword_expansion.3F)
* Having no spaces in filenames eases working in the command line
* This is exactly the format offered by [adr-tools](https://github.com/npryce/adr-tools)
`,
        adr: new ArchitecturalDecisionRecord({
            title: "Use dashes in filenames",
            contextAndProblemStatement: `What is the pattern of the filename where an ADR is stored?`,
            consideredOptions: [
                {
                    title: "`NNNN-title-with-dashes.md` - format used by [adr-tools](https://github.com/npryce/adr-tools)",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "`YYYY-MM-DD Title` - see https://github.com/joelparkerhenderson/architecture_decision_record#adr-file-name-conventions",
                    description: "",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "NNNN-title-with-dashes.md",
                explanation: `* \`NNNN\` provides a unique number, which can be used for referencing in the forms
  * \`ADR-0001\` in plain text and
  * by \`@ADR(1)\` Java code (enabled by [e-adr](https://adr.github.io/e-adr/))
* The creation time of an ADR is of historical interest only, if it gets updated somehow.
  The arguments are similar than the ones by [Does Git have keyword expansion?](https://git.wiki.kernel.org/index.php/GitFaq#Does_Git_have_keyword_expansion.3F)
* Having no spaces in filenames eases working in the command line
* This is exactly the format offered by [adr-tools](https://github.com/npryce/adr-tools)`,
                positiveConsequences: [],
                negativeConsequences: []
            }
        })
    },

    // madr/master/docs/adr/0010-support-categories.md
    {
        md: `# Support categories

## Context and Problem Statement

ADRs are recorded. The number of ADRs grows and the context/topic/scope of ADRs might be different (e.g., frontend, backend)

## Decision Drivers

* Easy to find groups ADRs in hundreds of ADRs
* Easy to group
* Easy to create
* Good finding without external tooling
* Keep newcomers in mind (should be doable in <10 minutes)
* Keep template lean

## Considered Options

* Use labels
* Add \`* Category: CATEGORY\` directly under the heading (similar to https://gist.github.com/FaKeller/2f9c63b6e1d436abb7358b68bf396f57)
* Use YAML frontmatter
* Encode category in filename
* Use subfolders with local ids
* Use subfolders with global ids
* Don't do it.

## Decision Outcome

Chosen option: "Use subfolders with local ids"

## Pros and Cons of the Options

### Use labels

Example:  

Use Angular ![category-frontend](https://img.shields.io/badge/category-frontend-blue.svg?style=flat-square)

\`![category-frontend](https://img.shields.io/badge/category-frontend-blue.svg?style=flat-square)\`

* Good, because full markdown
* Good, because linking to an overview page is possible (using markdown)
* Bad, because not straight-forward to parse
* Bad, because no simple filtering using \`ls\` or Windows Explorer is possible

### Add \`* Category: CATEGORY\` directly under the heading 

* Good, because full markdown
* Good, because linking to an overview page is possible (using markdown)
* Good, because straight-forward to parse
* Bad, because no simple filtering using \`ls\` or Windows Explorer is possible

### Use YAML  frontmatter

Example:

\`\`\`yaml
---
category: frontend
---
\`\`\`

* Good, because nearly straight-forward to parse
* Good, because Jekyll supports it
* Bad, because YAML frontmatter is not part of the [CommonMarc Spec](http://spec.commonmark.org/)
* Bad, because no simple filtering using \`ls\` or Windows Explorer is possible

### Encode category in filename

Example: \`0050--frontend--title-with-dashes.md\`

* Good, because programmatic filtering is possible
* Good, because \`ls -la | grep --category--\` works
* Bad, because plain file list in Windows explorer cannot be filtered
* Bad, because as bad as [TagSpaces](https://www.tagspaces.org/), which stores the tags in the filenames in brackets. E.g., \`demo[demotag secondtag].md\`.

### Use subfolders with local ids

Optionally "to-be-categorized" folder.

One level of subfolder, not nested

#### Examples

* \`docs/adr/smar/0000-secure-entities.md\`
* \`docs/adr/smar/0001-flexible-properties-selection.md\`

#### Pros/cons

* Good, because grouping is done by folders (which are natural for grouping)
* Good, because typos can easily be spotted
* Bad, because there is no unique number identifying an ADR
* Bad, because two indices have to be maintained (adr-log needs to be updated)
* Bad, because e-adr needs to be adapted to \`@ADR("category", number)\` (not that bad)
* Bad, because when category is unknown it is hard to find the right folder
* Bad, because using categories might be hampering newcomers

### Use subfolders with global ids

#### Examples

* \`docs/adr/smar/0005-secure-entities.md\`
* \`docs/adr/smar/0047-flexible-properties-selection.md\`
`,

        adr: new ArchitecturalDecisionRecord({
            title: "Support categories",
            contextAndProblemStatement: `ADRs are recorded. The number of ADRs grows and the context/topic/scope of ADRs might be different (e.g., frontend, backend)`,
            decisionDrivers: [
                "Easy to find groups ADRs in hundreds of ADRs",
                "Easy to group",
                "Easy to create",
                "Good finding without external tooling",
                "Keep newcomers in mind (should be doable in <10 minutes)",
                "Keep template lean"
            ],
            consideredOptions: [
                {
                    title: "Use labels",
                    description: `Example:  

Use Angular ![category-frontend](https://img.shields.io/badge/category-frontend-blue.svg?style=flat-square)

\`![category-frontend](https://img.shields.io/badge/category-frontend-blue.svg?style=flat-square)\``,
                    pros: ["full markdown", "linking to an overview page is possible (using markdown)"],
                    cons: [
                        "not straight-forward to parse",
                        "no simple filtering using `ls` or Windows Explorer is possible"
                    ]
                },
                {
                    title: "Add `* Category: CATEGORY` directly under the heading (similar to https://gist.github.com/FaKeller/2f9c63b6e1d436abb7358b68bf396f57)",
                    description: "",
                    pros: [
                        "full markdown",
                        "linking to an overview page is possible (using markdown)",
                        "straight-forward to parse"
                    ],
                    cons: ["no simple filtering using `ls` or Windows Explorer is possible"]
                },
                {
                    title: "Use YAML frontmatter",
                    description: `Example:

\`\`\`yaml
---
category: frontend
---
\`\`\``,
                    pros: ["nearly straight-forward to parse", "Jekyll supports it"],
                    cons: [
                        "YAML frontmatter is not part of the [CommonMarc Spec](http://spec.commonmark.org/)",
                        "no simple filtering using `ls` or Windows Explorer is possible"
                    ]
                },
                {
                    title: "Encode category in filename",
                    description: "Example: `0050--frontend--title-with-dashes.md`",
                    pros: ["programmatic filtering is possible", "`ls -la | grep --category--` works"],
                    cons: [
                        "plain file list in Windows explorer cannot be filtered",
                        "as bad as [TagSpaces](https://www.tagspaces.org/), which stores the tags in the filenames in brackets. E.g., `demo[demotag secondtag].md`."
                    ]
                },
                {
                    title: "Use subfolders with local ids",
                    description: `Optionally "to-be-categorized" folder.

One level of subfolder, not nested

#### Examples

* \`docs/adr/smar/0000-secure-entities.md\`
* \`docs/adr/smar/0001-flexible-properties-selection.md\`

#### Pros/cons`,
                    pros: [
                        "grouping is done by folders (which are natural for grouping)",
                        "typos can easily be spotted"
                    ],
                    cons: [
                        "there is no unique number identifying an ADR",
                        "two indices have to be maintained (adr-log needs to be updated)",
                        'e-adr needs to be adapted to `@ADR("category", number)` (not that bad)',
                        "when category is unknown it is hard to find the right folder",
                        "using categories might be hampering newcomers"
                    ]
                },
                {
                    title: "Use subfolders with global ids",
                    description: `#### Examples

* \`docs/adr/smar/0005-secure-entities.md\`
* \`docs/adr/smar/0047-flexible-properties-selection.md\``,
                    pros: [],
                    cons: []
                },
                {
                    title: "Don't do it.",
                    description: "",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "Use subfolders with local ids",
                explanation: ``,
                positiveConsequences: [],
                negativeConsequences: []
            }
        })
    },

    // Option list misses one option of "Pros and Cons of the Options" (D)
    // Option names have only prefix matching (A <-> As, B <-> Bs)
    {
        md: `# Heading

## Context and Problem Statement

Context

## Considered Options

* A
* Bs
* C

## Decision Outcome

Chosen option: "ABC", because comes out best.

### Positive Consequences

* positive consequence

## Pros and Cons of the Options

### As

A description


### B

B description


### D

D description

`,
        adr: new ArchitecturalDecisionRecord({
            title: "Heading",
            contextAndProblemStatement: `Context`,
            consideredOptions: [
                {
                    title: "A",
                    description: "A description",
                    pros: [],
                    cons: []
                },
                {
                    title: "Bs",
                    description: "B description",
                    pros: [],
                    cons: []
                },
                {
                    title: "C",
                    description: "",
                    pros: [],
                    cons: []
                },
                {
                    title: "D",
                    description: "D description",
                    pros: [],
                    cons: []
                }
            ],
            decisionOutcome: {
                chosenOption: "ABC",
                explanation: `comes out best.`,
                positiveConsequences: ["positive consequence"],
                negativeConsequences: []
            }
        })
    }
];

/**
 * These strings are used to test if the parser does always accept its own output after parsing it once.
 * The actual result does not matter, just the immediate "convergence" of the result.
 */
export const randomStrings = [
    // Really just some random nonsense
    "",
    "# ABC",
    `# This is a title

Hey my name is Peter Parker.

# Pros and Cons of Options
`,
    `## This one has no title.
`,
    `# Title
1. Ein Punkt in einer geordneten Liste   
2. Ein weiterer Punkt; bei der Eingabe muss nicht auf irgendeine Reihenfolge geachtet werden, sondern nur darauf, dass es beliebige Ziffern sind   
1. Noch ein Punkt, der zeigt, dass auch die mehrfache Angabe derselben Ziffer möglich ist



`,
    // An actual ADR
    `# Heading

* Status: proposed
* Deciders: Peter Parker
* Date: 2021-01-05

Technical Story: Long story

## Context and Problem Statement

context

## Decision Drivers

* driver

## Considered Options

* Test Option

## Decision Outcome

Chosen option: "undefined", because comes out best (see below).

### Positive Consequences

* abc

### Negative Consequences

* :)

## Pros and Cons of the Options

### Test Option

Test argument

* Good, because yay
* Bad, because nay

## Links

* ~~
`
];

/**
 * Data for mocking the GitHub API
 */

/** First two result pages of 'https://api.github.com/repositories' on 06-01-2020 */

export const searchTermRepoPairs = [
    {
        searchTerm: "ap",
        results: [
            {
                id: 647818505,
                node_id: "R_kgDOJpztCQ",
                name: "foodapp",
                full_name: "tasbihaasim/foodapp",
                private: true,
                owner: {
                    login: "tasbihaasim",
                    id: 54742672,
                    node_id: "MDQ6VXNlcjU0NzQyNjcy",
                    avatar_url: "https://avatars.githubusercontent.com/u/54742672?v=4",
                    gravatar_id: "",
                    url: "https://api.github.com/users/tasbihaasim",
                    html_url: "https://github.com/tasbihaasim",
                    followers_url: "https://api.github.com/users/tasbihaasim/followers",
                    following_url: "https://api.github.com/users/tasbihaasim/following{/other_user}",
                    gists_url: "https://api.github.com/users/tasbihaasim/gists{/gist_id}",
                    starred_url: "https://api.github.com/users/tasbihaasim/starred{/owner}{/repo}",
                    subscriptions_url: "https://api.github.com/users/tasbihaasim/subscriptions",
                    organizations_url: "https://api.github.com/users/tasbihaasim/orgs",
                    repos_url: "https://api.github.com/users/tasbihaasim/repos",
                    events_url: "https://api.github.com/users/tasbihaasim/events{/privacy}",
                    received_events_url: "https://api.github.com/users/tasbihaasim/received_events",
                    type: "User",
                    site_admin: false
                },
                html_url: "https://github.com/tasbihaasim/foodapp",
                description: null,
                fork: false,
                url: "https://api.github.com/repos/tasbihaasim/foodapp",
                forks_url: "https://api.github.com/repos/tasbihaasim/foodapp/forks",
                keys_url: "https://api.github.com/repos/tasbihaasim/foodapp/keys{/key_id}",
                collaborators_url: "https://api.github.com/repos/tasbihaasim/foodapp/collaborators{/collaborator}",
                teams_url: "https://api.github.com/repos/tasbihaasim/foodapp/teams",
                hooks_url: "https://api.github.com/repos/tasbihaasim/foodapp/hooks",
                issue_events_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues/events{/number}",
                events_url: "https://api.github.com/repos/tasbihaasim/foodapp/events",
                assignees_url: "https://api.github.com/repos/tasbihaasim/foodapp/assignees{/user}",
                branches_url: "https://api.github.com/repos/tasbihaasim/foodapp/branches{/branch}",
                tags_url: "https://api.github.com/repos/tasbihaasim/foodapp/tags",
                blobs_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/blobs{/sha}",
                git_tags_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/tags{/sha}",
                git_refs_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/refs{/sha}",
                trees_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/trees{/sha}",
                statuses_url: "https://api.github.com/repos/tasbihaasim/foodapp/statuses/{sha}",
                languages_url: "https://api.github.com/repos/tasbihaasim/foodapp/languages",
                stargazers_url: "https://api.github.com/repos/tasbihaasim/foodapp/stargazers",
                contributors_url: "https://api.github.com/repos/tasbihaasim/foodapp/contributors",
                subscribers_url: "https://api.github.com/repos/tasbihaasim/foodapp/subscribers",
                subscription_url: "https://api.github.com/repos/tasbihaasim/foodapp/subscription",
                commits_url: "https://api.github.com/repos/tasbihaasim/foodapp/commits{/sha}",
                git_commits_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/commits{/sha}",
                comments_url: "https://api.github.com/repos/tasbihaasim/foodapp/comments{/number}",
                issue_comment_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues/comments{/number}",
                contents_url: "https://api.github.com/repos/tasbihaasim/foodapp/contents/{+path}",
                compare_url: "https://api.github.com/repos/tasbihaasim/foodapp/compare/{base}...{head}",
                merges_url: "https://api.github.com/repos/tasbihaasim/foodapp/merges",
                archive_url: "https://api.github.com/repos/tasbihaasim/foodapp/{archive_format}{/ref}",
                downloads_url: "https://api.github.com/repos/tasbihaasim/foodapp/downloads",
                issues_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues{/number}",
                pulls_url: "https://api.github.com/repos/tasbihaasim/foodapp/pulls{/number}",
                milestones_url: "https://api.github.com/repos/tasbihaasim/foodapp/milestones{/number}",
                notifications_url:
                    "https://api.github.com/repos/tasbihaasim/foodapp/notifications{?since,all,participating}",
                labels_url: "https://api.github.com/repos/tasbihaasim/foodapp/labels{/name}",
                releases_url: "https://api.github.com/repos/tasbihaasim/foodapp/releases{/id}",
                deployments_url: "https://api.github.com/repos/tasbihaasim/foodapp/deployments",
                created_at: "2023-05-31T15:26:03Z",
                updated_at: "2023-05-31T15:26:12Z",
                pushed_at: "2023-05-31T16:31:10Z",
                git_url: "git://github.com/tasbihaasim/foodapp.git",
                ssh_url: "git@github.com:tasbihaasim/foodapp.git",
                clone_url: "https://github.com/tasbihaasim/foodapp.git",
                svn_url: "https://github.com/tasbihaasim/foodapp",
                homepage: null,
                size: 201,
                stargazers_count: 0,
                watchers_count: 0,
                language: "JavaScript",
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: false,
                has_pages: false,
                has_discussions: false,
                forks_count: 0,
                mirror_url: null,
                archived: false,
                disabled: false,
                open_issues_count: 0,
                license: null,
                allow_forking: true,
                is_template: false,
                web_commit_signoff_required: false,
                topics: [],
                visibility: "private",
                forks: 0,
                open_issues: 0,
                watchers: 0,
                default_branch: "master",
                permissions: {
                    admin: false,
                    maintain: false,
                    push: true,
                    triage: true,
                    pull: true
                }
            },
            {
                id: 359202375,
                node_id: "MDEwOlJlcG9zaXRvcnkzNTkyMDIzNzU=",
                name: "ChatApplication",
                full_name: "Moneexa/Chatapplication",
                private: false,
                owner: {
                    login: "Moneexa",
                    id: 24852044,
                    node_id: "MDQ6VXNlcjI0ODUyMDQ0",
                    avatar_url: "https://avatars.githubusercontent.com/u/24852044?v=4",
                    gravatar_id: "",
                    url: "https://api.github.com/users/Moneexa",
                    html_url: "https://github.com/Moneexa",
                    followers_url: "https://api.github.com/users/Moneexa/followers",
                    following_url: "https://api.github.com/users/Moneexa/following{/other_user}",
                    gists_url: "https://api.github.com/users/Moneexa/gists{/gist_id}",
                    starred_url: "https://api.github.com/users/Moneexa/starred{/owner}{/repo}",
                    subscriptions_url: "https://api.github.com/users/Moneexa/subscriptions",
                    organizations_url: "https://api.github.com/users/Moneexa/orgs",
                    repos_url: "https://api.github.com/users/Moneexa/repos",
                    events_url: "https://api.github.com/users/Moneexa/events{/privacy}",
                    received_events_url: "https://api.github.com/users/Moneexa/received_events",
                    type: "User",
                    site_admin: false
                },
                html_url: "https://github.com/Moneexa/ChatApplication",
                description: null,
                fork: false,
                url: "https://api.github.com/repos/Moneexa/ChatApplication",
                forks_url: "https://api.github.com/repos/Moneexa/ChatApplication/forks",
                keys_url: "https://api.github.com/repos/Moneexa/ChatApplication/keys{/key_id}",
                collaborators_url: "https://api.github.com/repos/Moneexa/ChatApplication/collaborators{/collaborator}",
                teams_url: "https://api.github.com/repos/Moneexa/ChatApplication/teams",
                hooks_url: "https://api.github.com/repos/Moneexa/ChatApplication/hooks",
                issue_events_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues/events{/number}",
                events_url: "https://api.github.com/repos/Moneexa/ChatApplication/events",
                assignees_url: "https://api.github.com/repos/Moneexa/ChatApplication/assignees{/user}",
                branches_url: "https://api.github.com/repos/Moneexa/ChatApplication/branches{/branch}",
                tags_url: "https://api.github.com/repos/Moneexa/ChatApplication/tags",
                blobs_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/blobs{/sha}",
                git_tags_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/tags{/sha}",
                git_refs_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/refs{/sha}",
                trees_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/trees{/sha}",
                statuses_url: "https://api.github.com/repos/Moneexa/ChatApplication/statuses/{sha}",
                languages_url: "https://api.github.com/repos/Moneexa/ChatApplication/languages",
                stargazers_url: "https://api.github.com/repos/Moneexa/ChatApplication/stargazers",
                contributors_url: "https://api.github.com/repos/Moneexa/ChatApplication/contributors",
                subscribers_url: "https://api.github.com/repos/Moneexa/ChatApplication/subscribers",
                subscription_url: "https://api.github.com/repos/Moneexa/ChatApplication/subscription",
                commits_url: "https://api.github.com/repos/Moneexa/ChatApplication/commits{/sha}",
                git_commits_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/commits{/sha}",
                comments_url: "https://api.github.com/repos/Moneexa/ChatApplication/comments{/number}",
                issue_comment_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues/comments{/number}",
                contents_url: "https://api.github.com/repos/Moneexa/ChatApplication/contents/{+path}",
                compare_url: "https://api.github.com/repos/Moneexa/ChatApplication/compare/{base}...{head}",
                merges_url: "https://api.github.com/repos/Moneexa/ChatApplication/merges",
                archive_url: "https://api.github.com/repos/Moneexa/ChatApplication/{archive_format}{/ref}",
                downloads_url: "https://api.github.com/repos/Moneexa/ChatApplication/downloads",
                issues_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues{/number}",
                pulls_url: "https://api.github.com/repos/Moneexa/ChatApplication/pulls{/number}",
                milestones_url: "https://api.github.com/repos/Moneexa/ChatApplication/milestones{/number}",
                notifications_url:
                    "https://api.github.com/repos/Moneexa/ChatApplication/notifications{?since,all,participating}",
                labels_url: "https://api.github.com/repos/Moneexa/ChatApplication/labels{/name}",
                releases_url: "https://api.github.com/repos/Moneexa/ChatApplication/releases{/id}",
                deployments_url: "https://api.github.com/repos/Moneexa/ChatApplication/deployments",
                created_at: "2021-04-18T16:52:46Z",
                updated_at: "2021-05-17T11:25:46Z",
                pushed_at: "2021-05-17T11:25:43Z",
                git_url: "git://github.com/Moneexa/ChatApplication.git",
                ssh_url: "git@github.com:Moneexa/ChatApplication.git",
                clone_url: "https://github.com/Moneexa/ChatApplication.git",
                svn_url: "https://github.com/Moneexa/ChatApplication",
                homepage: null,
                size: 552,
                stargazers_count: 0,
                watchers_count: 0,
                language: "TypeScript",
                has_issues: true,
                has_projects: true,
                has_downloads: true,
                has_wiki: true,
                has_pages: false,
                has_discussions: false,
                forks_count: 0,
                mirror_url: null,
                archived: false,
                disabled: false,
                open_issues_count: 0,
                license: null,
                allow_forking: true,
                is_template: false,
                web_commit_signoff_required: false,
                topics: [],
                visibility: "public",
                forks: 0,
                open_issues: 0,
                watchers: 0,
                default_branch: "master",
                permissions: {
                    admin: true,
                    maintain: true,
                    push: true,
                    triage: true,
                    pull: true
                }
            }
        ]
    }
];

export const mockedValues = {
    data: [
        {
            id: 304013826,
            node_id: "MDEwOlJlcG9zaXRvcnkzMDQwMTM4MjY=",
            name: "adr-manager",
            full_name: "adr/adr-manager",
            private: false,
            owner: {
                login: "adr",
                id: 30127167,
                node_id: "MDEyOk9yZ2FuaXphdGlvbjMwMTI3MTY3",
                avatar_url: "https://avatars.githubusercontent.com/u/30127167?v=4",
                gravatar_id: "",
                url: "https://api.github.com/users/adr",
                html_url: "https://github.com/adr",
                followers_url: "https://api.github.com/users/adr/followers",
                following_url: "https://api.github.com/users/adr/following{/other_user}",
                gists_url: "https://api.github.com/users/adr/gists{/gist_id}",
                starred_url: "https://api.github.com/users/adr/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/adr/subscriptions",
                organizations_url: "https://api.github.com/users/adr/orgs",
                repos_url: "https://api.github.com/users/adr/repos",
                events_url: "https://api.github.com/users/adr/events{/privacy}",
                received_events_url: "https://api.github.com/users/adr/received_events",
                type: "Organization",
                site_admin: false
            },
            html_url: "https://github.com/adr/adr-manager",
            description: "ADR-Manager",
            fork: false,
            url: "https://api.github.com/repos/adr/adr-manager",
            forks_url: "https://api.github.com/repos/adr/adr-manager/forks",
            keys_url: "https://api.github.com/repos/adr/adr-manager/keys{/key_id}",
            collaborators_url: "https://api.github.com/repos/adr/adr-manager/collaborators{/collaborator}",
            teams_url: "https://api.github.com/repos/adr/adr-manager/teams",
            hooks_url: "https://api.github.com/repos/adr/adr-manager/hooks",
            issue_events_url: "https://api.github.com/repos/adr/adr-manager/issues/events{/number}",
            events_url: "https://api.github.com/repos/adr/adr-manager/events",
            assignees_url: "https://api.github.com/repos/adr/adr-manager/assignees{/user}",
            branches_url: "https://api.github.com/repos/adr/adr-manager/branches{/branch}",
            tags_url: "https://api.github.com/repos/adr/adr-manager/tags",
            blobs_url: "https://api.github.com/repos/adr/adr-manager/git/blobs{/sha}",
            git_tags_url: "https://api.github.com/repos/adr/adr-manager/git/tags{/sha}",
            git_refs_url: "https://api.github.com/repos/adr/adr-manager/git/refs{/sha}",
            trees_url: "https://api.github.com/repos/adr/adr-manager/git/trees{/sha}",
            statuses_url: "https://api.github.com/repos/adr/adr-manager/statuses/{sha}",
            languages_url: "https://api.github.com/repos/adr/adr-manager/languages",
            stargazers_url: "https://api.github.com/repos/adr/adr-manager/stargazers",
            contributors_url: "https://api.github.com/repos/adr/adr-manager/contributors",
            subscribers_url: "https://api.github.com/repos/adr/adr-manager/subscribers",
            subscription_url: "https://api.github.com/repos/adr/adr-manager/subscription",
            commits_url: "https://api.github.com/repos/adr/adr-manager/commits{/sha}",
            git_commits_url: "https://api.github.com/repos/adr/adr-manager/git/commits{/sha}",
            comments_url: "https://api.github.com/repos/adr/adr-manager/comments{/number}",
            issue_comment_url: "https://api.github.com/repos/adr/adr-manager/issues/comments{/number}",
            contents_url: "https://api.github.com/repos/adr/adr-manager/contents/{+path}",
            compare_url: "https://api.github.com/repos/adr/adr-manager/compare/{base}...{head}",
            merges_url: "https://api.github.com/repos/adr/adr-manager/merges",
            archive_url: "https://api.github.com/repos/adr/adr-manager/{archive_format}{/ref}",
            downloads_url: "https://api.github.com/repos/adr/adr-manager/downloads",
            issues_url: "https://api.github.com/repos/adr/adr-manager/issues{/number}",
            pulls_url: "https://api.github.com/repos/adr/adr-manager/pulls{/number}",
            milestones_url: "https://api.github.com/repos/adr/adr-manager/milestones{/number}",
            notifications_url: "https://api.github.com/repos/adr/adr-manager/notifications{?since,all,participating}",
            labels_url: "https://api.github.com/repos/adr/adr-manager/labels{/name}",
            releases_url: "https://api.github.com/repos/adr/adr-manager/releases{/id}",
            deployments_url: "https://api.github.com/repos/adr/adr-manager/deployments",
            created_at: "2020-10-14T12:51:16Z",
            updated_at: "2023-12-03T18:23:48Z",
            pushed_at: "2023-12-02T21:11:01Z",
            git_url: "git://github.com/adr/adr-manager.git",
            ssh_url: "git@github.com:adr/adr-manager.git",
            clone_url: "https://github.com/adr/adr-manager.git",
            svn_url: "https://github.com/adr/adr-manager",
            homepage: "https://adr.github.io/adr-manager/",
            size: 6721,
            stargazers_count: 87,
            watchers_count: 87,
            language: "JavaScript",
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: false,
            has_pages: true,
            has_discussions: false,
            forks_count: 14,
            mirror_url: null,
            archived: false,
            disabled: false,
            open_issues_count: 54,
            license: {
                key: "mit",
                name: "MIT License",
                spdx_id: "MIT",
                url: "https://api.github.com/licenses/mit",
                node_id: "MDc6TGljZW5zZTEz"
            },
            allow_forking: true,
            is_template: false,
            web_commit_signoff_required: false,
            topics: ["adr", "architectural-decision-records", "architecure", "github", "madr", "madr-editor"],
            visibility: "public",
            forks: 14,
            open_issues: 54,
            watchers: 87,
            default_branch: "main",
            permissions: {
                admin: true,
                maintain: true,
                push: true,
                triage: true,
                pull: true
            }
        },
        {
            id: 647818505,
            node_id: "R_kgDOJpztCQ",
            name: "foodapp",
            full_name: "tasbihaasim/foodapp",
            private: true,
            owner: {
                login: "tasbihaasim",
                id: 54742672,
                node_id: "MDQ6VXNlcjU0NzQyNjcy",
                avatar_url: "https://avatars.githubusercontent.com/u/54742672?v=4",
                gravatar_id: "",
                url: "https://api.github.com/users/tasbihaasim",
                html_url: "https://github.com/tasbihaasim",
                followers_url: "https://api.github.com/users/tasbihaasim/followers",
                following_url: "https://api.github.com/users/tasbihaasim/following{/other_user}",
                gists_url: "https://api.github.com/users/tasbihaasim/gists{/gist_id}",
                starred_url: "https://api.github.com/users/tasbihaasim/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/tasbihaasim/subscriptions",
                organizations_url: "https://api.github.com/users/tasbihaasim/orgs",
                repos_url: "https://api.github.com/users/tasbihaasim/repos",
                events_url: "https://api.github.com/users/tasbihaasim/events{/privacy}",
                received_events_url: "https://api.github.com/users/tasbihaasim/received_events",
                type: "User",
                site_admin: false
            },
            html_url: "https://github.com/tasbihaasim/foodapp",
            description: null,
            fork: false,
            url: "https://api.github.com/repos/tasbihaasim/foodapp",
            forks_url: "https://api.github.com/repos/tasbihaasim/foodapp/forks",
            keys_url: "https://api.github.com/repos/tasbihaasim/foodapp/keys{/key_id}",
            collaborators_url: "https://api.github.com/repos/tasbihaasim/foodapp/collaborators{/collaborator}",
            teams_url: "https://api.github.com/repos/tasbihaasim/foodapp/teams",
            hooks_url: "https://api.github.com/repos/tasbihaasim/foodapp/hooks",
            issue_events_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues/events{/number}",
            events_url: "https://api.github.com/repos/tasbihaasim/foodapp/events",
            assignees_url: "https://api.github.com/repos/tasbihaasim/foodapp/assignees{/user}",
            branches_url: "https://api.github.com/repos/tasbihaasim/foodapp/branches{/branch}",
            tags_url: "https://api.github.com/repos/tasbihaasim/foodapp/tags",
            blobs_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/blobs{/sha}",
            git_tags_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/tags{/sha}",
            git_refs_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/refs{/sha}",
            trees_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/trees{/sha}",
            statuses_url: "https://api.github.com/repos/tasbihaasim/foodapp/statuses/{sha}",
            languages_url: "https://api.github.com/repos/tasbihaasim/foodapp/languages",
            stargazers_url: "https://api.github.com/repos/tasbihaasim/foodapp/stargazers",
            contributors_url: "https://api.github.com/repos/tasbihaasim/foodapp/contributors",
            subscribers_url: "https://api.github.com/repos/tasbihaasim/foodapp/subscribers",
            subscription_url: "https://api.github.com/repos/tasbihaasim/foodapp/subscription",
            commits_url: "https://api.github.com/repos/tasbihaasim/foodapp/commits{/sha}",
            git_commits_url: "https://api.github.com/repos/tasbihaasim/foodapp/git/commits{/sha}",
            comments_url: "https://api.github.com/repos/tasbihaasim/foodapp/comments{/number}",
            issue_comment_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues/comments{/number}",
            contents_url: "https://api.github.com/repos/tasbihaasim/foodapp/contents/{+path}",
            compare_url: "https://api.github.com/repos/tasbihaasim/foodapp/compare/{base}...{head}",
            merges_url: "https://api.github.com/repos/tasbihaasim/foodapp/merges",
            archive_url: "https://api.github.com/repos/tasbihaasim/foodapp/{archive_format}{/ref}",
            downloads_url: "https://api.github.com/repos/tasbihaasim/foodapp/downloads",
            issues_url: "https://api.github.com/repos/tasbihaasim/foodapp/issues{/number}",
            pulls_url: "https://api.github.com/repos/tasbihaasim/foodapp/pulls{/number}",
            milestones_url: "https://api.github.com/repos/tasbihaasim/foodapp/milestones{/number}",
            notifications_url:
                "https://api.github.com/repos/tasbihaasim/foodapp/notifications{?since,all,participating}",
            labels_url: "https://api.github.com/repos/tasbihaasim/foodapp/labels{/name}",
            releases_url: "https://api.github.com/repos/tasbihaasim/foodapp/releases{/id}",
            deployments_url: "https://api.github.com/repos/tasbihaasim/foodapp/deployments",
            created_at: "2023-05-31T15:26:03Z",
            updated_at: "2023-05-31T15:26:12Z",
            pushed_at: "2023-05-31T16:31:10Z",
            git_url: "git://github.com/tasbihaasim/foodapp.git",
            ssh_url: "git@github.com:tasbihaasim/foodapp.git",
            clone_url: "https://github.com/tasbihaasim/foodapp.git",
            svn_url: "https://github.com/tasbihaasim/foodapp",
            homepage: null,
            size: 201,
            stargazers_count: 0,
            watchers_count: 0,
            language: "JavaScript",
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: false,
            has_pages: false,
            has_discussions: false,
            forks_count: 0,
            mirror_url: null,
            archived: false,
            disabled: false,
            open_issues_count: 0,
            license: null,
            allow_forking: true,
            is_template: false,
            web_commit_signoff_required: false,
            topics: [],
            visibility: "private",
            forks: 0,
            open_issues: 0,
            watchers: 0,
            default_branch: "master",
            permissions: {
                admin: false,
                maintain: false,
                push: true,
                triage: true,
                pull: true
            }
        },
        {
            id: 359202375,
            node_id: "MDEwOlJlcG9zaXRvcnkzNTkyMDIzNzU=",
            name: "ChatApplication",
            full_name: "Moneexa/Chatapplication",
            private: false,
            owner: {
                login: "Moneexa",
                id: 24852044,
                node_id: "MDQ6VXNlcjI0ODUyMDQ0",
                avatar_url: "https://avatars.githubusercontent.com/u/24852044?v=4",
                gravatar_id: "",
                url: "https://api.github.com/users/Moneexa",
                html_url: "https://github.com/Moneexa",
                followers_url: "https://api.github.com/users/Moneexa/followers",
                following_url: "https://api.github.com/users/Moneexa/following{/other_user}",
                gists_url: "https://api.github.com/users/Moneexa/gists{/gist_id}",
                starred_url: "https://api.github.com/users/Moneexa/starred{/owner}{/repo}",
                subscriptions_url: "https://api.github.com/users/Moneexa/subscriptions",
                organizations_url: "https://api.github.com/users/Moneexa/orgs",
                repos_url: "https://api.github.com/users/Moneexa/repos",
                events_url: "https://api.github.com/users/Moneexa/events{/privacy}",
                received_events_url: "https://api.github.com/users/Moneexa/received_events",
                type: "User",
                site_admin: false
            },
            html_url: "https://github.com/Moneexa/ChatApplication",
            description: null,
            fork: false,
            url: "https://api.github.com/repos/Moneexa/ChatApplication",
            forks_url: "https://api.github.com/repos/Moneexa/ChatApplication/forks",
            keys_url: "https://api.github.com/repos/Moneexa/ChatApplication/keys{/key_id}",
            collaborators_url: "https://api.github.com/repos/Moneexa/ChatApplication/collaborators{/collaborator}",
            teams_url: "https://api.github.com/repos/Moneexa/ChatApplication/teams",
            hooks_url: "https://api.github.com/repos/Moneexa/ChatApplication/hooks",
            issue_events_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues/events{/number}",
            events_url: "https://api.github.com/repos/Moneexa/ChatApplication/events",
            assignees_url: "https://api.github.com/repos/Moneexa/ChatApplication/assignees{/user}",
            branches_url: "https://api.github.com/repos/Moneexa/ChatApplication/branches{/branch}",
            tags_url: "https://api.github.com/repos/Moneexa/ChatApplication/tags",
            blobs_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/blobs{/sha}",
            git_tags_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/tags{/sha}",
            git_refs_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/refs{/sha}",
            trees_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/trees{/sha}",
            statuses_url: "https://api.github.com/repos/Moneexa/ChatApplication/statuses/{sha}",
            languages_url: "https://api.github.com/repos/Moneexa/ChatApplication/languages",
            stargazers_url: "https://api.github.com/repos/Moneexa/ChatApplication/stargazers",
            contributors_url: "https://api.github.com/repos/Moneexa/ChatApplication/contributors",
            subscribers_url: "https://api.github.com/repos/Moneexa/ChatApplication/subscribers",
            subscription_url: "https://api.github.com/repos/Moneexa/ChatApplication/subscription",
            commits_url: "https://api.github.com/repos/Moneexa/ChatApplication/commits{/sha}",
            git_commits_url: "https://api.github.com/repos/Moneexa/ChatApplication/git/commits{/sha}",
            comments_url: "https://api.github.com/repos/Moneexa/ChatApplication/comments{/number}",
            issue_comment_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues/comments{/number}",
            contents_url: "https://api.github.com/repos/Moneexa/ChatApplication/contents/{+path}",
            compare_url: "https://api.github.com/repos/Moneexa/ChatApplication/compare/{base}...{head}",
            merges_url: "https://api.github.com/repos/Moneexa/ChatApplication/merges",
            archive_url: "https://api.github.com/repos/Moneexa/ChatApplication/{archive_format}{/ref}",
            downloads_url: "https://api.github.com/repos/Moneexa/ChatApplication/downloads",
            issues_url: "https://api.github.com/repos/Moneexa/ChatApplication/issues{/number}",
            pulls_url: "https://api.github.com/repos/Moneexa/ChatApplication/pulls{/number}",
            milestones_url: "https://api.github.com/repos/Moneexa/ChatApplication/milestones{/number}",
            notifications_url:
                "https://api.github.com/repos/Moneexa/ChatApplication/notifications{?since,all,participating}",
            labels_url: "https://api.github.com/repos/Moneexa/ChatApplication/labels{/name}",
            releases_url: "https://api.github.com/repos/Moneexa/ChatApplication/releases{/id}",
            deployments_url: "https://api.github.com/repos/Moneexa/ChatApplication/deployments",
            created_at: "2021-04-18T16:52:46Z",
            updated_at: "2021-05-17T11:25:46Z",
            pushed_at: "2021-05-17T11:25:43Z",
            git_url: "git://github.com/Moneexa/ChatApplication.git",
            ssh_url: "git@github.com:Moneexa/ChatApplication.git",
            clone_url: "https://github.com/Moneexa/ChatApplication.git",
            svn_url: "https://github.com/Moneexa/ChatApplication",
            homepage: null,
            size: 552,
            stargazers_count: 0,
            watchers_count: 0,
            language: "TypeScript",
            has_issues: true,
            has_projects: true,
            has_downloads: true,
            has_wiki: true,
            has_pages: false,
            has_discussions: false,
            forks_count: 0,
            mirror_url: null,
            archived: false,
            disabled: false,
            open_issues_count: 0,
            license: null,
            allow_forking: true,
            is_template: false,
            web_commit_signoff_required: false,
            topics: [],
            visibility: "public",
            forks: 0,
            open_issues: 0,
            watchers: 0,
            default_branch: "master",
            permissions: {
                admin: true,
                maintain: true,
                push: true,
                triage: true,
                pull: true
            }
        }
    ]
};
