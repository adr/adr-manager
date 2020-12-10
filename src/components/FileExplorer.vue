<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%;">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div style="height: 100%; width: 100%; position: absolute; overflow-y:auto">
        <v-list dense multiple>
          <v-list-group v-for="(repo, i) in folderStructure" :key="repo.path"
            :prepend-icon="fileTypeIconMapping[repo.fileType]" :value="i === 0" @click="sendRepo(repo)"> 
            <template v-slot:activator>
              <v-list-item-content >
                <v-list-item-title v-text="repo.name" ></v-list-item-title>
              </v-list-item-content>

              <DialogRemoveRepository v-bind:repo="{ name: repo.name }" v-if="repo.fileType === 'repo'"
                @remove-repo="removeRepository(repo.repository)">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0" v-bind="attrs" v-on="on">
                    <v-icon>mdi-folder-remove</v-icon>
                  </v-btn>
                </template>
              </DialogRemoveRepository>
            </template>

            <!-- sub list containing the ADRs -->
            <v-list-item-group mandatory>
              <v-list-item v-for="file in repo.children" :key="file.path" @click="openFileByPath({ path: file.path })">
                <v-tooltip bottom open-delay="500">
                  <template v-slot:activator="{ on, attrs }">

                    <v-list-item-icon> </v-list-item-icon>
                    <v-list-item-content v-bind="attrs" v-on="on">
                      <v-list-item-title v-text="file.name + (file.adr.originalMd !== file.adr.editedMd ? '*' : '')"></v-list-item-title>
                    </v-list-item-content>

                  </template>
                  <span v-text="file.tooltip"></span>
                </v-tooltip>
                <!-- Button-Icons for copy and delete -->
                <v-list-item-icon>
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                    v-if="file.fileType === 'adr' || file.fileType === 'md'">
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-btn>

                  <DialogDeleteAdr v-bind:adr="{ name: file.name }">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                        v-if="file.fileType === 'adr' || file.fileType === 'md'" v-bind="attrs" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </DialogDeleteAdr>
                </v-list-item-icon>
              </v-list-item>
              <div class="d-flex justify-content-space-around justify-center">
                <v-btn @click.native.prevent.stop="createNewAdr({ repository: repo })" class="align-center" width="75%">
                  <v-icon>mdi-plus</v-icon> New ADR
                </v-btn>
              </div>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>
    </div>
    <!-- Bottom Buttons for adding a repository and commiting -->
    <div class="flex-grow-0 d-flex flex-wrap">
      <DialogAddRepositories :added-repos="addedRepositories" @add-repositories="addRepositories">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
            Add Repository
          </v-btn>
        </template>
      </DialogAddRepositories>
      <DialogCommit>
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

  import DialogAddRepositories from "@/components/DialogAddRepositories.vue";
  import DialogCommit from "@/components/DialogCommit.vue";
  import DialogDeleteAdr from "@/components/DialogDeleteAdr.vue";
  import DialogRemoveRepository from "@/components/DialogRemoveRepository.vue";

  export default {
    components: {
      DialogAddRepositories,
      DialogRemoveRepository,
      DialogCommit,
      DialogDeleteAdr
    },
    props: {
      user: String,
      addedRepositories: {
        type: Array,
        required: true,
      }
    },
    data: function () {
      return {
        dataAuth: "",
        openAdrPath: "",
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
          folder: "mdi-folder"
        },
      };
    },
    computed: {
      addedRepoFullNames() {
        return this.addedRepositories.map((repository) => repository.fullName);
      },
      /** Tree structure of the displayed repositories and their contents
       */
      folderStructure() {
        return this.addedRepositories.map((repo) => {
          let fsRepoEntry = {
            name: repo.fullName,
            fullName: repo.fullName,
            fileType: "repo",
            path: repo.fullName,
            children: [],
            repository: repo
          };
          // Put ADRs in the repo.
          fsRepoEntry.children = repo.adrs.map((adr) => {
            let rawName = adr.path.split("/").pop();
            let name = rawName;
            if (rawName.match("\\d{4}-.*[.]md")) {
              name = snakeCase2naturalCase(rawName).replace(".md", "")
              name.split()
            }
            return {
              name: rawName.match("\\d{4}-.*[.]md")
                ? snakeCase2naturalCase(rawName).replace(".md", "")
                : rawName,
              fileType: "adr",
              path: repo.fullName + "/" + adr.path,
              children: [],
              adr: adr,
              tooltip: adr.path
            };
          });
          return fsRepoEntry;
        });
      }
    },
    watch: {},
    mounted() { },
    created() {
      this.dataAuth = this.$route.params.id;
    },
    methods: {

      /** Adds all repositories from the repo list to the folder structure.
       * Called when the 'Add repositories'-Dialog is closed.
       * Emits the event 'add-repositories' with the added repos as parameter.
       *
       * @param repoList - A list of repository data (with attributes 'fullName', 'activeBranch' and 'adrs')
       */
      addRepositories(repoList) {
        if (typeof repoList !== 'undefined') {
          this.$emit('add-repositories', repoList);
        } else {
          console.log('Something went wrong while adding repos to the file explorer! These aren\'t valid repos:', repoList)
        }
      },

      /**
       * @param {Object} repo - the repo object (with attributes 'fullName', 'activeBranch' and 'adrs)
       */
      removeRepository(repo) {
        this.$emit("remove-repository", repo);
      },

      /**
       * @param folder - the base folder in which should be searched
       * @param path - the path inside that folder
       * @returns True iff there is a file in the folder structur with the parameter path as prefix of its path
       */
      folderContainsPath({ folder, path }) {
        let searchedDirectory = getFileByPath({
          folder: folder,
          path: folder.path + "/" + path
        });
        return typeof searchedDirectory !== "undefined";
      },
      sendRepo(repo){
        this.$emit("repo-name", repo.name);
        this.$emit("active-branch", repo.repository.activeBranch)
      },
      openFileByPath({ path }) {
        if (typeof path === "undefined") {
          console.log("Can't open file at an undefined path.");
          return;
        }
        console.log("Open file by path: " + path);
        let file = getFileByPath({ folder: this.folderStructure, path });
        this.openFile({ file });
      },

      /** Opens an adr by emitting an 'open-file' event with the adr object as parameter.
       *
       * @param file - the file object (from the folder structure)
       */
      openFile({ file }) {
        if (typeof file.adr !== "undefined") {
          this.$emit("open-file", file.adr);
        } else {
          console.log("Open File Failed :("); 
        }
      },

      createNewAdr({ repository }) {
        console.log("New ADR in ", repository, "This is not implemented.");
        this.$emit("new-adr", repository.path);
      }
    }
  };

  // Private methods
  function getFileByPath({ folder, path }) {
    if (typeof path !== "string") {
      console.log("A file path must be a string, but this isn't: ", path);
      return;
    }

    let searchedFile = folder ? folder : this.folderStructure;
    if (!searchedFile.path) {
      searchedFile = searchedFile.find((file) => path.startsWith(file.path)); //= this.folderStructure.find((repo) => (remainingPath.startsWith(repo.name)))
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