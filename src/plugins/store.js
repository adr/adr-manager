/**
 * The store contains the global state of the ADR-Manager and can be used to communicate between components.
 *
 * Emitted Events:
 *
 * 'open-adr'
 *   - {object} adr object
 * 'set-mode'
 *   - {string} mode (either 'basic' or 'profesional')
 */

import Vue from "vue";
import _ from "lodash";
import sanitize from "sanitize-filename";
import { ArchitecturalDecisionRecord, Repository } from "./classes";
import { adr2md, naturalCase2snakeCase } from "./parser";
import { setInfosForApi, getUserName, getUserEmail } from "./api";

export const store = new Vue({
    data: {
        currentRepository: undefined,
        currentlyEditedAdr: undefined,
        addedRepositories: [],
        mode: "basic",
        currentRepositoryForCommit: undefined,
        // If available the full name of the user, else the username from the GitHub account
        name: "",
        userMail: "",
        branchCommit: ""
    },

    created() {
        console.log("Created Store!");
        this.reload();
    },

    methods: {
        /** Loads all data from local storage.
         */
        reload() {
            /* Load data from local storage. */
            this.addedRepositories = [];
            let addedRepos = localStorage.getItem("addedRepositories");
            if (addedRepos !== null) {
                addedRepos = JSON.parse(addedRepos);
                // Validate storage
                if (isValidRepoList(addedRepos)) {
                    this.addRepositories(
                        addedRepos.map((repo) => Repository.constructFromString(JSON.stringify(repo)))
                    );
                } else {
                    console.log("Invalid repos: ", addedRepos);
                }
            }
            /* Load mode from local storage */
            this.mode = localStorage.getItem("mode") || "basic";
        },

        /**
         * Write the current value of the added repositories list array into the local storage.
         * Should be done regularly.
         */
        updateLocalStorageRepositories: function () {
            localStorage.setItem("addedRepositories", JSON.stringify(this.addedRepositories));
        },

        /** Adds the repositories to the added repositories.
         * If no ADR is currently edited, open one.
         * @param {Array} repoList - a list of repositories
         */

        addRepositories(repoList) {
            console.log("Add Repositories to store", repoList);
            let alreadyAddedRepos = repoList.filter((repoToAdd) =>
                this.addedRepositories.map((repo) => repo.fullName).includes(repoToAdd.fullName)
            );
            if (alreadyAddedRepos.length > 0) {
                throw (
                    "I won't add an already added repository to the store! " +
                    alreadyAddedRepos.map((repo) => repo.fullName).join(", ")
                );
            }
            this.addedRepositories = this.addedRepositories.concat(repoList);
            this.updateLocalStorageRepositories();
            this.ensureSomeAdrIsOpened();
        },

        /** Removes the repository from the added repositories.
         * If the currently edited adr is in that repository, open another one.
         * @param {object} repoToRemove
         */
        removeRepository(repoToRemove) {
            this.addedRepositories = this.addedRepositories.filter((repo) => repo.fullName !== repoToRemove.fullName);
            this.ensureSomeAdrIsOpened();
            this.updateLocalStorageRepositories();
        },

        /** Updates the repository with the same full name as the passed repository. */
        updateRepository(updatedRepository) {
            let index = this.addedRepositories.findIndex((repo) => repo.fullName === updatedRepository.fullName);
            let oldRepo = this.addedRepositories[index];
            this.addedRepositories.splice(index, 1, updatedRepository);
            if (oldRepo.adrs.includes(this.currentlyEditedAdr)) {
                this.openAdr(updatedRepository.adrs.find((adr) => adr.path === this.currentlyEditedAdr.path));
            }
            this.updateLocalStorageRepositories();
        },

        /**Sets the active branch.
         *
         * @param {string} activeBranch
         */
        setActiveBranch(activeBranch) {
            this.activeBranch = activeBranch;
        },

        /**
         * Make sure that there is one ADR currently edited.
         * If there is no currently edited ADR (or it isn't valid), open some ADR.
         */
        ensureSomeAdrIsOpened() {
            if (
                this.currentlyEditedAdr === undefined ||
                !isValidAdr(this.currentlyEditedAdr) ||
                !this.addedRepositories.some((repo) => repo.adrs.includes(this.currentlyEditedAdr))
            ) {
                this.currentlyEditedAdr = undefined;
                this.currentRepository = undefined;
                this.openAnyAdr();
            }
        },

        /**
         * Opens any ADR.
         */
        openAnyAdr() {
            let reposWithAdrs = this.addedRepositories.filter((repo) => repo.adrs && repo.adrs[0]);
            if (reposWithAdrs.includes(this.currentRepository)) {
                let someAdr = this.currentRepository.adrs[0];
                this.openAdr(someAdr);
            } else if (reposWithAdrs.length > 0) {
                let someAdr = reposWithAdrs[0].adrs[0];
                this.openAdr(someAdr);
            } else if (this.currentRepository === undefined) {
                this.currentRepository = this.addedRepositories[0];
            }
        },

        /**
         * Open the ADR with the specified name in the repository if it exists.
         * @param {string} repoFullName
         * @param {string} adrName
         * @returns the ADR iff it was found, else undefined
         */
        openAdrBy(repoFullName, adrName) {
            let repo = this.addedRepositories.find((repo) => repo.fullName === repoFullName);
            let adr;
            if (repo) {
                adr = repo.adrs.find((adr) => {
                    return adr.path.split("/").pop() === adrName;
                });
            }
            if (adr) {
                this.openAdr(adr);
                return adr;
            }
            return adr;
        },

        /**Opens the ADR.
         * Requires the adr parameter to be a valid ADR object and to be contained in one of the added repositories.
         *
         * @param {object} adr
         */
        openAdr: function (adr) {
            if (adr !== this.currentlyEditedAdr) {
                let repo = this.addedRepositories.find((repo) => repo.adrs.includes(adr));
                if (isValidAdr(adr) && repo !== undefined) {
                    this.currentRepository = repo;
                    this.currentlyEditedAdr = adr;
                    console.log("Open ADR in store.js ", adr);
                    this.$emit("open-adr", adr);
                } else {
                    console.log("This is not a valid ADR", adr);
                }
            } else {
                console.log("I won't open the same ADR twice! D:");
            }
        },

        /**Sets the Markdown of the current ADR to the parameter string.
         * Updates the name of the Adr file to match the title of the ADR.
         * Also updates the local storage.
         *
         * @param {string} md
         */
        updateMdOfCurrentAdr(md) {
            this.currentlyEditedAdr.editedMd = md;

            /* Update the path of the file for now only for newly added files*/
            if (
                this.currentRepository &&
                this.currentRepository.addedAdrs &&
                this.currentRepository.addedAdrs.includes(this.currentlyEditedAdr)
            ) {
                let path = this.currentlyEditedAdr.path.split("/");
                let title = md.split("\n")[0].replace(/^#+/, "").trim();
                path[path.length - 1] = sanitize(
                    this.currentlyEditedAdr.id.toString().padStart(4, "0") + "-" + naturalCase2snakeCase(title) + ".md"
                );
                this.currentlyEditedAdr.path = path.join("/");
            }

            this.updateLocalStorageRepositories();
        },

        /**Creates a new ADR in the specified repository.
         *
         * Get highest ID and adapt name of ADR based on title in Editor.
         *
         * @param {object} repo - must be one of the added repositories
         * @returns the created adr if repo is added, undefined otherwise
         */
        createNewAdr: function (repo) {
            if (this.addedRepositories.includes(repo)) {
                let adr = ArchitecturalDecisionRecord.createNewAdr();
                let md = adr2md(adr);
                let id = Math.max(...repo.adrs.map((adr) => adr.id), 0) + 1;
                let newAdr = {
                    originalMd: "",
                    editedMd: md,
                    id: id,
                    path: repo.adrPath + id.toString().padStart(4, "0") + "-" + adr.title + ".md",
                    newAdr: true
                };
                repo.addAdr(newAdr);
                this.updateLocalStorageRepositories();
                return newAdr;
            } else {
                return undefined;
            }
        },

        /**Deletes the ADR.
         * The ADR is removed from the adr list of the repository and appended to the list of deleted ADRs
         *
         * @param {object} adr
         * @param {object} repo
         */
        deleteAdr(adr, repo) {
            console.log("Deleting requested!", adr, repo);
            let adrIndexAdr = repo.adrs.findIndex((adrEl) => adrEl == adr);
            let adrIndexNewAdr = repo.addedAdrs.findIndex((adrEl) => adrEl == adr);
            if (!repo.deletedAdrs) {
                repo.deletedAdrs = [];
            }

            let file = repo.adrs.splice(adrIndexAdr, 1)[0];
            if (adrIndexNewAdr >= 0) {
                repo.addedAdrs.splice(adrIndexNewAdr, 1)[0];
            } else repo.deletedAdrs.push(file);
            this.ensureSomeAdrIsOpened();
            this.updateLocalStorageRepositories();
        },

        /**Sets the current mode and emits the 'set-mode' event.
         *
         * @param {string} mode - the new mode (must be either 'basic' or 'professional')
         */
        setMode(mode) {
            if (["basic", "professional"].includes(mode)) {
                // Double-check that passed mode is valid.
                console.log("Set mode to", mode);
                this.mode = mode;
                localStorage.setItem("mode", mode);
                this.$emit("set-mode", mode);
            } else {
                console.log("Error in Mode Selection");
            }
        },

        /**
         * Sets the current mode for the commit and change dialog.
         *
         * @param {string} repoName
         */
        setCurrentRepositoryForCommit(repoName) {
            for (let repo of this.addedRepositories) {
                if (repoName === repo.fullName) {
                    this.currentRepositoryForCommit = repo;
                    this.branchCommit = repo.activeBranch;
                }
            }
        },

        /**
         * Gets the username from GitHub in the response.
         */
        async setName() {
            try {
                const res = await getUserName();
                // Does not use the name for the commit, despite uses default the username
                if (res.name === null) {
                    this.name = res.login;
                } else {
                    this.name = res.name;
                }
            } catch (error) {
                console.error(error);
            }
        },

        /**
         * Gets the email from GitHub in the response.
         */
        async setEmail() {
            try {
                const res = await getUserEmail();
                if (res && res.length && res.length >= 1) {
                    for (let emailEntry of res) {
                        if (!this.userMail || emailEntry.primary) {
                            this.userMail = emailEntry.email;
                        }
                    }
                }
                console.log("[Store] Set user E-Mail to", this.userMail);
            } catch (error) {
                console.error(error);
            }
        },

        getUserEmail() {
            return this.userMail;
        },

        getUserName() {
            return this.name;
        },

        getBranchCommit() {
            return this.branchCommit;
        },

        /**
         * Files that are not new and have only been changed are saved in an array.
         *
         * @returns An array of the changed files
         */
        changedFilesInRepo() {
            let changedFiles = [];
            for (let changedFile of this.currentRepositoryForCommit.adrs) {
                if (!("newAdr" in changedFile)) {
                    if (changedFile.editedMd != changedFile.originalMd) {
                        changedFiles.push(this.dataStructureCommit(changedFile, "changed"));
                    }
                }
            }
            return changedFiles;
        },

        /**
         * Files that have been deleted are saved in an array.
         *
         * @returns An array of the deleted files
         */
        deletedFilesInRepo() {
            let deletedFiles = [];
            for (let deletedFile of this.currentRepositoryForCommit.deletedAdrs) {
                deletedFiles.push({
                    path: deletedFile.path,
                    title: deletedFile.path.split("/")[2],
                    fileSelected: false,
                    fileStatus: "deleted"
                });
            }
            return deletedFiles;
        },

        /**
         * Files that are completly new are saved in an array.
         *
         * @returns An array of the new files
         */
        newFilesInRepo() {
            let newFiles = [];
            for (let newFile of this.currentRepositoryForCommit.addedAdrs) {
                newFiles.push(this.dataStructureCommit(newFile, "new"));
            }
            return newFiles;
        },

        /**
         * The structure of an file that will be saved in an array.
         *
         * @param {string} file
         * @param {string} fileType Only new, changed or deleted
         */
        dataStructureCommit(file, fileType) {
            const splitPath = file.path.split("/");
            return {
                title: splitPath[splitPath.length - 1],
                value: file.editedMd,
                path: file.path,
                fileSelected: false,
                fileStatus: fileType
            };
        },

        /**
         * The necessary infos from the author and the repo for the commit.
         */
        async setInfoForCommit() {
            await this.setName();
            await this.setEmail();
            setInfosForApi(
                this.currentRepositoryForCommit.fullName.split("/")[0],
                this.currentRepositoryForCommit.fullName.split("/")[1],
                this.currentRepositoryForCommit.activeBranch
            );
        },

        /**
         * After a push the local storage must be updated.
         *
         * @param {Object} pushedFiles
         */
        updateLocalStorageAfterCommit(pushedFiles) {
            for (let file of pushedFiles) {
                switch (file.type) {
                    case "new":
                        this.handleUpdateLocalStorageNew(file);
                        break;
                    case "changed":
                        this.handleUpdateLocalStorageChanged(file);
                        break;
                    case "deleted":
                        this.handleUpdateLocalStorageDeleted(file);
                        break;
                }
            }
            this.updateLocalStorageRepositories();
        },

        /**
         * Deletes the new attribute of the adr file in the local storage and saves the changes.
         *
         * @param {string} file
         */
        handleUpdateLocalStorageNew(file) {
            for (let repoEntry of this.currentRepositoryForCommit.addedAdrs) {
                if (file.path === repoEntry.path) {
                    let index = this.currentRepositoryForCommit.addedAdrs.indexOf(repoEntry);
                    this.currentRepositoryForCommit.addedAdrs.splice(index, 1);
                }
            }
            for (let repoEntry of this.currentRepositoryForCommit.adrs) {
                if (file.path === repoEntry.path) {
                    delete repoEntry["newAdr"];
                    repoEntry["originalMd"] = repoEntry.editedMd;
                }
            }
        },

        /**
         * Saves the changes in the local storage.
         *
         * @param {string} file
         */
        handleUpdateLocalStorageChanged(file) {
            for (let repoEntry of this.currentRepositoryForCommit.adrs) {
                if (file.path === repoEntry.path) {
                    repoEntry.originalMd = repoEntry.editedMd;
                }
            }
        },

        /**
         * Deletes the file from the local storage.
         *
         * @param {string} file
         */
        handleUpdateLocalStorageDeleted(file) {
            for (let repoEntry of this.currentRepositoryForCommit.deletedAdrs) {
                if (file.path === repoEntry.path) {
                    let index = this.currentRepositoryForCommit.deletedAdrs.indexOf(repoEntry);
                    this.currentRepositoryForCommit.deletedAdrs.splice(index, 1);
                }
            }
        }
    }
});

/**Checks if each repo in the parameter array repos is a valid repository
 * (that can be displayed in the file explorer, etc.)
 *
 * A valid repoitory r must be an instance of the Reppository class and each adr in r.adrs must
 * have the attributes originalMd, editedMd and path where path is the local path inside the repository (i.e. starting with 'docs/adr')
 *
 * @param {object[]} repos
 */
function isValidRepoList(repos) {
    return repos.every((repo) => {
        let valid =
            _.has(repo, "fullName") &&
            _.has(repo, "activeBranch") &&
            _.has(repo, "branches") &&
            _.has(repo, "addedAdrs") &&
            _.has(repo, "deletedAdrs") &&
            _.has(repo, "adrs") &&
            repo.adrs.every(isValidAdr);
        if (!valid) {
            console.log("Invalid repository", repo);
        }
        return valid;
    });
}

function isValidAdr(adr) {
    return _.has(adr, "originalMd") && _.has(adr, "editedMd") && _.has(adr, "path");
}
