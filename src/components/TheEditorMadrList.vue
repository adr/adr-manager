<!-- List of Codemirror-Items and Add/Delete-Buttons. Used in the sections: Consequences, Links, Pros and Cons -->
<template>
  <v-list class="my-0 py-0" color="rgb(255,255,255,0)">
    <v-list-item dense class="align-self-center mx-0 px-0" v-for="(item, i) in list" :key="i">
      <codemirror v-model="list[i]" @input="$emit('input', list)" :color="cmColor"></codemirror>

      <!-- Show a delete icon next to all items exccept the last. Show the add icon next to the last. -->
      <v-list-item-icon class="align-center flex-shrink-0">
        <v-btn v-on:click="list.splice(i, 1); $emit('remove-item', item, i)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item-icon>
    </v-list-item>

    <!-- last item with '+'-Button -->
    <v-list-item dense class="align-self-center mx-0 px-0" :key="list.length">
      <codemirror v-model="lastItem" :color="cmColor" @blur="addItemIfNotEmpty"></codemirror>

      <!-- Show the add icon next to the last. -->
      <v-list-item-icon class="align-center flex-shrink-0">
        <v-btn v-on:click="addItem">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
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
      cmColor: {
        type: String,
      }
    },
    data: () => ({
      lastItem: ''
    }),
    watch: {},
    mounted() {
    },
    methods: {
      addItemIfNotEmpty() {
        if (this.lastItem.trim() !== '') {
          this.addItem()
        }
      },
      addItem() {
        this.list.push(this.lastItem);
        this.lastItem = '';
        this.$emit('input', this.list)
      }
    }
  };
</script>

<style scoped>
</style>