# ADR-Manager ![General cypress report](https://github.com/koppor/adr-manager/workflows/General%20cypress%20report/badge.svg?branch=cypress-integration) [![GitHub license](https://img.shields.io/github/license/koppor/adr-manager)](https://github.com/koppor/adr-manager/blob/main/LICENSE) [![Last Updated](https://img.shields.io/github/last-commit/nccgroup/sobelow.svg)](https://github.com/koppor/adr-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/koppor/adr-manager)](https://github.com/koppor/adr-manager/issues) [![GitHub stars](https://img.shields.io/github/stars/koppor/adr-manager)](https://github.com/koppor/adr-manager/stargazers)

> All artefacts related to a research project from the University of Stuttgart to propose a tool-supported approach for the efficient creation and management of [architectural decision records (ADRs)](https://adr.github.io) via a graphical user interface (GUI)


## Overview
This project presents a web-based application to manage architectural decision records. An architectural decisionis any decision which may influence the architecture of the system. Documenting these decisions is substantialfor the maintainability of a system. A lightweight format to capture these decisions are Markdown ArchitecturalDecision  Records  (MADRs).  Each  decision  is  stored  in  a  separate  file.  MADR  offers  a  naming  scheme  and  atemplate to keep the layout of recorded decisions consistent. This leads to the need for management of the decisions.Currently, there exists no graphical user interface specialized for ADRs. This project closes this gap.
You can find the site through the following [link](https://adr-manager.github.io/).

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run cypress tests
```
npx cypress open
```
Then start tests via ui

### Run unit tests
```
npm run test
```

