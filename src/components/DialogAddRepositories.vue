<template>
  <v-dialog v-bind:value="showDialog" v-on:input="(value) => { showDialog = value; $emit('input', value) }" width="600"
    :fullscreen="$vuetify.breakpoint.mobile" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
      <v-overlay :value="showLoadingOverlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </template>
    <v-card class="d-flex flex-column">
      <v-card-title class="headline grey lighten-2">
        Add Repositories
        <v-text-field v-model="searchText" class="pl-8 pr-4 pt-0 mt-0" hide-details clearable append-icon="mdi-magnify"
          placeholder="Search..." @input="searchRepositories" />
        <v-progress-linear :active="countLoadingPromises > 0" :value="countLoadingPromises"
          :indeterminate="countLoadingPromises > 0" absolute top />
      </v-card-title>

      <v-pagination v-if="showPagination" v-model="page" :length="paginationLength" @input="loadRepositoryList()" />

      <!-- Unstaged Repositories -->
      <v-card-text class="my-0">
        <div v-if="unstagedRepositories.length === 0 && countLoadingPromises === 0" class="text-center">
          Sorry, no repositories were found!
        </div>
        <v-list>
          <v-list-item v-for="(item, index) in unstagedRepositories" class="my-0 py-0" :key="`item-${index}`"
            :value="item" @click="stageRepostiory(item)">
            <v-list-item-content class="my-0 py-0">
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>

      <!-- Repositories staged to be added -->
      <v-divider class="my-0"></v-divider>
      <v-card-title>Repositories to be added</v-card-title>
      <v-card-text class="my-0 flex-grow-0 flex-shrink-0" :style="{ 'max-height' : '25%' }">
        <v-list>
          <v-list-item v-for="(item, index) in repositoriesSelected" class="my-0 py-0" :key="`item-${index}`"
            :value="item" @click="unstageRepostiory(item)">
            <v-list-item-content class="my-0 py-0">
              <v-list-item-title v-text="item.name"></v-list-item-title>
              <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-close</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider class="mt-0"></v-divider>
      <v-card-actions class="mt-0">
        <v-spacer></v-spacer>
        <v-btn :disabled="repositoriesSelected.length===0" @click="() => { showDialog = false; addRepositories() }">
          Add Repositories
        </v-btn>
        <v-btn @click="showDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { loadRepositoryList, searchRepositoryList, loadAllRepositoryContent } from "@/plugins/api.js";
  import { store } from "@/plugins/store.js";
  import _ from 'lodash'

  export default {
    name: 'DialogAddRepositories',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: false,
      }
    },
    data: () => ({
      showDialog: false, // Initial value is set by value-prob
      repositoriesSelected: [],
      allRepositories: [], // A list containing all repositories  (Raw Data fetched from GitHub)
      showLoadingOverlay: false,
      countLoadingPromises: 0, // 
      listHeight: 700,
      searchText: "",
      page: 1,
      perPage: 30,
      paginationLength: 1
    }),
    computed: {
      showPagination() {
        return this.paginationLength > 1 && this.searchText === "";
      },
      notAddedRepositories() {
        return this.filterUnaddedRepositories(this.allRepositories);
      },
      unstagedRepositories() {
        return this.filterUnstagedRepositories(this.allRepositories)
          .map((repo) => ({ name: repo.full_name, description: repo.description, repoData: repo }))
          .slice(0, this.perPage);
      },
    },
    watch: {
      /** Reload repositories in case something went wrong while mounting, a new repo was created on GitHub or something similar. */
      showDialog(newValue) {
        if (newValue === true) {
          this.loadRepositoryList();
        }
      }
    },
    mounted() {
      this.showDialog = this.value;
      this.loadPaginationLength();
      this.loadRepositoryList();
    },
    methods: {

      /** Loads all (added and unadded) repositories the user is authorized to access into allRepositories.
       */
      loadRepositoryList() {
        this.countLoadingPromises++;
        loadRepositoryList(this.dataAuth, this.page, this.perPage)
          .then((res) => {
            if (!Array.isArray(res)) {
              throw "Couldn't load repos.";
            }
            this.allRepositories = res;

            this.countLoadingPromises--;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },

      /**Search for repositories which full name contains the search text.
       */
      searchRepositories: _.debounce(function () {
        if (this.searchText.trim() === "") {
          this.loadRepositoryList();
        } else {
          this.countLoadingPromises++;
          this.allRepositories = [];
          searchRepositoryList(this.searchText, this.perPage, this.allRepositories)
            .then((repos) => {
              console.log("Loaded Repos", repos);
              if (!Array.isArray(repos)) {
                throw "Couldn't load repos.";
              }
              // this.allRepositories = repos;
              this.countLoadingPromises--;
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error(error);
            });
        }
      }, 500),

      /**Filters the list to only include only repos which are not staged yet.
       */
      filterUnstagedRepositories(repoList) {
        return this.filterUnaddedRepositories(repoList)
          .filter((repo) => !this.repositoriesSelected.map((repo) => (repo.name)).includes(repo.full_name));
      },

      /**Filters the list to only include only repos which are not added yet.
       */
      filterUnaddedRepositories(repoList) {
        return repoList.filter( // Filter for unadded repositories
          (repo) => !store.addedRepositories.map((repo) => (repo.fullName)).includes(repo.full_name)
        );
      },

      /** Sets the total number of pages of the pagination. 
       * Loads the total number of repositories and computes how many pages are needed.
       */
      loadPaginationLength() {
        loadRepositoryList(this.dataAuth, null, null)
          .then((res) => {
            if (!Array.isArray(res)) {
              console.log(res);
              throw "Couldn't load repo number.";
            }
            this.paginationLength = Math.ceil(res.length / this.perPage);
            console.log("Number of pages in Dialog Add Repositories: ", this.paginationLength);
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error("Error while loading pagination length:");
            console.error(error);
          });
      },


      /**Stage a repository to be added.
       * @param {object} repo - must be in unstagedRepositories
       */
      stageRepostiory(repo) {
        this.repositoriesSelected.push(repo);
      },

      /**Unstage a repository to be added.
       * @param {object} repo - must be in stagedRepositories
       */
      unstageRepostiory(repo) {
        this.repositoriesSelected = this.repositoriesSelected.filter(item => item !== repo);
      },

      /** Once the user has accepted his repo selection, load the selected repos and emit them.
       * Called when the 'Add repositories'-Dialog is closed.
       *
       * @param repoList - A list of repository data (like it is fetched from GitHub)
       */
      addRepositories: async function () {
        this.showLoadingOverlay = true;
        loadAllRepositoryContent(
          this.repositoriesSelected.map((repo) => ({
            fullName: repo.repoData.full_name,
            branch: repo.repoData.default_branch
          })),
          this.dataAuth
        ).then((repoObjectList) => {
          if (typeof repoObjectList !== "undefined") {
            this.showLoadingOverlay = false;
            store.addRepositories(repoObjectList);

            /* Reset the selected repositories. */
            this.repositoriesSelected = [];
          }
        }).catch((e) => {
          alert('Sorry, we couldn\'t load the repositories you requested!');
          console.log(e);
          this.showLoadingOverlay = false;
        });
      }

    }
  }
</script>

<style scoped>
</style>