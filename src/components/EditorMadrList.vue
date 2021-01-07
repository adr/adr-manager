<!-- List of Codemirror-Items and Add/Delete-Buttons. Used in the sections: Consequences, Links, Pros and Cons -->
<template>
  <v-list class="my-0 py-0">
    <v-list-item dense class="align-self-center mx-0 px-0 d-flex" v-for="(item, idx) in displayedList" :key="item.id">
      <v-hover v-slot="{ hover }">
        <drop @dragenter="(event) => moveItem(event.data.id, idx)" class="my-0 py-0 flex-grow-1">
          <v-card flat class="d-flex" :style="
                    draggedItem === item
                      ? {
                          borderLeft: '2px solid #1976D2',
                          marginLeft: '-2px',
                        }
                      : {}
              " min-height="36px" @mouseenter="hoveredItem = item" @mouseleave="hoveredItem = null">

            <!-- Left Icon for dragging -->
            <div flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 mx-0 d-flex"
              style="width: 32px; min-width: 32px">
              <!-- Show the drag-icon (dots) when the item is hovered or dragged -->
              <drag v-show="hoveredItem === item || draggedItem === item" :data="item" @dragstart="draggedItem = item"
                @dragend="draggedItem = null" class="flex-grow-1">
                <template v-slot:drag-image>{{ item.content }}</template> <!-- Show the title while dragging. -->
                <v-icon> mdi-drag-vertical </v-icon>
              </drag>
              <!-- Else, show nothing, but reserve space -->
              <v-icon v-show="hoveredItem !== item && draggedItem !== item"></v-icon>
            </div>

            <!-- Text field -->
            <v-card flat class="flex-grow-1">
              <codemirror :ref="'codemirror-' + item.id" v-model="list[idx]" @input="$emit('input', list)" :color="cmColor"
                @blur="removeItemIfEmptyAt(idx)">
              </codemirror>
            </v-card>

            <!-- Delete Icon on the right. -->
            <v-list-item-icon v-show="hover" class="align-center flex-shrink-0 flex-grow-0">
              <v-btn icon v-on:click="removeItemAt(idx)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-card>
        </drop>
      </v-hover>
    </v-list-item>

    <!-- last item with '+'-Button -->
    <v-list-item dense class="align-self-center mx-0 px-0 d-flex" :key="-list.length - 2">
      <!-- Reserve space to fit the drag icon indent -->
      <div class="align-center flex-shrink-0 flex-grow-0 my-0 py-0" style="width: 32px; min-width: 32px">
      </div>

      <codemirror :ref="'last-cm'" v-model="lastItem" :color="cmColor" @input="addItemIfNotEmpty"></codemirror>

    </v-list-item>
  </v-list>
</template>

<script>
  import codemirror from './EditorMadrCodemirror.vue'
  // import _ from 'lodash'
  import { Drag, Drop } from 'vue-easy-dnd'

  export default {
    name: 'EditorMadrList',
    components: {
      codemirror,
      Drag, Drop
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
      lastItem: '',
      displayedList: [],
      hoveredItem: null, // Item, which the mouse hovers over (relevant to e.g. show Icons on hover)
      draggedItem: null, // Item, which is currently dragged
    }),
    watch: {
      displayedList(newDisplayedList) {
        this.list.length = this.displayedList.length;
        for (let i = 0; i < this.list.length; i++) {
          this.list[i] = newDisplayedList[i].content;
        }
      },
      list(newList) {
        if (this.displayedList.length > newList.length) {
          this.displayedList.length = newList.length;
        }
        for (let i = 0; i < newList.length; i ++) {
          if (i < this.displayedList.length) {
            this.displayedList[i].content = newList[i];
          } else {
            this.displayedList.push({ content: newList[i], id: Math.max(...this.displayedList.map((item) => item.id), 0) + 1 });
          }
        }
      }
    },
    mounted() {
      this.displayedList = this.list.map((str, idx) => ({
        content: str,
        id: idx
      }))
    },
    methods: {
      addItemIfNotEmpty() {
        if (this.lastItem.trim() !== '') {
          this.addItem();
          this.$nextTick(() => {
            this.$refs["codemirror-" + this.displayedList[this.displayedList.length - 1].id][0].focus();
          });
        }
      },

      addItem() {
        let item = { content: this.lastItem, id: Math.max(...this.displayedList.map((item) => item.id), 0) + 1 };
        this.displayedList.push(item);
        this.lastItem = "";
        this.$emit("input", this.displayedList.map((el) => (el.content)));
        return item;
      },

      /**Removes the item at the specifie index.
       * 
       * @param {number} idx - the index of the item to remove
       */
      removeItemIfEmptyAt(idx) {
        if (this.displayedList[idx].content.trim() === "") {
          this.removeItemAt(idx);
        }
      },

      removeItemAt(idx) {
        let item = this.displayedList.splice(idx, 1);
        this.$emit('remove-item', item, idx);
      },

      /**
       * Moves the item at inde oldIndex to the new index.
       */
      moveItem(id, newIndex) {
        if (typeof newIndex === 'number' && this.displayedList.find((el) => (el.id === id))) {
          let oldIndex = this.displayedList.findIndex((el) => (el.id === id));
          let item = this.displayedList[oldIndex];
          this.displayedList.splice(oldIndex, 1);
          this.displayedList.splice(newIndex, 0, item);
        }
      },

    }
  };
</script>

<style scoped>
</style>