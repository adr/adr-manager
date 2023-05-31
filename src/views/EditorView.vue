<template>
    <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
        <v-toolbar dense color="primary" dark class="flex-grow-0">
            <img src="../assets/logo.png" alt="ADR-Manager" height="80%" />
            <v-spacer></v-spacer>
            <ToolbarMenuMode v-if="showEditor" class="mx-0 px-0 pt-0 mt-0 flex-grow-0" />
            <v-spacer></v-spacer>
            <v-btn class="align-self-center" @click="logOut">Disconnect</v-btn>
        </v-toolbar>

        <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
            <div v-if="!showFileExplorer" class="d-flex align-center justify-center" style="height: 75%; width: 100%">
                <DialogAddRepositories>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            data-cy="addRepo"
                            x-large
                            class="align-center justify-center secondary"
                            v-on="on"
                            v-bind="attrs"
                        >
                            Add Repositories
                        </v-btn>
                    </template>
                </DialogAddRepositories>
            </div>
            <splitpanes v-else class="default-theme" style="height: 100%; width: 100%">
                <pane
                    size="30%"
                    class="d-flex flex-column"
                    style="-webkit-flex-grow: 1; flex-grow: 1; position: relative"
                >
                    <FileExplorer v-on:repo-name="updateBranches" v-on:active-branch="setActiveBranch" />
                </pane>

                <pane v-if="showEditor">
                    <Editor style="height: 100%" />
                </pane>
            </splitpanes>
        </v-card-text>

        <v-system-bar>
            <div style="position: absolute">
                {{ "Current ADR: " + adrPath }}
            </div>
            <v-spacer></v-spacer>
            Current branch:
            <select
                data-cy="branchSelect"
                @change="onSelectedBranch"
                v-model="selected"
                name="current-branch"
                id="current-branch"
                style="width: 20%"
                @click="clickForBranches"
            >
                <option data-cy="branchSelectOption" v-for="(branchName, index) in branchesName" :key="index">
                    {{ branchName }}
                </option>
            </select>
        </v-system-bar>
    </v-card>
</template>

<script>
import { loadBranchesName, loadARepositoryContent } from "/src/plugins/api.js";
import { store } from "/src/plugins/store.js";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import DialogAddRepositories from "/src/components/DialogAddRepositories.vue";
import ToolbarMenuMode from "/src/components/ToolbarMenuMode.vue";
import FileExplorer from "/src/components/FileExplorer.vue";
import Editor from "/src/components/Editor.vue";

export default {
    components: {
        Splitpanes,
        Pane,
        ToolbarMenuMode,
        Editor,
        FileExplorer,
        DialogAddRepositories
    },
    props: {
        /**
         * The full name of the repo, the branch and the adr name are passed by the router.
         */
        repoFullName: {
            // the path of the current adr
            type: String
        },
        branch: {
            type: String
        },
        adr: {
            // the name of the current adr, e. g. 0001-some-name.md
            type: String
        }
    },
    data: () => ({
        selected: "",
        oldSelected: "",
        branchesName: [],
        currentRepo: "",
        boolClick: false
    }),
    computed: {
        showFileExplorer() {
            return store.addedRepositories.length > 0;
        },
        showEditor() {
            return this.currentAdr !== undefined;
        },
        currentAdr() {
            return store.currentlyEditedAdr;
        },
        adrPath() {
            if (store.currentRepository && this.currentAdr !== undefined && this.currentAdr.path !== undefined) {
                return store.currentRepository.fullName + "/" + this.currentAdr.path;
            } else {
                return "";
            }
        },
        routeDataFromStore() {
            return {
                repoFullName:
                    store.currentRepository && typeof store.currentRepository.fullName === "string"
                        ? store.currentRepository.fullName
                        : undefined,
                branch:
                    store.currentRepository && typeof store.currentRepository.activeBranch === "string"
                        ? store.currentRepository.activeBranch
                        : undefined,
                adrName:
                    store.currentlyEditedAdr && typeof store.currentlyEditedAdr.path === "string"
                        ? store.currentlyEditedAdr.path.split("/").pop()
                        : undefined
            };
        }
    },
    watch: {
        /**
         * If the relevant state in the store changes, adapt the route.
         */
        routeDataFromStore: {
            handler(newRouteData) {
                console.log("Watching", store.currentRepository);
                console.log("Changed Store", newRouteData);
                console.log("Current Route", this.$route.params);
                this.branchesName = [];
                this.boolClick = true;
                this.branchesName.push(newRouteData.branch);
                this.branchesName = this.branchesName.filter(function (elem, index, self) {
                    return index === self.indexOf(elem);
                });
                this.branchesName = this.branchesName.filter(function (elem) {
                    return elem != null;
                });
                this.selected = newRouteData.branch;
                this.oldSelected = newRouteData.branch;
                if (
                    this.repoFullName !== newRouteData.repoFullName ||
                    this.branch !== newRouteData.branch ||
                    this.adr !== newRouteData.adrName
                ) {
                    this.$router.push({
                        name: "Editor",
                        params: {
                            ...this.$route.params,
                            organization: newRouteData.repoFullName
                                ? newRouteData.repoFullName.split("/")[0]
                                : undefined,
                            repo: newRouteData.repoFullName ? newRouteData.repoFullName.split("/")[1] : undefined,
                            branch: newRouteData.branch,
                            adr: newRouteData.adrName
                        }
                    });
                } else {
                    console.log("Avoided routing to same route.");
                }
            }
        },

        /**
         * Params from route
         */
        repoFullName(newVal) {
            // the path of the current adr
            if (this.routeDataFromStore.repoFullName !== newVal) {
                store.openAdrBy(newVal, this.adr);
            }
        },
        branch(newVal) {
            if (this.routeDataFromStore.branch !== newVal && store.currentRepository.branches.include(newVal)) {
                store.setActiveBranch(newVal);
            }
        },
        adr(newVal) {
            if (this.routeDataFromStore.adrName !== newVal) {
                store.openAdrBy(this.repoFullName, this.adr);
            }
        }
    },
    mounted() {
        store.reload();
        store.openAdrBy(this.repoFullName, this.adr);
        this.$nextTick(() => {
            console.log("Route Data from Store", this.routeDataFromStore);
        });
    },
    methods: {
        setActiveBranch(activeBranch) {
            store.setActiveBranch(activeBranch);
            this.oldSelected = activeBranch;
            this.selected = activeBranch;
        },
        /**
         * Display Confirm-Dialog when the user selects a new branch.
         */
        onSelectedBranch() {
            // Check if current select is undefined/null to prevent the display of the dialog
            // after a repository is removed.
            if (this.selected != null) {
                this.$confirm("Do you really want to change branch?")
                    .then(() => {
                        loadARepositoryContent(this.currentRepo, this.selected).then((repoObject) => {
                            this.oldSelected = this.selected;
                            if (typeof repoObject !== "undefined") {
                                store.updateRepository(repoObject);
                            }
                        });
                    })
                    .catch(() => {
                        this.selected = this.oldSelected;
                        store.setActiveBranch(this.oldSelected);
                    });
            }
        },
        /**
         * Method from api.js to retrieve branches of currentRepository from GitHub.
         */
        loadBranchesName() {
            loadBranchesName(this.currentRepo.split("/")[1], this.currentRepo.split("/")[0]).then(
                (branchesObjectList) => {
                    let x = branchesObjectList.map((branches) => ({
                        brancheName: branches.name
                    }));
                    this.branchesName = [];
                    let i = "";
                    for (i = 0; i < x.length; i++) {
                        this.branchesName.push(x[i].brancheName);
                    }
                    this.branchesName = this.branchesName.filter(function (elem, index, self) {
                        return index === self.indexOf(elem);
                    });
                }
            );
        },
        /**
         * We need to update the branches according to the event that is triggered. When the user removes a repository,
         * we need to reset the branches to []. When the user clicks on the "current-branch-select" field, loadBranchesName
         * is called to get the branches of the current repositories.
         */
        updateBranches(repoName) {
            this.boolClick = false;
            if (repoName === "") {
                this.branchesName = [];
            } else {
                this.currentRepo = repoName;
                this.loadBranchesName();
            }
        },
        /**
         * We need an event that can trigger the loadBranchesName() function. When a user clicks on the current-branch-select field,
         * the loadBranchesName-method is triggered and the branches of the current repositories are retrieved and displayed.
         */
        clickForBranches() {
            if (this.currentRepo !== "") {
                if (this.branchesName.length === 1 && this.boolClick) {
                    this.currentRepo = this.routeDataFromStore.repoFullName;
                    this.loadBranchesName();
                } else {
                    console.log("Nothing to see here!");
                }
            } else if (this.routeDataFromStore.repoFullName != null) {
                this.currentRepo = this.routeDataFromStore.repoFullName;
                this.loadBranchesName();
            }
        },

        logOut() {
            console.log("Logging out!");
            //localStorage.removeItem('authId');
            localStorage.clear();
            store.setMode("basic");
            this.$router.push("/");
        },
        logNotImplemented() {
            console.log("Not implemented.");
        }
    }
};
</script>

<style>
html {
    overflow: auto;
}
</style>
