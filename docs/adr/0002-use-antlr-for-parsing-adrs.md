# Use ANTLR for parsing ADRs

* Status: accepted

Technical Story: Proposed in the GitHub Issues [#17](https://github.com/koppor/adr-manager/issues/17),  [#19](https://github.com/koppor/adr-manager/issues/19)

## Context and Problem Statement

ADR Manager needs to parse existing ADRs. Each ADR is stored in a markdown file. Example: https://github.com/adr/madr/blob/master/docs/adr/0001-use-CC0-as-license.md.

## Considered Options

* Use a generic Markdown Parser
* Use ANTLR to create an ADR specific parser
* Write a parser from scratch

## Decision Outcome

Chosen option: "Use ANTLR to create an ADR specific parser", because comes out best (see below).

### Positive Consequences

* Some existing ADRs are accepted now without changes.
* Better control over output

### Negative Consequences

* The new parser is worse at parsing "invalid" ADRs than the generic one.
* ANTLR Parser seems to be quite slow.

## Pros and Cons of the Options

### Use a generic Markdown Parser

Enhance generic Markdown parser and use the result of that parser. For that, available options are listed at https://github.com/f43i4n/md-schema/blob/master/docs/related-work.md.

This option was used in the mock-up with the library [md-to-json](https://github.com/ajithr/md-2-json).

* Good, because easiest solution.
* Good, because md-to-json can parse the json back to a Markdown.
* Bad, because md-to-json adds extra line breaks, which are hard to remove.

### Use ANTLR to create an ADR specific parser

Use ANTLR4 to write a parser specifically for ADRs.

* Good, because flexible parser and full control over output.
* Good, because hopefully maintainable. ANTLR Grammar can be used to specify how ADRs must look.
* Bad, because extra work.

### Write a parser from scratch

* Bad, because extra work.
* Bad, because writing stuff from scratch is a bad anti pattern.
