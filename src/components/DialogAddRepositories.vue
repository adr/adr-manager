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
        <v-text-field v-model="searchText" class="pl-8 pr-4 pt-0 mt-0" hide-details clearable append-icon="mdi-magnify" placeholder="Search..." />
      </v-card-title>
      <v-card-text class="my-0">
        <v-list>
          <v-list-item-group v-model="repositoriesSelected" multiple>

            <v-list-item v-for="(item, index) in repositoriesDisplayed" class="my-0 py-0" :key="`item-${index}`"
              :value="item" v-show="item.name.includes(searchText ? searchText.trim() : '')">
              <template v-slot:default="{ active }">

                <v-list-item-content class="my-0 py-0">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox :input-value="active" color="deep-purple accent-4"></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
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
  import { loadRepositoryList, loadAllRepositoryContent } from "@/plugins/api.js";
  import { store } from "@/plugins/store.js";

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
      listHeight: 700,
      searchText: ""
    }),
    computed: {
      notAddedRepositories() {
        return this.allRepositories.filter(
          (repo) => !store.addedRepositories.map((repo) => (repo.fullName)).includes(repo.full_name)
        );
      },
      repositoriesDisplayed() {
        return this.notAddedRepositories.map((repo) => ({ name: repo.full_name, description: repo.description, repoData: repo }))
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
      this.loadRepositoryList()
    },
    methods: {

      /** Loads all (added and unadded) repositories the user is authorized to access into allRepositories.
       */
      loadRepositoryList() {
        loadRepositoryList(this.dataAuth)
          .then((res) => {
            if (!Array.isArray(res)) {
              throw "Couldn't load repos.";
            }
            this.allRepositories = res;
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
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
            store.addRepositories(repoObjectList)

            this.repositoriesSelected = []
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