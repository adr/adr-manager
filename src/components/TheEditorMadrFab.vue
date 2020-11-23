<template>
  <v-menu ref="menu"
          v-model="navigatorMenu"
          transition="scale-transition-y"
          offset-y
          open-on-hover
          max-width="300px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="primary"
             absolute
             fab
             right
             v-bind="attrs"
             v-on="on">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item v-on:click="scrollTo(0)">
        <v-list-item-title>
          Scroll to top
        </v-list-item-title>
        <v-list-item-icon><v-icon>mdi-chevron-up</v-icon></v-list-item-icon>
      </v-list-item>

      <v-list-item v-for="(opt, i) in options" v-bind:key="i" v-on:click="scrollTo('#considered-option-' + i)">
        <v-list-item-title v-text="opt.title" />
        <!--<v-list-item-icon><v-icon v-text="i+1" /></v-list-item-icon>-->
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'EditorMadrFab',
    props: {
      options: {
        type: Array,
        default: () => ([])
      }
    },
    data: () => ({
      navigatorMenu: false
    }),
    methods: {
      scrollTo(target) {
        this.$emit('scroll-to', target)
      },
    }
  };
</script>

<style scoped>
</style>
