// This is a proposal on how global data could be managed.
// This may be changed to using Vuex or be discarded completely, I don't mind!
/** 
 * The store contains the global state of the ADR-Manager and can be used to communicate between components.
 * 
 * Emitted Events:
 * 
 * 'open-adr'
 *   - {object} adr object
 * 'set-mode'
 *   - {string} mode (either 'basic', 'advanced' or 'profesional')
 */


import Vue from 'vue'
import _ from 'lodash'
import { ArchitecturalDecisionRecord } from './classes'
import { adr2md } from './parser'

export const store = new Vue({
    data: {
        currentRepository: undefined,
        currentBranch: undefined,
        currentlyEditedAdr: undefined,
        addedRepositories: [],
        mode: 'basic'
    },

    created() {
        console.log('Created Store!');

        /* Load data from local storage. */
        let addedRepos = localStorage.getItem('addedRepositories');
        if (addedRepos !== null) {
            addedRepos = JSON.parse(addedRepos);
            console.log('Loaded Repositories from local storage.', addedRepos);
            // Validate storage
            if (isValidRepoList(addedRepos)) {
                console.log('Adding Repositories.', addedRepos);
                this.addRepositories(addedRepos);
            } else {
                console.log('Invalid repos: ', addedRepos);
            }
        }
        /* Load mode from local storage */
        this.mode = localStorage.getItem('mode') || 'basic';
    },

    methods: {
        /**
         * Write the current value of the added repositories list array into the local storage.
         * Should be done regularly.
         * Delays for 1000 ms to reduce spamming.
         */
        updateLocalStorageRepositories: function () {
            localStorage.setItem('addedRepositories', JSON.stringify(this.addedRepositories));
        },

        /** Adds the repositories to the added repositories.
         * If no ADR is currently edited, open one.
         * @param {Array} repoList - a list of repositories 
         */
        addRepositories(repoList) {
            console.log('Add Repositories to store', repoList);
            this.addedRepositories = this.addedRepositories.concat(repoList);
            this.updateLocalStorageRepositories();
            this.assertSomeAdrIsOpened();
        },

        /** Removes the repository from the added repositories.
         * If the currently edited adr is in that repository, open another one. 
         * @param {object} repoToRemove 
         */
        removeRepository(repoToRemove) {
            this.addedRepositories = this.addedRepositories.filter((repo) => (repo.fullName !== repoToRemove.fullName))
            this.assertSomeAdrIsOpened();
            this.updateLocalStorageRepositories();
        },

        /** Updates the repository with the same full name as the passed repository. */
        updateRepository(updatedRepository) {
            let index = this.addedRepositories.findIndex((repo) => (repo.fullName === updatedRepository.fullName));
            let oldRepo = this.addedRepositories[index];
            this.addedRepositories.splice(index, 1, updatedRepository);
            if (oldRepo.adrs.includes(this.currentlyEditedAdr)) {
                this.openAdr(updatedRepository.adrs.find((adr) => (adr.path === this.currentlyEditedAdr.path)))
            }
            this.updateLocalStorageRepositories();
        },

        /**
         * 
         * @param {string} repoFullName 
         */
        getChangesOfRepository(repoFullName) {
            let repo = this.addedRepositories.find(repo => (repo.fullName === repoFullName));
            return {
                added: repo.addedAdrs,
                changed: repo.adrs.filter(adr => (adr.originalMd !== adr.editedMd && !repo.addedAdrs.includes(adr))),
                deleted: repo.deletedAdrs
            };
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
         * If there is no currently edited ADR (or it isn't valid), open some other ADR.  
         */
        assertSomeAdrIsOpened() {
            if (this.currentlyEditedAdr === undefined
                || !isValidAdr(this.currentlyEditedAdr)
                || !this.addedRepositories.some(repo => repo.adrs.includes(this.currentlyEditedAdr))) {
                this.openAnyAdr();
            }
        },

        /**
         * Opens any ADR.
         */
        openAnyAdr() {
            let reposWithAdrs = this.addedRepositories.filter(repo => (repo.adrs && repo.adrs[0]));
            if (reposWithAdrs.length > 0) {
                let someAdr = reposWithAdrs[0].adrs[0];
                this.openAdr(someAdr);
            }
        },

        /**
         * Open the ADR with the specified name in the repository if it exists.
         * @param {string} repoFullName 
         * @param {string} adrName 
         * @returns the ADR iff it was found, else undefined
         */
        openAdrBy(repoFullName, adrName) {
            let repo = this.addedRepositories
                .find((repo) => repo.fullName === repoFullName);
            let adr;
            if (repo) {
                adr = repo.adrs
                    .find(adr => {
                        return adr.path.split('/').pop() === adrName;
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
                let repo = this.addedRepositories.find(repo => repo.adrs.includes(adr));
                if (isValidAdr(adr) && repo !== undefined) {
                    this.currentRepo = repo;
                    this.currentBranch = repo.activeBranch;
                    this.currentlyEditedAdr = adr;
                    console.log('Open ADR in store.js ', adr);
                    this.$emit('open-adr', adr);
                } else {
                    console.log('This is not a valid ADR', adr);
                }
            } else {
                console.log('I won\'t open the same ADR twice! D:');
            }
        },

        /**Sets the Markdown of the current ADR to the parameter string.
         * Also updates the local storage.
         * 
         * @param {string} md 
         */
        updateMdOfCurrentAdr(md) {
            this.currentlyEditedAdr.editedMd = md;
            this.updateLocalStorageRepositories();
        },

        /**Creates a new ADR in the specified repository.
         * 
         * TODO: Get highest ID and adapt name of ADR based on title in Editor. (Idk, when or in which method it's best to do handle IDs ..) 
         * 
         * @param {object} repo - must be one of the added repositories 
         * @returns the created adr if repo is added, undefined otherwise
         */
        createNewAdr: function (repo) {
            if (this.addedRepositories.includes(repo)) {
                let md = adr2md(new ArchitecturalDecisionRecord());
                let newAdr = {
                    originalMd: undefined,
                    editedMd: md,
                    path: 'docs/adr/' + repo.adrs.length + '-To-Do.md'
                };
                repo.adrs.push(newAdr);
                if (!repo.addedAdrs) {
                    repo.addedAdrs = []
                }
                repo.addedAdrs.push(newAdr);
                return newAdr;
            }
            this.updateLocalStorageRepositories();
            return undefined;
        },

        /**Sets the current mode and emits the 'set-mode' event.
         * 
         * @param {string} mode - the new mode (must be either 'basic', 'advanced' or 'professional') 
         */
        setMode(mode) {
            if (['basic', 'advanced', 'professional'].includes(mode)) { // Double-check that passed mode is valid.
                console.log(mode);
                this.mode = mode;
                localStorage.setItem('mode', mode);
                this.$emit('set-mode', mode);
            } else {
                console.log('Error in Mode Selection');
            }
        }
    }
});


function isValidRepoList(repos) {
    console.log('Valid check.');
    return repos.every(repo => {
        return _.has(repo, 'fullName') && _.has(repo, 'activeBranch')
            && _.has(repo, 'adrs') && repo.adrs.every(isValidAdr);
    });
}

function isValidAdr(adr) {
    return _.has(adr, 'originalMd') && _.has(adr, 'editedMd') && _.has(adr, 'path');
}