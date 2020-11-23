<!-- List of Codemirror-Items and Add/Delete-Buttons. Used in the sections: Consequences, Links, Pros and Cons -->
<template>
      <v-list>
        <v-list-item dense class="align-self-center"
                     v-for="(item, i) in list"
                     :key="i">
          <codemirror v-model="list[i]"  @input="$emit('input', list)"></codemirror>

          <!-- Show a delete icon next to all items exccept the last. Show the add icon next to the last. -->
          <v-list-item-icon class="align-center flex-shrink-0">
            <v-btn v-show="i < list.length - 1" 
              v-on:click="list.splice(i, 1)">
                  <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn v-show="i >= list.length - 1" 
              v-on:click="list.push('')"><v-icon>mdi-plus</v-icon></v-btn>
            </v-list-item-icon>
        </v-list-item>
      </v-list>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'

  export default {
    name: 'EditorMadrList',
    components: {
      codemirror,
    },
    props: {
      list: {
        type: Array,
        default: () => ([''])
      },
    },
    data: () => ({
    }),
    mounted() {
      // force that there is at least one list in the list (otherwise 'Add'-Button is not displayed.)
      if (this.list.length === 0) {
        this.list.push('')
      }
    },
    beforeUpdate() {
      if (this.list.length === 0) {
        this.list.push('')
      }
    },
  };
</script>

<style scoped>
</style>
