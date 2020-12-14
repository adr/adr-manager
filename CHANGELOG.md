# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Backend which is hosted on Heroku. The OAuth dance to the GitHub API is handled by [Pizzly](https://github.com/Bearer/Pizzly).
  - The OAuth App is named 'adr-manager' [#43](https://github.com/koppor/adr-manager/issues/43)
- Functionality to add a repository to the repositories displayed in the File Explorer. [#2](https://github.com/koppor/adr-manager/issues/23)
- 'Convert'-Tab that allows the user to compare his MADR to the parsed MADR before using the Editor. [#34](https://github.com/koppor/adr-manager/issues/34)
- Dialog for deleting an ADR. (Graphics only, missing functionality for now) [#23](https://github.com/koppor/adr-manager/issues/23)
- Button to create a new ADR at the end of each ADR list in each repository. (Graphics only, missing functionality for now) [#22](https://github.com/koppor/adr-manager/issues/22)
- ANTLR grammar to parse MADR files.

### Changed

- The background of the GUI is now white. Text fields have a light grey background.
- Updates to the MADR Editor in Advanced Mode:
  - The options in the 'Considered Options'-Section are expandable. When expanded, the description and pros and cons can be edited. The 'Pros and Cons of Options' Section was removed. 
  - Drag'and'Drop of the options in the 'Considered Options'-Section in the MADR Editor. [#39](https://github.com/koppor/adr-manager/issues/39)

### Fixed

### Removed