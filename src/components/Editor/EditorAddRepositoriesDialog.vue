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
          <v-list>
            <v-list-item-group v-model="repositoriesSelected"
                               multiple>
              <v-virtual-scroll :items="repositoriesDisplayed"
                                :itemHeight="'48px'"
                                height="300" v-model="repositoriesSelected"
                               multiple>
                <template v-slot:default="{ item, index }">
                  <v-divider v-if="!item"
                             :key="`divider-${index}`"></v-divider>

                  <v-list-item v-else
                              class="my-0 py-0"
                               :key="`item-${index}`"
                               :value="item">
                    <template v-slot:default="{ active }">

                      <v-list-item-content
                              class="my-0 py-0">
                        <v-list-item-title v-text="item.name"></v-list-item-title>
                        <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <v-checkbox :input-value="active"
                                    color="deep-purple accent-4"></v-checkbox>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-virtual-scroll>
            </v-list-item-group>
          </v-list>
        </v-card-text>

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
      repositoriesSelected: []
    }),
    watch: {
      value() {
        this.dialog = this.value;
      }
    },
    methods: {
      loadRepositoriesOf(organization) {
        return loadRepositoriesOfUser(organization)
          .then((data) => {
            this.repositoriesDisplayed = data.map((el) => ({ name: el.name, description: el.description }))
          })
      },
      addRepositories() {
        this.$emit('add-repositories', this.repositoriesSelected)
      }
    }
  }
</script>

<style scoped>
</style>
