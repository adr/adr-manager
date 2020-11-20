<template>
  <v-dialog v-bind:value="showDialog"
            v-on:input="(value) => { showDialog = value; $emit('input', value) }"
            width="600px">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Add Repositories
      </v-card-title>

      <v-card-text>
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

      <v-divider></v-divider>
      <v-card-actions>
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
  import { loadRepositories } from '@/plugins/api.js'

  export default {
    name: 'EditorAddRepositoryDialog',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
    data: () => ({
      showDialog: false,
      repositoriesDisplayed: [],
      repositoriesSelected: []
    }),
    watch: {
      showDialog(newValue) {
        if (newValue ===  true) { // If the window is opened.
          this.loadRepositories();
        }
      }
    },
    mounted() {},
    methods: {
      loadRepositories() {
        loadRepositories().then((res) => {
            console.log(res.data);
            this.repositoriesDisplayed = res.data.map((el) => ({ name: el.full_name, description: el.description, repoData: el }))
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
      addRepositories() {
        this.$emit('add-repositories', this.repositoriesSelected.map((el) => (el.repoData)))
      },
      
    }
  }
</script>

<style scoped>
</style>
