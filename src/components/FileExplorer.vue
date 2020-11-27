<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%;">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div
        style="height: 100%; width: 100%; position: absolute; overflow-y:auto"
      >
        <v-list dense multiple>
          <v-list-group
            v-for="repo in folderStructure"
            :key="repo.path"
            :prepend-icon="fileTypeIconMapping[repo.fileType]"
            :disabled="!folderContainsPath({ folder: repo, path: 'docs/adr' })"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="repo.name"></v-list-item-title>
              </v-list-item-content>

              <DialogRemoveRepository
                v-bind:repo="{ name: repo.name }"
                v-if="repo.fileType === 'repo'"
                @remove-repo="removeRepository(repo)"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    style="width: 30px; min-width: 30px; height: 100%;"
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
            <v-list-item-group mandatory>
              <v-list-item
                v-for="file in repo.children"
                :key="file.path"
                @click="openFileByPath({ path: file.path })"
              >
                <v-list-item-icon> </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>

                <!-- Button-Icons for copy and delete -->
                <v-list-item-icon>
                  <v-btn
                    style="width: 30px; min-width: 30px; height: 100%;"
                    class="mx-0 px-0"
                    v-if="file.fileType === 'adr' || file.fileType === 'md'"
                  >
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-btn>

                  <DialogDeleteAdr v-bind:adr="{ name: file.name }">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        style="width: 30px; min-width: 30px; height: 100%;"
                        class="mx-0 px-0"
                        v-if="file.fileType === 'adr' || file.fileType === 'md'"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </DialogDeleteAdr>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item inactive>
                <v-btn block @click="createNewAdr({ repository: repo })">
                  <v-icon>mdi-plus</v-icon> New ADR
                </v-btn>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>
    </div>
    <!-- Bottom Buttons for adding a repository and commiting -->
    <div class="flex-grow-0 d-flex flex-wrap">
      <DialogAddRepositories
        :repos="notAddedRepositories"
        @click="loadRepositoryListComponent"
        @add-repositories="addRepositories"
      >
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

import { loadRepositoryList, loadAllRepositoryContent } from "@/plugins/api.js";

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
  },
  data: function() {
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
      },
      allRepositories: [], // A list containing all repositories  (Raw Data fetched from GitHub)
      addedRepos: []
    };
  },
  computed: {
    addedRepoFullNames() {
      return this.addedRepos.map((repository) => repository.fullName);
    },
    notAddedRepositories() {
      return this.allRepositories.filter(
        (repo) => !this.addedRepoFullNames.includes(repo.full_name)
      );
    },
    /** Tree structure of the displayed repositories and their contents
     */
    folderStructure() {
      console.log("folderStructure from repos", this.addedRepos);
      return this.addedRepos.map((repo) => {
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
          return {
            name: rawName.match("\\d{4}-.*[.]md")
              ? snakeCase2naturalCase(rawName).replace(".md", "")
              : rawName,
            fileType: "adr",
            path: repo.fullName + "/" + adr.path,
            children: [],
            adr: adr
          };
        });
        return fsRepoEntry;
      });
    }
  },
  watch: {},
  mounted() {},
  created() {
    this.dataAuth = this.$route.params.id;
    this.loadRepositoryListComponent();
  },
  methods: {
    /** Loads all (added and unadded) repositories the user is authorized to access into allRepositories.
     */
    loadRepositoryListComponent() {
      loadRepositoryList(this.dataAuth)
        .then((res) => {
          console.log("Loaded repo data", res);
          if (!Array.isArray(res)) {
            throw "Couldn't load repos.";
          }
          this.allRepositories = res;
          console.log("All Repositories", this.allRepositories);
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },

    /** Adds all repositories from the repo list to the folder structure.
     * Called when the 'Add repositories'-Dialog is closed.
     *
     * @param repoList - A list of repository data (like it is fetched from GitHub)
     */
    addRepositories(repoList) {
      loadAllRepositoryContent(
        repoList.map((repo) => ({
          fullName: repo.full_name,
          branch: repo.default_branch
        })),
        this.dataAuth
      ).then((repoObjectList) => {
        console.log("addRepositories", repoObjectList);
        if (typeof repoObjectList !== "undefined")
          this.addedRepos = this.addedRepos.concat(repoObjectList);
      });
    },

    /**
     * @param {Object} repo - the repo object from the folder structure
     */
    removeRepository(repo) {
      this.addedRepos = this.addedRepos.filter(
        (el) => el.fullName !== repo.path
      );
      this.$emit("remove-repo", repo);
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
        console.log("open file", file.adr);
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
    console.log("A file path must be a string, but this isn't: ");
    console.log(path);
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
