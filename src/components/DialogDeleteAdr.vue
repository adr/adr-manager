<template>
  <v-dialog v-bind:value="showDialog" v-on:input="(value) => { showDialog = value; $emit('input', value) }"
    width="600px">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs">
      </slot>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2 warning">
        Delete ADR
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete '{{ adr.name }}'?
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="deleteAdr" class="warning">
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
    name: 'EditorDeleteAdr',
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
      deleteAdr() {
        console.log('Sorry, I can\'t delete ', this.adr, '. Deleting an ADR is not implemented.')
        this.showDialog = false
      }
    }
  }
</script>

<style scoped>
</style>