# ADR-Manager ![General cypress report](https://github.com/koppor/adr-manager/workflows/General%20cypress%20report/badge.svg?branch=cypress-integration) [![GitHub license](https://img.shields.io/github/license/koppor/adr-manager)](https://github.com/koppor/adr-manager/blob/main/LICENSE) [![GitHub last commit](https://img.shields.io/github/last-commit/koppor/adr-manager)](https://github.com/koppor/adr-manager/commits/master) [![GitHub issues](https://img.shields.io/github/issues/koppor/adr-manager)](https://github.com/koppor/adr-manager/issues) [![GitHub stars](https://img.shields.io/github/stars/koppor/adr-manager)](https://github.com/koppor/adr-manager/stargazers)

> All artefacts related to a research project from the University of Stuttgart to propose a tool-supported approach for the efficient creation and management of [architectural decision records (ADRs)](https://adr.github.io) via a graphical user interface (GUI)


## Description

This project presents a web-based application to manage Markdown architectural decision records.

The focus of this project is on [MADR](https://adr.github.io/madr/), which is a markdown template for quickly capturing architectural decisions.
MADR offers a naming scheme and a markdown template to keep the layout of recorded decisions consistent. 
Each decision is stored in a separate file.
The tool only supports management of ADRs stored in the folder `docs/adr` in GitHub repositories.

## Quick start

You can find the tool at https://koppor.github.io/adr-manager.

## Supported browsers

Currently our tool runs successfully only on some browsers: Chrome, Firefox and Opera.

### Usage

1. After opening the tool, connect to GitHub. 
    * The tool needs your permision to access your GitHub repositories and E-Mail-address.
2. Add a GitHub repository.
3. Now, you can edit any files in `docs/adr` of the GitHub repository. Edit existing ADRs or create new ones. 
   One of the most important features is the MADR Editor that allows you to quickly draft a MADR while ensuring a consistent format.
   ![](docs/screenshots/editor-advanced-mode.png "This is the MADR Editor in Advanced mode.")
4. Don't forget to push your changes to GitHub, once you're done with editing the files.

Some technical notes:
* The authID which enables the connection to GitHub and changes to ADRs are stored in the local storage. 
  That way they are not lost when you reload the page or restart the browser. 
  However, changes will be lost when you either
    * Clear local storage.
    * Press the `Disconnect` button.
  
  The general idea is that you directly push your changes to GitHub after editing.
* During development, we may remove permissions for the OAuth App from time to time. 
  Don't be surprised, if you have to give permissions repeatedly. 


## Development

### Prerequisites

* npm 6.14.8
* A GitHub Account and repository

### Installation

To run the project locally, follow these steps:

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Compile and start the application with `npm run serve`.

Note that, even when you run it locally, you need to connect to GitHub to use any functionality.

### Project setup

The following commands are useful for developing:

#### Install dependencies
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Run cypress tests
To open the Cypress UI, use
```
npx cypress open
```

#### Run unit tests
```
npm run test
```

### Backend setup

The project uses [Pizzly](https://github.com/bearer/pizzly) for the authentication to GitHub. Our Pizzly instance is hosted on Heroku. 

We will not publish our Pizzly instance.
However, you can easily set up your own by follwing these steps:

1. Create an OAuth Application on GitHub ([documentation here](https://docs.github.com/en/github-ae@latest/developers/apps/creating-an-oauth-app))
    * Remember the Client ID and Client Secret of the App
    * Set the callback URL to `https://[your-app-name].herokuapp.com/auth/callback`, 
      where `[your-app-name]` is the name of the heroku app created in the next step. 
2. Deploy your own Pizzly instance on Heroku as described at https://github.com/bearer/pizzly.
    * Open the app (i.e. the Pizzly dashboard).
    * Add the GitHub API and create a new configuration.
    * Enter the Client ID and Client Secret of your OAuth App.
3. Update this project's source code to connect to your Pizzly instance:
    * Update the Pizzly instance to use `host: "https://[your-app-name].herokuapp.com/"` 
        * in `plugins/api.js` close to the start of the file
        * in `components/ConnectToGitHubButton.vue` in the `mounted` method

## Project Context

This project was developed as research project by undergraduate students at the University of Stuttgart. 
It was also submitted to the [ICSE Score Contest 2021](https://conf.researchr.org/home/icse-2021/score-2021).
 
### Roadmap

2021-02 User Study to gather feedback <br>
2021-03-01 Final Submission for ICSE Score 2021 <br>
2021-03 Analysis of the User Study and bug fixes <br>
2021-04-16 Submission deadline for the research project at the University of Stuttgart
