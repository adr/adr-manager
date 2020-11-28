<template>
  <v-dialog v-bind:value="showDialog"
            v-on:input="(value) => { showDialog = value; $emit('input', value) }"
            width="600px">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
      <v-overlay :value="showLoadingOverlay">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Add Repositories
      </v-card-title>

      <v-card-text class="my-0">
        <v-list class="overflow-auto" height="400px">
          <v-list-item-group v-model="repositoriesSelected"
                             multiple>

            <v-list-item v-for="(item, index) in repositoriesDisplayed"
                         class="my-0 py-0"
                         :key="`item-${index}`"
                         :value="item">
              <template v-slot:default="{ active }">

                <v-list-item-content class="my-0 py-0">
                  <v-list-item-title v-text="item.name"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-checkbox :input-value="active"
                              color="deep-purple accent-4"></v-checkbox>
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

  export default {
    name: 'EditorAddRepositoryDialog',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: true,
      },
      /**
       * Array of full names of Repos that should not be added, e. g. Repos that were added previously.
       */
      addedRepos: {
        type: Array,
        required: false,
        default: () => ([]),
        validator(value) {
          return value.every((repo) => (repo.fullName))
        }
      }
    },
    data: () => ({
      dataAuth: "",
      showDialog: false,
      repositoriesSelected: [],
      allRepositories: [], // A list containing all repositories  (Raw Data fetched from GitHub)
      showLoadingOverlay: false
    }),
    computed: {
      notAddedRepositories() {
        return this.allRepositories.filter(
          (repo) => !this.addedRepos.map((repo) => (repo.fullName)).includes(repo.full_name)
        );
      },
      repositoriesDisplayed() {
        console.log('Displayed Repositories', this.notAddedRepositories)
        return this.notAddedRepositories.map((repo) => ({ name: repo.full_name, description: repo.description, repoData: repo }))
      },
    },
    watch: {
       /** Reload repositories in case something went wrong while mounting, a new repo was created on GitHub or something similar. */
      showDialog(newValue) {
        if (newValue === true) {
          this.loadRepositoryListComponent();
        }
      }
    },
    mounted() {
      this.dataAuth = this.$route.params.id;
      console.log(this.dataAuth)
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
    /** Once the user has accepted his repo selection, load the selected repos and emit them.
     * Called when the 'Add repositories'-Dialog is closed.
     *
     * @param repoList - A list of repository data (like it is fetched from GitHub)
     */
    addRepositories: async function() {
      console.log(this.repositoriesSelected)
      this.showLoadingOverlay = true;
      console.log("Loading True");
      loadAllRepositoryContent(
        this.repositoriesSelected.map((repo) => ({
          fullName: repo.repoData.full_name,
          branch: repo.repoData.default_branch
        })),
        this.dataAuth
      ).then((repoObjectList) => {
        if (typeof repoObjectList !== "undefined") {
          this.showLoadingOverlay = false;
          this.$emit('add-repositories', repoObjectList)
          this.repositoriesSelected = []
        }
      });
    },
      
    }
  }
</script>

<style scoped>
</style>
