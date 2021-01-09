<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div
        style="height: 100%; width: 100%; position: absolute; overflow-y: auto"
      >
        <v-list multiple dense>
          <v-list-item-group data-cy="repoNameList">
            <v-list-group
              v-for="(repo, i) in folderTree"
              :key="repo.path"
              :prepend-icon="fileTypeIconMapping[repo.fileType]"
              :value="i === indexOfOpenedRepo"
              @click="sendRepo(repo)"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title  v-text="repo.name"></v-list-item-title>
                </v-list-item-content>
                <DialogCommit
                  v-bind:repo="{ name: repo.name }"
                  v-if="repo.fileType === 'repo'"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      style="width: 30px; min-width: 30px; height: 100%"
                      class="mx-0 px-0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon data-cy="pushIcon">mdi-publish</v-icon>
                    </v-btn>
                  </template>
                </DialogCommit>
                <!-- Remove Repository Button-->
                <DialogRemoveRepository
                  v-bind:repo="{ name: repo.name }"
                  v-if="repo.fileType === 'repo'"
                  @remove-repo="removeRepository(repo.repository)"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    data-cy="removeRepo"
                      style="width: 30px; min-width: 30px; height: 100%"
                      class="mx-0 px-0"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>mdi-folder-remove</v-icon>
                    </v-btn>
                  </template>
                </DialogRemoveRepository>
              </template>

              <!-- sub list containing the ADRs -->
              <v-list-item-group v-model="openAdrPath">
                <v-list-item
                data-cy="adrList"
                  v-for="file in repo.children"
                  :key="file.path"
                  @click="openFileByPath({ path: file.path })"
                  :value="file.path"
                >
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
                    <DialogDeleteAdr :adr="file.adr" :repo="repo.repository">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          data-cy="deleteAdrBtn"
                          style="width: 30px; min-width: 30px; height: 100%"
                          class="mx-0 px-0"
                          v-if="
                            file.fileType === 'adr' || file.fileType === 'md'
                          "
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>
                    </DialogDeleteAdr>
                  </v-list-item-icon>
                </v-list-item>
                <div class="d-flex justify-content-space-around justify-center">
                  <v-btn
                    data-cy="newADR"
                    dark
                    class="align-center"
                    width="75%"
                    @click.native.prevent.stop="
                      createNewAdr({ repository: repo })
                    "
                  >
                    <v-icon data-cy="NewAdrFile">mdi-plus</v-icon>
                    New ADR
                  </v-btn>
                </div>
              </v-list-item-group>
            </v-list-group>
          </v-list-item-group>
        </v-list>
        <!-- Some vertical space at the end -->
        <div class="my-16"></div>
      </div>
    </div>
    <!-- Bottom Buttons for adding a repository and commiting -->
    <div class="flex-grow-0 d-flex flex-wrap">
      <DialogAddRepositories>
        <template v-slot:activator="{ on, attrs }">
          <v-btn data-cy="addRepo" v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
            Add Repository
          </v-btn>
        </template>
      </DialogAddRepositories>
    </div>
  </v-card>
</template>

<script>
import { snakeCase2naturalCase } from "@/plugins/parser";
import { store } from "@/plugins/store";

import DialogAddRepositories from "@/components/DialogAddRepositories.vue";
import DialogCommit from "@/components/DialogCommit.vue";

import DialogRemoveRepository from "@/components/DialogRemoveRepository.vue";
import DialogDeleteAdr from "@/components/DialogDeleteAdr.vue";

export default {
  components: {
    DialogAddRepositories,
    DialogCommit,
    DialogRemoveRepository,
    DialogDeleteAdr
  },
  props: {
    user: String
  },
  data: function () {
    return {
      dataAuth: "",
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
      }
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
          repository: repo
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
        // Sort ADRs alphabetically by path
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
        if (store.currentRepository && store.currentlyEditedAdr) {
          return (
            store.currentRepository.fullName +
            "/" +
            store.currentlyEditedAdr.path
          );
        } else if (store.currentRepository) {
          return store.currentRepository.fullName;
        } else {
          return undefined;
        }
      },
      set() {},
    },
    indexOfOpenedRepo: {
      get() {
        if (store.currentRepository) {
          let index = this.folderTree.findIndex(
            (repo) =>
              repo.repository.fullName === store.currentRepository.fullName
          );
          return index;
        } else {
          return -1;
        }
      },
      set() {}
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.dataAuth = this.$route.params.id;
  },
  methods: {
    displayInfo(file) {
      if (file.adr.originalMd !== file.adr.editedMd) {
        return file.name + "*";
      }
      return file.name + "";
    },

    activeFilePath() {
      let activeFile = this.folderTree
        .reduce((total, repo) => {
          return total.concat(repo.children);
        }, [])
        .find((file) => file.adr === store.currentlyEditedAdr);
      if (activeFile) {
        return activeFile.path;
      } else {
        return "";
      }
    },

    /**
     * @param {object} repo - the repo object (with attributes 'fullName', 'activeBranch' and 'adrs)
     */
    removeRepository(repo) {
      store.removeRepository(repo);
    },

    sendRepo(repo) {
      this.$emit("repo-name", repo.name);
      this.$emit("active-branch", repo.repository.activeBranch);
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

      this.openFile({ file });
    },

    /** Opens an adr by changing the route accordingly.
     *
     * @param file - the file object (from the folder structure)
     */
    openFile({ file }) {
      if (typeof file.adr !== "undefined") {
        this.$router.push({
          params: {
            // Opening a file is done via routing (EditorVie.vue will open the ADR based on route params)
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
        params: {
          // Opening a file is done via routing (EditorView.vue will open the ADR based on route params)
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
        "Do you really want to delete \n" +
          adr.path +
          "\n from the repository \n" +
          repo.fullName +
          "?",
        "Delete " + adr.path.split("/").pop(),
        "warning"
      )
        .then(() => {
          store.deleteAdr(adr, repo);
        })
        .catch(() => {});
    },
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