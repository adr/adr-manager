<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="align-self-center ml-4"
               dark text
               v-bind="attrs"
               v-on="on">
          File
        </v-btn>
      </template>
      <v-list>
        <DialogCommit width="500"
          v-on:commit="(ev) => { $emit('commit', ev) }">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item v-bind="attrs"
                         v-on="on">
              Commit and Push
            </v-list-item>
          </template>
        </DialogCommit>
        <v-list-item v-on:click="$emit('create-adr')">
          <v-list-item-title>
            Create new ADR
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-on:click="$emit('delete-adr')">
          <v-list-item-title>
            Delete ADR
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
import DialogCommit from './DialogCommit.vue';

export default {
  name: 'MenuFile',
  components: {
    DialogCommit,
  },
  data: () => ({
  }),
  props: {},
  created() {
  },
  methods: {
    logNotImplemented() {
      console.log('Not implemented.');
    },
  },
};
</script>

<style scoped>
</style>
