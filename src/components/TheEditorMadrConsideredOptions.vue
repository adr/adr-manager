<template>
  <div>

    <h3>Considered Options</h3>
    <v-list class="mb-4">
      <v-list-item dense
                   v-for="(option, i) in adr.consideredOptions"
                   :key="i">
        <v-list-item-icon>
          <v-btn style="min-width: 36px; width: 36px;" text @click="scrollTo('#considered-option-' + i)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-list-item-icon>
        <codemirror v-model="option.title"></codemirror>
        <v-list-item-icon>
          <v-btn v-on:click="adr.consideredOptions.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-btn v-on:click="adr.addOption()"><v-icon>mdi-plus</v-icon></v-btn>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror,
    },
    props: ['adr'],
    data: () => ({
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
