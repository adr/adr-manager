<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%;">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div style="height: 100%; width: 100%; position: absolute; overflow-y:auto">
        <v-list dense multiple>
          <v-list-group v-for="(repo, i) in folderTree" :key="repo.path"
            :prepend-icon="fileTypeIconMapping[repo.fileType]" :value="i === 0" @click="sendRepo(repo)">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="repo.name"></v-list-item-title>
              </v-list-item-content>

              <!-- Remove Repository Button-->
              <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                @click.prevent.stop="removeRepository(repo.repository)">
                <v-icon>mdi-folder-remove</v-icon>
              </v-btn>
            </template>

            <!-- sub list containing the ADRs -->
            <v-list-item-group mandatory v-model="openAdrPath">
              <v-list-item v-for="file in repo.children" :key="file.path" @click="openFileByPath({ path: file.path })"
                :value="file.path">
                <v-tooltip bottom open-delay="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-icon> </v-list-item-icon>
                    <v-list-item-content v-bind="attrs" v-on="on">
                      <v-list-item-title v-text="displayInfo(file)">
                      </v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <span v-text="file.tooltip"></span>
                </v-tooltip>
                <!-- Button-Icons for copy and delete -->
                <v-list-item-icon>
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                    v-if="file.fileType === 'adr' || file.fileType === 'md'" @click.prevent.stop="">
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-btn>

                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                    v-if="file.fileType === 'adr' || file.fileType === 'md'"
                    @click.prevent.stop="deleteAdr(file.adr, repo.repository)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
              <div class="d-flex justify-content-space-around justify-center">
                <v-btn @click.native.prevent.stop="
                    createNewAdr({ repository: repo })
                  " class="align-center" width="75%">
                  <v-icon>mdi-plus</v-icon> New ADR
                </v-btn>
              </div>
            </v-list-item-group>
          </v-list-group>
        </v-list>
        <!-- Some vertical space at the end -->
        <div class="my-16"></div>
      </div>
    </div>
    <!-- Bottom Buttons for adding a repository and commiting -->
    <div class="flex-grow-0 d-flex flex-wrap">
      <DialogAddRepositories>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
            Add Repository
          </v-btn>
        </template>
      </DialogAddRepositories>
      <DialogCommit v-bind:currUser="userName" v-bind:currRepo="repoName" v-bind:listFilesChanged="listFilesChanged">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
            Commit and Push
          </v-btn>
        </template>
      </DialogCommit>
    </div>
  </v-card>
</template>

<script>
  import { snakeCase2naturalCase } from "@/plugins/utilities";
  import { store } from "@/plugins/store";

  import DialogAddRepositories from "@/components/DialogAddRepositories.vue";
  import DialogCommit from "@/components/DialogCommit.vue";

  export default {
    components: {
      DialogAddRepositories,
      DialogCommit
    },
    props: {
      user: String,
      firstUserName: String,
      firstRepoName: String
    },
    data: function () {
      return {
        dataAuth: "",
        // openAdrPath: "",
        userName: this.firstUserName,
        repoName: this.firstRepoName,
        fileTypeIconMapping: {
          html: "mdi-language-html5",
          js: "mdi-nodejs",
          json: "mdi-code-json",
          md: "mdi-language-markdown",
          pdf: "mdi-file-pdf",
          png: "mdi-file-image",
          txt: "mdi-file-document-outline",
          xls: "mdi-file-excel",
          repo: "mdi-folder-star",
          folder: "mdi-folder",
        },
        listFilesChanged: {}
      };
    },
    computed: {
      /** Tree structure of the displayed repositories and their contents
       */
      folderTree() {
        let folderTree = store.addedRepositories.map((repo) => {
          let fsRepoEntry = {
            name: repo.fullName,
            fullName: repo.fullName,
            fileType: "repo",
            path: repo.fullName,
            children: [],
            repository: repo,
          };
          // Put ADRs in the repo.
          fsRepoEntry.children = repo.adrs.map((adr) => {
            let rawName = adr.path.split("/").pop();
            let name = rawName;
            if (rawName.match("\\d{4}-.*[.]md")) {
              name = snakeCase2naturalCase(rawName).replace(".md", "");
              name.split();
            }
            return {
              name: rawName.match("\\d{4}-.*[.]md")
                ? snakeCase2naturalCase(rawName).replace(".md", "")
                : rawName,
              fileType: "adr",
              path: repo.fullName + "/" + adr.path,
              children: [],
              adr: adr,
              tooltip: adr.path,
            };
          });
          // Sort ADRs by path
          fsRepoEntry.children.sort((r1, r2) => {
            if (r1.path < r2.path) {
              return -1;
            }
            if (r1.path > r2.path) {
              return 1;
            }
            return 0;
          });
          return fsRepoEntry;
        });
        // Sort Repositories by fullName
        folderTree.sort((r1, r2) => {
          if (r1.fullName < r2.fullName) {
            return -1;
          }
          if (r1.fullName > r2.fullName) {
            return 1;
          }
          return 0;
        });
        return folderTree;
      },
      openAdrPath: {
        get() {
          return store.currentRepository.fullName + "/" + store.currentlyEditedAdr.path;
        },
        set() { }
      }
    },
    watch: {},
    mounted() { },
    created() {
      this.dataAuth = this.$route.params.id;
    },
    methods: {
      displayInfo(file) {
        if (file.adr.originalMd !== file.adr.editedMd) {
          if (this.listFilesChanged === undefined) {
            this.listFilesChanged = {};
          }
          this.listFilesChanged[file.path] = {
            title: file.name,
            value: file.adr.editedMd,
            path: file.path
          };
          return file.name + "*";
        }
        return file.name + "";
      },

      activeFilePath() {
        let activeFile = this.folderTree.reduce((total, repo) => {
          return total.concat(repo.children)
        }, []).find(file => (file.adr === store.currentlyEditedAdr));
        if (activeFile) {
          return activeFile.path;
        } else {
          return "";
        }
      },

      /** Requests the user to confirm the removal of the repository and removes it upon confirmation.
       * 
       * @param {{ fullName : string, activeBranch : string, adrs : object[] }} repo - the repo object (with attributes 'fullName', 'activeBranch' and 'adrs')
       */
      removeRepository(repo) {
        this.$confirm(
          "Do you really want to remove the repository " + repo.fullName + "?",
          "Remove " + repo.fullName,
          "warning"
        ).then(() => {
          store.removeRepository(repo);
        }).catch(() => { });
      },

      sendRepo(repo) {
        this.$emit("repo-name", repo.name);
        this.$emit("active-branch", repo.repository.activeBranch)
      },

      /**
       * @param folder - the base folder in which should be searched
       * @param path - the path inside that folder
       * @returns True iff there is a file in the folder structur with the parameter path as prefix of its path
       */
      folderContainsPath({ folder, path }) {
        let searchedDirectory = getFileByPath({
          folder: folder,
          path: folder.path + "/" + path,
        });
        return typeof searchedDirectory !== "undefined";
      },

      openFileByPath({ path }) {
        if (typeof path === "undefined") {
          console.log("Can't open file at an undefined path.");
          return;
        }
        console.log("Open file by path: " + path);
        let file = getFileByPath({ folder: this.folderTree, path });

        let indexUserName = path.indexOf("/");
        this.userName = path.slice(0, indexUserName);
        let repoNamePath = path.slice(indexUserName + 1);
        let indexRepoName = repoNamePath.indexOf("/");
        this.repoName = repoNamePath.slice(0, indexRepoName);

        this.openFile({ file });
      },

      /** Opens an adr by changing the route accordingly.
       *
       * @param file - the file object (from the folder structure)
       */
      openFile({ file }) {
        if (typeof file.adr !== "undefined") {
          this.$router.push({
            params: { // Opening a file is done via routing (EditorVie.vue will open the ADR based on route params)
              ...this.$route.params,
              organization: file.path.split("/")[0],
              repo: file.path.split("/")[1],
              adr: file.adr.path.split("/").pop()
            }
          });
        } else {
          console.log("Open File Failed :(");
        }
      },

      /**Creates a new ADR and opens it.
       * 
       * @param {object} repository - the repository to which the new adr is added. 
       */
      createNewAdr({ repository }) {
        let newAdr = store.createNewAdr(repository.repository);

        // Open the new adr.
        this.$router.push({
          params: { // Opening a file is done via routing (EditorView.vue will open the ADR based on route params)
            ...this.$route.params,
            organization: repository.fullName.split("/")[0],
            repo: repository.fullName.split("/")[1],
            adr: newAdr.path.split("/").pop()
          }
        });
      },

      /**Deletes the adr.
       * 
       * @param {object} adr - the ADR
       * @param {Repository} repo - the repository that contains the ADR
       */
      deleteAdr(adr, repo) {
        this.$confirm(
          "Do you really want to delete \n"
          + adr.path
          + "\n from the repository \n"
          + repo.fullName + "?",
          "Delete " + adr.path.split('/').pop(),
          "warning"
        ).then(() => {
          store.deleteAdr(adr, repo);
        }).catch(() => {
        });
      }
    },
  };

  // Private methods
  function getFileByPath({ folder, path }) {
    if (typeof path !== "string") {
      console.log("A file path must be a string, but this isn't: ", path);
      return;
    }

    let searchedFile = folder ? folder : this.folderTree;
    if (!searchedFile.path) {
      searchedFile = searchedFile.find((file) => path.startsWith(file.path)); //= this.folderTree.find((repo) => (remainingPath.startsWith(repo.name)))
    }

    let found = false;
    while (!found) {
      if (searchedFile) {
        if (searchedFile.path === path) {
          return searchedFile;
        } else if (searchedFile.path.startsWith(path)) {
          // The file path of the searched file can be longer, iff paths are skipped in the folder structure.
          // E.g. if a folder or repository 'adr/madr' directly contains 'adr/madr/docs/adr/XXXX-...md'.
          return searchedFile;
        }
        searchedFile = searchedFile.children.find(
          (file) => path.startsWith(file.path) || file.path.startsWith(path)
        );
      } else {
        return searchedFile;
      }
    }
    return searchedFile;
  }
</script>

<style scoped></style>