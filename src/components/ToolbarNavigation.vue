<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="align-self-center ml-4"
             dark text
             v-bind="attrs"
             v-on="on">
        <v-icon>mdi-hamburger</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item link
                   v-for="opt in consideredOptions"
                   :key="opt.title">
        <v-list-item-title v-text="opt.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    components: {},
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
      logNotImplemented() {
        console.log('Not implemented.')
      },
    }
  };
</script>

<style scoped>
</style>
