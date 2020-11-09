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
        Delete ADR
      </v-card-title>

      <v-card-text>
        Do you really want to delete the ADR '{{ adr.name }}'?

      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="showDialog = false">
          Delete
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
      adr: {
        type: Object,
        required: false,
        default: () => ({ name: 'ADR-XXXX Add Status Field' }),
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
    }
  }
</script>

<style scoped>
</style>
