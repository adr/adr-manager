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
        Commit changes
      </v-card-title>

      <v-card-text>
        The following files were changed:
        <ul>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
        </ul>
        Do you want to push to a new branch?
        <v-switch v-model="pushToNewBranch">
          <template v-slot:label>
            <div>
              <div>
                <div v-if="pushToNewBranch"> Push to new branch '{{ currentBranch }}-adr-update'.</div>
                <div v-else>Push to {{ currentBranch }}.</div>
              </div>
            </div>
          </template>
        </v-switch>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="() => { showDialog = false; $emit('commit') }">
          Commit and push!
        </v-btn>
        <v-btn @click="showDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'EditorAddRepositoryDialog',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: false,
      },
      currentBranch: {
        type: String,
        required: false,
        default: 'master',
      },
    },
    data: () => ({
      showDialog: false,
      organization: '',
      pushToNewBranch: false,
    }),
    watch: {
      value() {
        this.dialog = this.value;
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
