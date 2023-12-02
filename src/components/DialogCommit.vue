<template>
    <v-dialog v-bind:value="showDialog" v-model="dialogVisible" v-on:input="(value) => {
        showDialog = value;
        $emit('input', value);
    }
        " width="700px">
        <template v-slot:activator="{ on, attrs }">
            <slot name="activator" v-bind:on="on" v-bind:attrs="attrs"> </slot>
            <v-overlay :value="loading">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </v-overlay>
        </template>
        <v-card>
            <v-card-title>
                <div>
                    <v-avatar color="primary" size="35"> <v-icon dark>mdi-publish</v-icon></v-avatar>
                    <span class="dialogTitle"> Commit & Push</span>
                </div>
            </v-card-title>

            <v-divider></v-divider>
            <v-card-text>
                <div class="cardTextPos">
                    <v-icon>mdi-file</v-icon><span class="spanAfterIcon spanTitle"> Select files</span>
                    <template>
                        <v-icon data-cy="mdiCheckSelected" style="position: absolute; right: 0; bottom: 0"
                            v-if="fileSelected" color="teal">
                            mdi-check
                        </v-icon>
                        <v-icon data-cy="mdiAlertNotSelected" style="position: absolute; right: 0; bottom: 0"
                            v-if="!fileSelected" color="error">
                            mdi-alert-circle-outline
                        </v-icon>
                    </template>
                </div>
                <v-expansion-panels v-model="openedPanel" multiple class="mb-6">
                    <v-expansion-panel v-if="newFileBool">
                        <v-expansion-panel-header>
                            <div>
                                <v-icon>mdi-plus</v-icon><span data-cy="newFilesCommitMessage"
                                    class="spanAfterIcon spanSubTitle">
                                    New files</span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-for="(newFile, indexNew) in newFiles" :key="indexNew">
                                <v-flex data-cy="newFileCheckBoxOuter">
                                    <v-checkbox data-cy="newFileCheckBox" :input-value="newFile.fileSelected"
                                        @change="checkboxAction($event, newFile.path, newFiles)" :label="newFile.title"
                                        class="stuff"></v-checkbox>
                                </v-flex>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel v-if="changedFileBool">
                        <v-expansion-panel-header>
                            <div>
                                <v-icon>mdi-file-document-edit</v-icon><span class="spanAfterIcon spanSubTitle"> Changed
                                    files</span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-for="(changedFile, indexChange) in changedFiles" :key="indexChange">
                                <v-flex>
                                    <v-checkbox :input-value="changedFile.fileSelected"
                                        @change="checkboxAction($event, changedFile.path, changedFiles)" class="stuff"
                                        :label="changedFile.title"></v-checkbox>
                                </v-flex>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel v-if="deletedFileBool">
                        <v-expansion-panel-header>
                            <div>
                                <v-icon>mdi-delete</v-icon><span data-cy="deletedFilesAdr"
                                    class="spanAfterIcon spanSubTitle">
                                    Deleted files</span>
                            </div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <div v-for="(deletedFile, index) in deletedFiles" :key="index">
                                <v-flex>
                                    <v-checkbox data-cy="deletedFileCheckBox" :input-value="deletedFile.fileSelected"
                                        @change="checkboxAction($event, deletedFile.path, deletedFiles)" class="stuff"
                                        :label="deletedFile.title"></v-checkbox>
                                </v-flex>
                            </div>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <div class="distanceToExpPanels">
                    <v-icon>mdi-message-text</v-icon><span class="spanAfterIcon spanTitle"> Enter commit message</span>
                    <template>
                        <v-icon data-cy="mdiCheckCommitMessage" style="position: absolute; right: 0; bottom: 0"
                            v-if="!textFieldError" color="teal">
                            mdi-check
                        </v-icon>
                        <v-icon data-cy="mdiAlertCommitMessage" style="position: absolute; right: 0; bottom: 0"
                            v-if="textFieldError" color="error">
                            mdi-alert-circle-outline
                        </v-icon>
                    </template>
                </div>
                <v-textarea data-cy="textFieldCommitMessage" label="Commit message" auto-grow rows="1" v-model="comMessage"
                    :error-messages="isTextfieldValid()" @input="handleCommitMessage($event)"></v-textarea>

                <div class="distanceToTextField">
                    <v-icon color="primary">mdi-information-outline</v-icon>
                    <span class="spanAfterIcon">
                        Your selected files will be pushed to {{ repo }} on {{ branch }} branch.</span>
                </div>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions class="buttonPadding">
                <v-spacer></v-spacer>
                <v-btn data-cy="btnOfDialogCommitForPush" text color="success" :disabled="textFieldError || !fileSelected"
                    @click="() => {
                        handleCommitButtonAction();
                        dialogVisible = false;
                        $emit('commit');
                    }
                        ">
                    Commit & Push
                </v-btn>
                <v-btn text color="error" @click="dialogVisible = false"> Cancel </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { getCommitSha, createBlobs, createFileTree, createCommit, pushToGitHub } from "/src/plugins/api.js";
import { store } from "../plugins/store";

/**
 * To see further information, look at the GitHub repository. There will be a paper with some informations to the "Commiting and pushing" procedure.
 */
export default {
    name: "DialogCommit",
    props: {
        // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
        value: {
            type: Boolean,
            required: false,
            default: false
        },
        repo: String
    },
    data: () => ({
        showDialog: false,
        lastCommitSha: "",
        blobSha: {},
        changedFiles: [],
        newFiles: [],
        deletedFiles: [],
        deletedTree: [],
        dialogVisible: false,
        commitFiles: [],
        branch: "",
        comMessage: "",
        loading: false,
        fileSelected: false,
        newFileBool: false,
        deletedFileBool: false,
        changedFileBool: false,
        waitForResponse: true,
        gitHubTimeout: false,
        textFieldError: false,
        filesPushed: [],
        deletedSelected: false,
        newSelected: false,
        changedSelected: false,
        openedPanel: null,
        errorRequest: false
    }),

    watch: {
        dialogVisible(visible) {
            if (visible) {
                if (this.gitHubTimeout) {
                    this.gitHubTimeoutAlert();
                    return;
                }
                this.resetDialog();
                store.setCurrentRepositoryForCommit(this.repo);
                store.setInfoForCommit();

                this.branch = store.getBranchCommit();

                this.setFilesForCommit();
                if (!this.newFileBool && !this.deletedFileBool && !this.changedFileBool) {
                    this.nothingToCommitAlert();
                }
            }
        },
        value() {
            this.dialog = this.value;
        }
    },
    methods: {
        /**
         * Gets the three different types of files from the store
         */
        setFilesForCommit() {
            this.changedFiles = store.changedFilesInRepo(this.repo);
            if (this.changedFiles.length > 0) {
                this.changedFileBool = true;
            }
            this.newFiles = store.newFilesInRepo(this.repo);
            if (this.newFiles.length > 0) {
                this.newFileBool = true;
            }
            this.deletedFiles = store.deletedFilesInRepo(this.repo);
            if (this.deletedFiles.length > 0) {
                this.deletedFileBool = true;
            }
        },

        resetDialog() {
            this.newFiles = [];
            this.changedFiles = [];
            this.deletedFiles = [];
            this.filesPushed = [];
            this.fileSelected = false;
            this.comMessage = "";
            this.newFileBool = false;
            this.deletedFileBool = false;
            this.changedFileBool = false;
            this.errorRequest = false;
            this.openedPanel = null;
        },

        /**
         * When the commit button is pushed, the last commit sha will be requestet to github
         */
        handleCommitButtonAction() {
            if (!this.gitHubTimeout) {
                this.commitFiles = this.commitFiles.concat(this.changedFiles);
                this.commitFiles = this.commitFiles.concat(this.newFiles);
                this.requestLastCommitSha();
            }
        },

        isTextfieldValid() {
            if (this.comMessage === "") {
                this.textFieldError = true;
                return "Required";
            } else this.textFieldError = false;
        },

        closeDialog() {
            this.dialogVisible = false;
        },

        changedFilesRepo() {
            store.deleteFilesRequest();
        },
        handleCommitMessage(message) {
            this.comMessage = message;
        },

        // One file must be checked or the commit button wont be visible
        checkboxAction(checkboxVal, path, listFiles) {
            let tempBool = false;
            for (let file of listFiles) {
                switch (file.fileStatus) {
                    case "new":
                        if (file.path === path) {
                            file.fileSelected = checkboxVal;
                        }
                        if (file.fileSelected) {
                            tempBool = true;
                            this.newSelected = true;
                        }
                        if (!tempBool) {
                            this.newSelected = false;
                        }
                        break;
                    case "changed":
                        if (file.path === path) {
                            file.fileSelected = checkboxVal;
                        }
                        if (file.fileSelected) {
                            tempBool = true;
                            this.changedSelected = true;
                        }
                        if (!tempBool) {
                            this.changedSelected = false;
                        }
                        break;
                    case "deleted":
                        if (file.path === path) {
                            file.fileSelected = checkboxVal;
                        }
                        if (file.fileSelected) {
                            tempBool = true;
                            this.deletedSelected = true;
                        }
                        if (!tempBool) {
                            this.deletedSelected = false;
                        }
                        break;
                }
            }
            if (this.newSelected || this.changedSelected || this.deletedSelected) {
                this.fileSelected = true;
            } else this.fileSelected = false;
        },

        // Requests last commit sha hash from GitHub (Returned in response)
        requestLastCommitSha() {
            this.loading = true;

            if (!this.errorRequest) {
                getCommitSha()
                    .then((res) => {
                        this.lastCommitSha = res.commit.sha;
                        this.createBlobsRequest();
                    })
                    .catch((error) => {
                        this.errorRequest = true;
                        this.errorDialog(error);
                        console.error(error);
                    });
            }
        },

        /**
         * Only the selected files will be marked. These marked will be created and in response from
         * GitHub there is the blob sha hash.
         * When every file is created, the tree of the file will be created.
         */
        createBlobsRequest() {
            let countKeysList = this.commitFiles.length;
            let countForEach = 0;
            if (this.commitFiles.length > 0) {
                for (let value of this.commitFiles) {
                    if (value.fileSelected) {
                        this.filesPushed.push({
                            path: value.path,
                            type: value.fileStatus
                        });
                        if (!this.errorRequest) {
                            createBlobs(value.value)
                                .then((res) => {

                                    countForEach++;
                                    this.blobSha[value.title] = {
                                        blobSha: res.sha,
                                        path: value.path
                                    };
                                    if (countForEach === countKeysList) {
                                        this.createFolderTreeRequest();
                                    }
                                })
                                .catch((error) => {
                                    this.errorRequest = true;
                                    this.errorDialog(error);
                                    console.error(error);
                                });
                        }
                    } else countForEach++;
                }
            } else this.createFolderTreeRequest();
        },

        /**
         * The files will be prepaired for the tree structure. (We add the last commit SHA-1 hash, which
         * will be used as base for the new tree). Then the new/changed/deleted files will be added.
         * To delete a file we set the sha to null.
         * As response we get the sha hash of the tree.
         */
        createFolderTreeRequest() {
            let fileTree = [];
            Object.entries(this.blobSha).forEach((value) => {
                fileTree.push({
                    path: value[1].path,
                    mode: "100644",
                    type: "blob",
                    sha: value[1].blobSha
                });
            });
            if (this.deletedFileBool) {
                Object.entries(this.deletedFiles).forEach((value) => {
                    if (value[1].fileSelected) {
                        this.filesPushed.push({
                            path: value[1].path,
                            type: value[1].fileStatus
                        });
                        fileTree.push({
                            path: value[1].path,
                            mode: "100644",
                            type: "blob",
                            sha: null
                        });
                    }
                });
            }
            if (!this.errorRequest) {
                createFileTree(this.lastCommitSha, fileTree)
                    .then((res) => {
                        this.createCommitRequest(res.sha);
                    })
                    .catch((error) => {
                        this.errorRequest = true;
                        this.errorDialog(error);
                        console.error(error);
                    });
            }
        },

        /**
         * We create a new commit with the commit message, the author infos, the last commit sha and
         * the newly created tree sha.
         * As respoonse we get the new commit sha hash.
         */
        createCommitRequest(treeSha) {
            if (!this.errorRequest) {
                createCommit(
                    this.comMessage,
                    { name: store.getUserName(), email: store.getUserEmail() },
                    this.lastCommitSha,
                    treeSha
                )
                    .then((res) => this.pushToGitHubRequest(res.sha))
                    .catch((error) => {
                        this.errorRequest = true;
                        this.errorDialog(error);
                        console.error(error);
                    });
            }
        },

        /**
         * We have to move the HEAD reference on the branch to the new commit with the help of the
         * newly created commit sha hash.
         * The files in the local storage will be updatetd.
         */
        pushToGitHubRequest(newCommitSha) {
            if (!this.errorRequest) {
                pushToGitHub(newCommitSha)
                    .then(() => {
                        this.gitHubTimeout = true;
                        setTimeout(() => {
                            this.gitHubTimeout = false;
                        }, 60000);
                        this.loading = false;
                        if (!this.errorRequest) {
                            store.updateLocalStorageAfterCommit(this.filesPushed, this.repo);
                            this.$alert("Successfully pushed", "Success", "success");
                        }
                    })
                    .catch((error) => {
                        this.errorRequest = true;
                        this.errorDialog(error);
                        console.error(error);
                    });
            }
        },

        // Displays the error
        errorDialog(currentError) {
            this.$alert(
                "Error during pushing. Your changes were not pushed. Please try again later. \nError code: " +
                currentError,
                "Error",
                "error",
                {
                    confirmButtonText: "Close"
                }
            ).then(() => {
                this.closeDialog();
            });
        },

        // No file has been changed/created/deleted
        nothingToCommitAlert() {
            this.$alert("No changes have been made since the last push", "Everything up to date", "success", {
                confirmButtonText: "Close"
            }).then(() => {
                this.closeDialog();
            });
        },

        /**
         * we can only push once per minute due to the GitHub API. It takes a certain amount of time
         * to update the reference and if we then make another request too quickly, we get
         * an outdated SHA-1 hash of the commit. This leads to the fact that we would overwrite the
         * changes of the last push. Therefore, we allow pushing only once per minute.
         */
        gitHubTimeoutAlert() {
            this.$alert("Latency problem with GitHub Api. Please wait ~60 seconds!", "Warning", "warning", {
                confirmButtonText: "Close"
            }).then(() => {
                this.closeDialog();
            });
        }
    }
};
</script>

<style>
.v-input--selection-controls {
    margin-top: 0px;
    padding-top: 0px;
}

.v-application .mb-6 {
    margin-top: 2% !important;
}

.spanAfterIcon {
    vertical-align: middle;
}

.stuff .v-messages {
    min-height: 0% !important;
}

.stuff label {
    margin-bottom: 0%;
    font-size: 0.8rem;
}

.v-dialog>.v-card>.v-card__subtitle,
.v-dialog>.v-card>.v-card__text {
    padding-top: 0%;
    padding-bottom: 0%;
}

.dialogTitle {
    font-size: 2rem;
    vertical-align: middle;
}

.spanTitle {
    font-size: 1rem;
}

.spanSubTitle {
    font-size: 0.8rem;
}

.cardTextPos {
    position: relative;
}

.distanceToExpPanels {
    position: relative;
    padding-top: 3%;
}

.distanceToTextField {
    padding-top: 10%;
}

.textFieldFontSize .v-label {
    font-size: 0.9rem;
}

.textFieldHelpFontSize .v-messages__message {
    font-size: 0.8rem;
}

.v-card__actions {
    padding-top: 1%;
    padding-right: 3%;
    padding-bottom: 1%;
    padding-left: 3%;
}

.divSpan {
    white-space: pre;
}

textarea {
    font-family: roboto;
}
</style>