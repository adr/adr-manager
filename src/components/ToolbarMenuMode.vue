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
        <v-list-item  v-on:click="$emit('switch-mode', 'basic')">
          <v-list-item-title>Basic</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="$emit('switch-mode', 'advanced')">
          <v-list-item-title>Advanced</v-list-item-title>
        </v-list-item>
        <v-list-item v-on:click="$emit('switch-mode', 'pro')">
          <v-list-item-title>Pro</v-list-item-title>
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
      default: () => ([]),
    },
  },
  created() {
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
