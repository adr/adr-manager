<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="align-self-center ml-4" dark text v-bind="attrs" v-on="on">
        Mode
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-on:click="setMode('basic')">
        <v-list-item-title>Basic</v-list-item-title>
      </v-list-item>
      <v-list-item v-on:click="setMode('advanced')">
        <v-list-item-title>Advanced</v-list-item-title>
      </v-list-item>
      <v-list-item v-on:click="setMode('professional')">
        <v-list-item-title>Professional</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { store } from '@/plugins/store.js'

  export default {
    name: 'MenuMode',
    components: {
    },
    data: () => ({
    }),
    props: {
      consideredOptions: {
        type: Array, // Array
        required: false,
        default: () => ([])
      }
    },
    created() {
    },
    methods: {
      setMode(mode) {
        store.setMode(mode)
      }
    }
  };
</script>

<style scoped>
</style>