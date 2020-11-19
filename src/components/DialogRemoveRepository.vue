<template>
  <v-dialog v-bind:value="showDialog"
            v-on:input="(value) => { showDialog = value; $emit('input', value) }"
            width="600px">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2 warning">
        Remove Repository
      </v-card-title>

      <v-card-text>
        <div>
          Are you sure you want to remove '{{ repo.name }}'?
        </div>
        You can always add it again using the 'Add Repository' button.
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="removeRepo">
          Remove
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
    name: 'EditorDeleteAdr',
    props: {
      // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
      value: {
        type: Boolean,
        required: false,
        default: false,
      },
      repo: {
        type: Object,
        required: false,
        default: () => ({ name: 'this Repository' }),
      },
    },
    data: () => ({
      showDialog: false,
    }),
    watch: {
      value() {
        this.dialog = this.value;
      }
    },
    methods: {
      removeRepo() {
        console.log('Sorry, I can\'t remove ', this.repo  , '. Deleting an ADR is not implemented.')
        this.showDialog = false
      }
    }
  }
</script>

<style scoped>
</style>
