<template>
  <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
    <v-toolbar dense color="primary" dark style="-webkit-flex: 0; flex: 0;">
      <v-btn class="align-self-center" to="/">Log Out</v-btn>
      <ToolbarMenuMode />
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">


      <div v-if="!showFileExplorer" class="d-flex align-center justify-center" style="height: 75%; width: 100%;">
        <DialogAddRepositories>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-large class="align-center justify-center secondary" v-on="on" v-bind="attrs">Add Repositories
            </v-btn>
          </template>
        </DialogAddRepositories>
      </div>

      <splitpanes v-else class="default-theme" style="height: 100%; width: 100%; ">
        <pane size="30%" class="d-flex flex-column" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">

          <FileExplorer v-bind:user="userName" v-bind:firstUserName="firstUserName" v-bind:firstRepoName="firstRepoName"
            v-bind:editedADR="editedADR" v-bind:added-repositories="addedRepositories"
            v-on:add-repositories="addRepositories"
            v-on:file-path="setFilePath" v-on:active-branch="setActiveBranch" v-on:repo-name="updateBranches" />

        </pane>
        <!--end File Explorer Pane -->

        <pane>
          <Editor v-if="showEditor" style="height: 100%;" v-bind:filePath="filePath"
            v-on:adr-file="setADRFile"/>
        </pane>
      </splitpanes>
    </v-card-text>

    <v-system-bar>
      {{"Current ADR: " + setAdrName}}
      <v-spacer></v-spacer>
      Current branch:
      <select @change="onSelectedBranch" v-model="selected" name="current-branch" id="current-branch"
        style="width: 20%">
        <option v-for="(branchName, index) in branchesName" :key="index" v-text="branchName">
          {{branchName}}
        </option>
      </select>
    </v-system-bar>
  </v-card>
</template>

<script>
  // @ is an alias to /src
  import { loadBranchesName, loadARepositoryContent } from "@/plugins/api.js";
  import { store } from "@/plugins/store.js";

  import { Splitpanes, Pane } from "splitpanes";
  import "splitpanes/dist/splitpanes.css";

  import DialogAddRepositories from "@/components/DialogAddRepositories.vue";
  import ToolbarMenuMode from "@/components/ToolbarMenuMode.vue";
  import Editor from "@/components/TheEditor.vue";
  import FileExplorer from "@/components/FileExplorer.vue";

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
      repoFullName : { // the path of the current adr
        type: String
      },
      adr: { // the name of the current adr, e. g. 0001-some-name.md
        type: String
      },
      branch: {
        type: String
      } 
    },
    data: () => ({
      selected: "",
      branchesName: [],
      nameAdr: "",
      addedRepositories: [],
      currentRepo: "",
      initialEditedMd: undefined, // Change this for opening an ADR in the editor.
      userName: "adr",
      firstUserName: "",
      firstRepoName: "",
      filePath: "",
      editedADR: {}
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
      setAdrName() {
        if (this.currentAdr !== undefined && this.currentAdr.path !== undefined) {
          return this.currentAdr.path.split("/").pop();
        } else {
          return "";
        }
      }
    },
    watch: {
      addedRepositories(newValue) {
        localStorage.setItem('addedRepositories', JSON.stringify(newValue));
      },
      adr(newValue) {
        store.openAdrBy(this.repoFullName, newValue);
      }
    },
    mounted() {
      this.dataAuth = this.$route.params.id;
      store.openAdrBy(this.repoFullName, this.adr);
    },
    methods: {
      setFilePath(path) {
        this.filePath = path;
      },
      setADRFile(adr) {
        this.editedADR = adr;
      },
      /** Adds the repositories to the added repositories.
       * If no ADR is currently edited, open one.
       * @param {object[]} repoList - a list of repositories 
       */
      addRepositories(repoList) {
        this.addedRepositories = this.addedRepositories.concat(repoList);
        if (!this.currentAdr.editedMd) {
          this.openAnyAdr();
        }
      },
      setActiveBranch(activeBranch) {
        store.setActiveBranch(activeBranch);
        this.selected = activeBranch;
      },
      onSelectedBranch() {
        this.$confirm("Do you really want to change branch?").then(() => {
          loadARepositoryContent(this.currentRepo, this.selected, this.dataAuth)
            .then((repoObject) => {
              if (typeof repoObject !== "undefined") {
                store.updateRepository(repoObject);
              }
            });
        }).catch(() => {
          console.log("Action cancelled");
        });
      },
      loadBranchesName() {
        loadBranchesName(
          this.currentRepo.split("/")[1],
          this.currentRepo.split("/")[0],
          this.dataAuth
          ).then((branchesObjectList) => {
            let x = branchesObjectList.map((branches) => ({
              brancheName: branches.name
            }));
            this.branchesName = [];
            let i = "";
            for (i = 0; i < x.length; i++) {
              this.branchesName.push(x[i].brancheName);
            }
          })
      },
      updateBranches(repoName) {
        this.currentRepo = repoName;
        this.loadBranchesName();
      },
      logNotImplemented() {
        console.log("Not implemented.");
      },
    },
  };

</script>

<style>
  html {
    overflow: auto;
  }
</style>