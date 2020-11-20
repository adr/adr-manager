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
        <v-combobox label="Organization"
                    :items="organizations"
                    v-model="organization"
                    @input="loadRepositoriesOf" />
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
  import { loadRepositoriesOfUser } from '@/plugins/utilities.js'
  export default {
    name: 'EditorAddRepositoryDialog',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: false,
      },
      organizations: {
        type: Array,
        required: false,
        default: () => (['adr', 'JabRef']),
      },
    },
    data: () => ({
      showDialog: false,
      organization: '',
      repositoriesDisplayed: [],
      repositoriesSelected: [],
      reposPath: "http://localhost:5000/repos",
    }),
    watch: {
      value() {
        this.dialog = this.value;
      }
    },
    created() {
      loadRepositories()
    }
    methods: {
      /*loadRepositoriesOf(organization) {
        return loadRepositoriesOfUser(organization)
          .then((data) => {
            this.repositoriesDisplayed = data.map((el) => ({ name: el.name, description: el.description }))
          })
      },*/
      addRepositories() {
        this.$emit('add-repositories', this.repositoriesSelected)
      }
      
      loadRepositories() {
        axios
          .post(this.reposPath)
          .then((res) => {
            console.log(res.data);
            this.repositoriesDisplayed = res.data.map((el) => ({ name: el.name, description: el.description }))
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },
    }
  }
</script>

<style scoped>
</style>
