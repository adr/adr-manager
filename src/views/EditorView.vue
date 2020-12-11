<template>
  <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
    <v-toolbar dense color="primary" dark style="-webkit-flex: 0; flex: 0;">
      <v-btn class="align-self-center" to="/">Log Out</v-btn>
      <!--<ToolbarMenuFile v-on:commit="logNotImplemented"
                 v-on:create-adr="createNewAdr"
                 v-on:delete-adr="logNotImplemented" />-->
      <ToolbarMenuMode />
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">


      <div v-if="hideEditor" class="d-flex align-center justify-center" style="height: 75%; width: 100%;">
        <DialogAddRepositories @add-repositories="addRepositories">
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
            v-on:add-repositories="addRepositories" v-on:remove-repository="removeRepository" v-on:open-file="openAdr"
            v-on:file-path="setFilePath" v-on:active-branch="setActiveBranch" v-on:repo-name="updateBranches" />

        </pane>
        <!--end File Explorer Pane -->

        <pane>
          <Editor style="height: 100%;" v-bind:value="initialEditedMd" v-bind:filePath="filePath"
            v-on:adr-file="setADRFile" v-bind:firstUserName="firstUserName" v-bind:firstRepoName="firstRepoName"
            @input="updateMd" />
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
  import { adr2md } from "@/plugins/parser";
  import { ArchitecturalDecisionRecord } from "@/plugins/classes";
  import DialogAddRepositories from "@/components/DialogAddRepositories.vue";
  import { loadBranchesName, loadARepositoryContent } from "@/plugins/api.js";

  import _ from 'lodash'

  import { Splitpanes, Pane } from "splitpanes";
  import "splitpanes/dist/splitpanes.css";

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
    data: () => ({
      selected: "",
      branchesName: [],
      dataAuth: "",
      nameAdr: "",
      addedRepositories: [],
      currentRepo: "",
      initialEditedMd: undefined, // Change this for opening an ADR in the editor.
      currentAdr: {},
      userName: "adr",
      reposPath: "http://localhost:5000/repos",
      firstUserName: "",
      firstRepoName: "",
      filePath: "",
      editedADR: {}
    }),
    computed: {
      hideEditor() {
        return this.initialEditedMd === undefined
      },
      setAdrName() {
        if (this.currentAdr.path !== undefined) {
          return this.currentAdr.path.split("/").pop();
        } else {
          return ""
        }
      }
    },
    watch: {
      addedRepositories(newValue) {
        localStorage.setItem('addedRepositories', JSON.stringify(newValue));
      }
    },
    mounted() {
      this.dataAuth = this.$route.params.id;
      let addedRepos = localStorage.getItem('addedRepositories');
      if (addedRepos !== null) {
        addedRepos = JSON.parse(addedRepos)
        // Validate storage
        if (isValidRepoList(addedRepos)) {
          console.log('Adding Repositories', addedRepos)
          this.addRepositories(addedRepos)
        }
      }
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
       * @param {Array} repoList - a list of repositories 
       */
      addRepositories(repoList) {
        this.addedRepositories = this.addedRepositories.concat(repoList);
        if (!this.currentAdr.editedMd) {
          this.openAnyAdr()
        }
      },
      setActiveBranch(activeBranch) {
        this.selected = activeBranch;
      },
      onSelectedBranch() {
        this.$confirm("Do you really want to change branch?").then(() => {
          loadARepositoryContent(this.currentRepo, this.selected, this.dataAuth)
            .then((repoObjectList) => {
              if (typeof repoObjectList !== "undefined") {
                this.removeRepository(repoObjectList);
                this.addRepositories(repoObjectList);
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
          this.dataAuth).then((branchesObjectList) => {
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
        this.currentAdr = {};
        this.currentRepo = repoName;
        this.loadBranchesName();
      },
      /** Removes the repository from the added repositories.
       * If the currently edited adr is in that repository, open another one. 
       */
      removeRepository(repoToRemove) {
        this.addedRepositories = this.addedRepositories.filter((repo) => (repo.fullName !== repoToRemove.fullName))
        if (repoToRemove.adrs.includes(this.currentAdr)) {
          this.currentAdr = {}
          this.initialEditedMd = undefined
          this.openAnyAdr()
        }
      },
      /**Open the first adr in the added repositories, if one exists.
       */
      openAnyAdr() {
        let reposWithAdrs = this.addedRepositories.filter(repo => (repo.adrs && repo.adrs[0]))
        if (reposWithAdrs.length > 0) {
          let someAdr = reposWithAdrs[0].adrs[0];

          let path = reposWithAdrs[0].fullName;
          let indexUserName = path.indexOf("/");
          this.firstUserName = path.slice(0, indexUserName);
          this.firstRepoName = path.slice(indexUserName + 1);

          this.updateBranches(reposWithAdrs[0].fullName);
          this.selected = reposWithAdrs[0].activeBranch;
          this.openAdr(someAdr)
        }
      },
      openAdr: function (adr) {
        this.currentAdr = adr;
        this.initialEditedMd = adr.editedMd;
        console.log('open adr', this.currentAdr)
      },
      createNewAdr: function () {
        this.adrRaw = adr2md(new ArchitecturalDecisionRecord());
      },
      updateMd(md) {
        this.currentAdr.editedMd = md;
      },
      logNotImplemented() {
        console.log("Not implemented.");
      },
    },
  };

  function isValidRepoList(repos) {
    console.log('Valid check.')
    return repos.every(repo => {
      return _.has(repo, 'fullName') && _.has(repo, 'activeBranch') && _.has(repo, 'adrs')
        && repo.adrs.every(adr => {
          return _.has(adr, 'originalMd') && _.has(adr, 'editedMd') && _.has(adr, 'path')
        })
    })
  }
</script>

<style>
  html {
    overflow: auto;
  }
</style>