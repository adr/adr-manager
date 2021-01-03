<template>
  <v-dialog
    v-bind:value="showDialog"
    v-on:input="
      (value) => {
        showDialog = value;
        $emit('input', value);
      }
    "
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs"> </slot>
    </template>
    <v-card>
      <v-card-title>
        <div>
          <v-avatar color="primary" size="35">
            <v-icon dark>mdi-folder-remove</v-icon></v-avatar
          >
          <span class="dialogTitle"> Remove Repository</span>
        </div>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <div>
          Are you sure you want to remove '{{ repo.name }}'? Your changes will
          be deleted!
        </div>
        You can always add it again using the 'Add Repository' button.
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn data-cy="removeRepoBtn" text color="success" @click="removeRepo"> Remove </v-btn>
        <v-btn text color="error" @click="showDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EditorRemoveRepo",
  props: {
    // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    repo: {
      type: Object,
      required: false,
      default: () => ({ name: "this Repository" })
    }
  },
  data: () => ({
    showDialog: false
  }),
  watch: {
    value() {
      this.dialog = this.value;
    }
  },
  methods: {
    removeRepo() {
      this.$emit("remove-repo");
      this.showDialog = false;
    }
  }
};
</script>

<style scoped>
</style>