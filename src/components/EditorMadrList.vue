<!-- List of Codemirror-Items and Add/Delete-Buttons. Used in the sections: Consequences, Links, Pros and Cons -->
<template>
  <v-list class="my-0 py-0">
    <v-list-item dense class="align-self-center mx-0 px-0 d-flex" v-for="(item, idx) in displayedList" :key="item.id">

      <drop @dragenter="(event) => moveItem(event.data.id, idx)" class="my-0 py-0 flex-grow-1">
        <v-card flat class="d-flex" :style="
                  draggedItem === item
                    ? {
                        borderLeft: '2px solid #1976D2',
                        marginLeft: '-2px',
                      }
                    : {}
            " @mouseenter="hoveredItem = item" @mouseleave="hoveredItem = null">

          <!-- Left Icon for dragging -->
          <div flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 mx-0 d-flex"
            style="width: 32px; min-width: 32px">
            <!-- Show the drag-icon (dots) when the item is hovered or dragged -->
            <drag v-show="hoveredItem === item || draggedItem === item" :data="item"
              @dragstart="draggedItem = item" @dragend="draggedItem = null" class="flex-grow-1">
              <template v-slot:drag-image>{{ item.content }}</template> <!-- Show the title while dragging. -->
              <v-icon> mdi-drag-vertical </v-icon>
            </drag>
            <!-- Else, show nothing, but reserve space -->
            <v-icon v-show="hoveredItem !== item && draggedItem !== item"></v-icon>
          </div>

          <!-- Text field -->
          <v-card flat class="flex-grow-1">
            <codemirror :ref="'cm-' + idx" v-model="list[idx]" @input="$emit('input', list)" :color="cmColor" @blur="removeItemIfEmptyAt(idx)">
            </codemirror>
          </v-card>

          <!-- Delete Icon on the right. -->
          <v-list-item-icon class="align-center flex-shrink-0">
            <v-btn v-on:click="removeItemAt(idx)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-card>
      </drop>
    </v-list-item>

    <!-- last item with '+'-Button -->
    <v-list-item dense class="align-self-center mx-0 px-0 d-flex" :key="-list.length - 1">
      <!-- Reserve space to fit the drag icon indent -->
      <div class="align-center flex-shrink-0 flex-grow-0 my-0 py-0"
            style="width: 32px; min-width: 32px">
      </div>

      <codemirror :ref="'last-cm'" v-model="lastItem" :color="cmColor" @input="addItemIfNotEmpty"></codemirror>

      <!-- Place holder for delete button -->
      <v-list-item-icon class="align-center flex-shrink-0" style="width: 64px">
      </v-list-item-icon>
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
        console.log("Displayed List", this.displayedList);
        console.log("Changed List", this.list);
        this.displayedList = newList.map((str, idx) => ({
          content: str,
          id: idx
        }))
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
          console.log("Add if not empty 1");
        if (this.lastItem.trim() !== '') {
          console.log("Add if not empty 2");
          this.addItem();
          this.$nextTick(() => {
            this.$refs["cm-" + (this.list.length - 1)][0].focus();
          });
        }
      },

      addItem() {
        console.log("Last item", this.lastItem);
        this.displayedList.push({ content: this.lastItem, id: Math.max(...this.displayedList.map((item) => item.id), 0) + 1 });
        this.lastItem = "";
        this.$emit("input", this.displayedList.map((el) => (el.content)));
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
          console.log("List: ", this.displayedList);
          console.log("Dragged Item", this.draggedItem);
          console.log("Id", id);
          let oldIndex = this.displayedList.findIndex((el) => (el.id === id));
          let item = this.displayedList[oldIndex];
          console.log("Dragged Item", item);
          this.displayedList.splice(oldIndex, 1);
          this.displayedList.splice(newIndex, 0, item);
        }
      },

    }
  };
</script>

<style scoped>
</style>