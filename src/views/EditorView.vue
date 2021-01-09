<template>
  <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
    <v-toolbar dense color="primary" dark class="flex-grow-0">
      <img src="../assets/logo.png" alt="ADR-Manager" height="80%">
      <v-spacer></v-spacer>
      <ToolbarMenuMode v-if="showEditor" class="mx-0 px-0 pt-0 mt-0 flex-grow-0" />
      <v-spacer></v-spacer>
      <v-btn class="align-self-center" @click="logOut">Disconnect</v-btn>
    </v-toolbar>

    <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">


      <div v-if="!showFileExplorer" class="d-flex align-center justify-center" style="height: 75%; width: 100%;">
        <DialogAddRepositories>
          <template v-slot:activator="{ on, attrs }">
            <v-btn data-cy="addRepo" x-large class="align-center justify-center secondary" v-on="on" v-bind="attrs">Add Repositories
            </v-btn>
          </template>
        </DialogAddRepositories>
      </div>

      <splitpanes v-else class="default-theme" style="height: 100%; width: 100%; ">
        <pane size="30%" class="d-flex flex-column" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">

          <FileExplorer v-bind:user="userName" v-bind:firstUserName="firstUserName" v-bind:firstRepoName="firstRepoName"
            v-bind:editedADR="editedADR" v-on:file-path="setFilePath" v-on:active-branch="setActiveBranch"
            v-on:repo-name="updateBranches" />

        </pane>
        <!--end File Explorer Pane -->

        <pane v-if="showEditor">
          <Editor style="height: 100%;" v-bind:filePath="filePath" v-on:adr-file="setADRFile" />
        </pane>
      </splitpanes>
    </v-card-text>

    <v-system-bar>
      <div style="position: absolute;">
        {{"Current ADR: " + adrPath}}
      </div>
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
  import Editor from "@/components/Editor.vue";
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
      repoFullName: { // the path of the current adr
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
      oldSelected: "",
      branchesName: [],
      nameAdr: "",
      currentRepo: "",
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
      adrPath() {
        if (store.currentRepository && this.currentAdr !== undefined && this.currentAdr.path !== undefined) {
          return store.currentRepository.fullName + "/" + this.currentAdr.path;
        } else {
          return "";
        }
      }
    },
    watch: {
      adr(newValue) {
        store.openAdrBy(this.repoFullName, newValue);
      }
    },
    mounted() {
      store.reload();
      store.openAdrBy(this.repoFullName, this.adr);
    },
    methods: {
      setFilePath(path) {
        this.filePath = path;
      },
      setADRFile(adr) {
        this.editedADR = adr;
      },
      setActiveBranch(activeBranch) {
        store.setActiveBranch(activeBranch);
        this.oldSelected = this.selected;
        this.selected = activeBranch;
      },
      onSelectedBranch() {
        this.$confirm("Do you really want to change branch?").then(() => {
          loadARepositoryContent(this.currentRepo, this.selected)
            .then((repoObject) => {
              if (typeof repoObject !== "undefined") {
                store.updateRepository(repoObject);
              }
            });
        }).catch(() => {
          this.selected = this.oldSelected;
          store.setActiveBranch(this.oldSelected);
        });
      },
      loadBranchesName() {
        loadBranchesName(
          this.currentRepo.split("/")[1],
          this.currentRepo.split("/")[0]
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

      logOut() {
        console.log('Logging out!');
        //localStorage.removeItem('authId');
        localStorage.clear();
        this.$router.push('/');
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