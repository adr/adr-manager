<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="align-self-center ml-4"
               dark text
               v-bind="attrs"
               v-on="on">
          Mode
        </v-btn>
      </template>
      <v-list>
        <v-list-item  v-on:click="switchMode('basic')">
          <v-list-item-title>Basic</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="switchMode('advanced')">
          <v-list-item-title>Advanced</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="switchMode('professional')">
          <v-list-item-title>Professional</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
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
      switchMode(mode) {
        if (['basic', 'advanced', 'professional'].includes(mode)) { // Double-check that passed mode is valid.
          localStorage.setItem('mode', mode)
          this.$emit('switch-mode', mode)
        } else {
          console.log('Error in Mode Selection')
        }
      }
    }
  };
</script>

<style scoped>
</style>
