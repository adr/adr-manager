<template>
  <div>
    <h3>Considered Options</h3>
    <v-list class="mb-4">
      <v-list-item dense
                   v-for="(option, i) in adr.consideredOptions"
                   :key="i">
        <v-list-item-icon  class="align-center flex-shrink-0 px-0">
          <v-btn v-show="option.title !== ''" text style="min-width: 36px; width: 36px;" @click="scrollTo('#considered-option-' + i)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-list-item-icon>
        <codemirror v-model="option.title"></codemirror>

        <v-list-item-icon v-show="i < adr.consideredOptions.length" class="align-center flex-shrink-0">
          <v-btn v-show="i < adr.consideredOptions.length - 1" 
            v-on:click="adr.consideredOptions.splice(i, 1)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn v-show="i >= adr.consideredOptions.length - 1" 
            v-on:click="adr.addOption()"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item-icon>
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
    mounted() {
      if(this.adr.consideredOptions.length === 0) {
          console.log('Update Considered Options', this.adr);
          this.adr.addOption();
        }
    },
    beforeUpdate() {
        if(this.adr.consideredOptions.length === 0) {
          console.log('Update Considered Options', this.adr);
          this.adr.addOption();
        }
    },
    methods: {
      scrollTo(target) {
        this.$emit('scroll-to', target)
      },
    }
  };
</script>

<style scoped>
</style>
