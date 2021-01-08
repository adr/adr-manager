<template>
  <v-dialog v-bind:value="showDialog" v-on:input="(value) => { showDialog = value; $emit('input', value) }" width="700"
    :fullscreen="$vuetify.breakpoint.mobile" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
      <v-overlay data-cy="loadReposBool" :value="showLoadingOverlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </template>
    <v-card class="d-flex flex-column">

      <v-card-title>
        <v-row>
          <div>
            <v-avatar color="primary" size="35" class="mx-1">
              <v-icon dark>mdi-folder-plus</v-icon>
            </v-avatar>
            <span class="dialogTitle">
              Add Repositories
            </span>
          </div>
          <v-text-field v-model="searchText" class="pl-8 pr-4 pt-0 mt-0" hide-details clearable
            append-icon="mdi-magnify" placeholder="Search..." @input="searchRepositories" @click:clear="searchText = ''; loadRepositoryList()" />
          <v-progress-linear :active="countLoadingPromises > 0" :indeterminate="countLoadingPromises > 0" absolute
            top />
        </v-row>
      </v-card-title>

      <v-divider class="mb-0"></v-divider>

      <div v-if="showPagination" class="text-center">
        <v-btn :disabled="!hasPreviousPage" @click="goToPreviousPage">
          <v-icon>mdi-chevron-left</v-icon> Back
        </v-btn>
        <v-btn :disabled="!hasNextPage" @click="goToNextPage">
          Next <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>

      <!-- Unstaged Repositories -->
      <v-card-text class="my-0">
        <div data-cy="noRepo" v-if="unstagedRepositories.length === 0 && countLoadingPromises === 0" class="text-center">
          Sorry, no repositories were found!
        </div>
        <v-list >
          <v-list-item data-cy="listRepo" v-for="(item, index) in unstagedRepositories" class="my-0 py-0" :key="`item-${index}`"
            :value="item" @click="stageRepostiory(item)">
            <v-list-item-content class="my-0 py-0">
              <v-list-item-title class="d-flex"> {{ item.name }} <v-spacer></v-spacer>
                <v-card-subtitle class="py-0"> updated on {{ item.updated }} </v-card-subtitle>
              </v-list-item-title>
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
          <v-list-item  v-for="(item, index) in repositoriesSelected" class="my-0 py-0" :key="`item-${index}`"
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
      <v-divider></v-divider>
      <v-card-actions class="buttonPadding">
        <v-spacer></v-spacer>
        <v-btn data-cy="addRepoDialog" text color="success" :disabled="repositoriesSelected.length===0"
          @click="() => { showDialog = false; addRepositories() }">
          Add Repositories
        </v-btn>
        <v-btn text color="error" @click="showDialog = false">
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
      repositoriesSelected: [],
      repositoriesCurrentPage: [], // A list containing all repositories  (Raw Data fetched from GitHub)
      showDialog: false, // Initial value is set by value-prob
      showLoadingOverlay: false, // Flag for loading overlay when loading repoitory content
      countLoadingPromises: 0, // counts loading repositories, needed for showing loading bar.
      searchText: "",
      page: 1,
      perPage: 30
    }),
    computed: {
      showPagination() {
        return this.hasNextPage || this.hasPreviousPage;
      },
      notAddedRepositories() {
        return this.filterUnaddedRepositories(this.repositoriesCurrentPage);
      },
      unstagedRepositories() {
        return this.filterUnstagedRepositories(this.repositoriesCurrentPage)
          .map((repo) => {
            let date = new Date(repo.updated_at);
            let displayedDate = date.toDateString().substr(4, 11);
            return {
              name: repo.full_name,
              description: repo.description,
              repoData: repo,
              updated: displayedDate
            };
          })
          .slice(0, this.perPage);
      },
      hasPreviousPage() {
        return this.page > 1;
      },
      hasNextPage() {
        return this.repositoriesCurrentPage.length >= this.perPage;
      }
    },
    watch: {
      /** Reload repositories in case something went wrong while mounting, a new repo was created on GitHub or something similar. */
      showDialog(newValue) {
        if (newValue === true) {
          this.page = 1;
          this.loadRepositoryList();
        }
      }
    },
    mounted() {
      this.showDialog = this.value;
      this.loadRepositoryList();
    },
    methods: {

      /** Loads all (added and unadded) repositories the user is authorized to access into repositoriesCurrentPage.
       */
      loadRepositoryList() {
        this.countLoadingPromises++;
        loadRepositoryList(this.page, this.perPage)
          .then((res) => {
            if (!Array.isArray(res)) {
              throw "Couldn't load repos.";
            }
            this.repositoriesCurrentPage = res;

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
        if (typeof this.searchText !== 'string' || this.searchText.trim() === "") {
          this.loadRepositoryList();
        } else {
          this.countLoadingPromises++;
          this.repositoriesCurrentPage = [];
          searchRepositoryList(this.searchText, this.perPage, this.repositoriesCurrentPage)
            .then((repos) => {
              console.log("Loaded Repos", repos);
              if (!Array.isArray(repos)) {
                throw "Couldn't load repos.";
              }
              // this.repositoriesCurrentPage = repos;
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

      goToNextPage() {
        if (this.hasNextPage) {
          this.page++;
          this.loadRepositoryList();
        }
      },

      goToPreviousPage() {
        if (this.hasPreviousPage) {
          this.page--;
          this.loadRepositoryList();
        }
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
          }))
        ).then((repoObjectList) => {
          if (typeof repoObjectList !== "undefined") {
            this.showLoadingOverlay = false;
            store.addRepositories(repoObjectList);

            /* Reset the selected repositories. */
            this.repositoriesSelected = [];
            this.searchText = "";
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