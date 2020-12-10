<template>
  <div>
    <h3>Considered Options</h3>

    <v-card v-if="mode === 'basic'" flat class="flex-grow-1 mx-0" style="min-width: 600px">
      <EditorMadrList :list="optionTitleList" @input="updateOptionTitles" @remove-item="removeOption"
        class="mx-0 px-0" />
    </v-card>

    <v-card v-else flat>
      <div v-for="(item, i) in adr.consideredOptions" :key="item.id">
        <drop @dragenter="(event) => moveOption(event.data, i)" class="my-0 py-0">

            <v-card flat :class="['my-1', activeOptions.includes(item) ? 'mb-8' : '']"
              :style="
                    draggedOption === item
                      ? {
                          borderLeft: '2px solid #1976D2',
                          marginLeft: '-2px',
                        }
                      : {}
              "
              @mouseenter="hoveredOption = item" @mouseleave="hoveredOption = null"
              >
              <!-- Title and Icons -->
                <v-card flat class="d-flex" :color="isChosenOption(item) ? 'light-green lighten-5' : 'transparent'">
                  <!-- Left Icons -->
                  <div flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 d-flex"
                    style="width: 64px; min-width: 64px">
                      <div class="mx-0 px-0 flex-grow-1 flex-shrink-1" style="min-width: 18px; width: 18px" >
                        <!-- Show the drag-icon (dots) when the option is hovered or dragged -->
                        <drag v-show="hoveredOption === item || draggedOption === item" 
                          :key="item.id" :data="item"
                          @dragstart="draggedOption = item"
                          @dragend="draggedOption = {}" >
                          <template v-slot:drag-image>{{ item.title }}</template> <!-- Show the title while dragging. -->
                          <v-icon> mdi-drag-vertical </v-icon>
                        </drag>
                        <!-- Else, show the chosen-option-icon, if it's the chosen option -->
                        <v-icon v-show="hoveredOption !== item && draggedOption !== item && isChosenOption(item)" 
                          color="success" class="pl-1">
                          mdi-check-decagram
                        </v-icon>
                        <!-- Else, show nothing, but reserve space -->
                        <v-icon v-show="hoveredOption !== item && draggedOption !== item && !isChosenOption(item)"></v-icon>
                      </div>

                    <!-- Icon for collapsed option -->
                    <v-btn v-show="!activeOptions.includes(item)" 
                      text class="mx-0 px-0 flex-grow-1 flex-shrink-1" style="min-width: 0" 
                      @click="activeOptions.push(item)">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                    <!-- Icon for expanded option -->
                    <v-btn v-show="activeOptions.includes(item)" 
                      text class="mx-0 px-0 flex-grow-1 flex-shrink-1" style="min-width: 0" 
                      @click="activeOptions = activeOptions.filter((val) => (val !== item))">
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                  </div>
                  <!-- Option Title -->
                  <codemirror :ref="'codemirror-' + item.id" class="my-0 py-0 mr-4 optiontitle" v-model="item.title"
                    color="grey lighten-2"></codemirror>
                  <!-- Right Icons -->
                  <div class="align-center flex-shrink-0 flex-grow-0  my-0 py-0">
                    <v-btn v-on:click="removeOption(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </v-card>

              <!-- Expandable Description -->
              <v-expand-transition>
                <div v-show="activeOptions.includes(item)" class="pl-12">
                  <h6 class="py-4 pl-4"> Description </h6>
                  <div class="pb-2 ml-4" style="margin-right: 80px">
                    <codemirror hint="Description of the option" v-model="item.description" color="grey lighten-3">
                    </codemirror>
                  </div>

                  <div class="d-flex flex-wrap mx-0 px-0 pb-4 py-0 my-0">
                    <div class="flex-grow-1 mx-0 px-0 py-0 my-0" style="width: 50%; min-width: 600px">
                      <h6 class="py-4 pl-4"> Good, because ... </h6>
                      <EditorMadrList :list="item.pros" class="ml-4 mr-0 px-0" cm-color="grey lighten-3" />

                    </div>
                    <div class="flex-grow-1 mx-0 px-0 py-0 my-0" style="width: 50%; min-width: 600px">
                      <h6 class="py-4 pl-4"> Bad, because ... </h6>
                      <EditorMadrList :list="item.cons" class="ml-4 mr-0 px-0" cm-color="grey lighten-3" />
                    </div>
                  </div>
              <v-divider />
                </div>
              </v-expand-transition>
            </v-card>
        </drop>
      </div>

      <!-- Last Item with '+'-Button -->
      <v-card class="my-1" flat :key="adr.consideredOptions.length">
        <v-card flat class="d-flex">
          <v-card flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0" style="width: 64px; min-width:50px">
          </v-card>
          <codemirror :ref="'codemirror-' + adr.consideredOptions.length" class="my-0 py-0 mr-4 optiontitle"
            color="grey lighten-2" v-model="lastItem" @blur="addLastItemToOptions">
          </codemirror>
          <div class="align-center flex-shrink-0 flex-grow-0  my-0 py-0">
            <v-btn v-on:click="addLastItemToOptions">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-card>

    </v-card>
  </div>
</template>

<script>
  import { ArchitecturalDecisionRecord } from '@/plugins/classes'
  import codemirror from './TheEditorMadrCodemirror.vue'
  import EditorMadrList from './TheEditorMadrList.vue'
  import { Drag, Drop } from 'vue-easy-dnd'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror,
      EditorMadrList,
      Drag, Drop
    },
    props: {
      adr: {
        type: ArchitecturalDecisionRecord
      },
      mode: {
        type: String
      }
    },
    data: () => ({
      lastItem: '',
      activeOptions: [], // Expanded options
      hoveredOption: null, // Option, which the mouse hovers over (relevant to e.g. show Icons on hover)
      draggedOption: null, // Option, which is currently dragged (relevant to e.g. show Icons on hover)
    }),
    computed: {
      optionTitleList() {
        return this.adr.consideredOptions.map((opt) => (opt.title))
      }
    },
    watch: {},
    mounted() {
    },
    methods: {
      scrollTo(target) {
        this.$emit('scroll-to', target)
      },

      /**Used in Drag'n'Drop
       */
      insertOption(event) {
        this.adr.consideredOptions.splice(event.index, 0, event.data);
      },

      /**
       * Moves the option to another index.
       * Requires the option to be already contained in the list of options.
       */
      moveOption(option, newIndex) {
        if (this.adr.consideredOptions.includes(option)) {
          this.adr.consideredOptions.splice(this.adr.consideredOptions.indexOf(option), 1)
          this.adr.consideredOptions.splice(newIndex, 0, option);
        }
      },

      addLastItemToOptions() {
        if (this.lastItem.trim() !== '') {
          this.adr.addOption({ title: this.lastItem });
          this.lastItem = ''
        }
      },

      /** Put option titles in option list of ADR. 
       * When in basic mode and only option titles are shown, this method is used to update the ADR solely based on the option titles. 
       * @param {string[]} titleList
       */
      updateOptionTitles(titleList) {
        if (titleList.length < this.adr.consideredOptions.length) { // An item was removed.
          this.adr.consideredOptions.filter((opt) => (titleList.includes(opt.title)))
        } else {
          titleList.forEach((val, idx) => {
            if (idx < this.adr.consideredOptions.length) {
              this.adr.consideredOptions[idx].title = val
            } else {
              this.adr.addOption({ title: val })
            }
          });
        }
      },
      /** Remove the option. 
       * @param {object} option
       * @param {int} idx
       */
      removeOption(option, idx) {
        if (idx) {
          this.adr.consideredOptions.splice(idx, 1)
        } else {
          this.adr.consideredOptions.splice(this.adr.consideredOptions.indexOf(option), 1)
        }
      },
      /** 
       * @param {object} option - an option object (i.e. has the attribute 'title') 
       * @returns true iff the option is the chosen option
       */
      isChosenOption(option) {
        return this.adr.decisionOutcome.chosenOption === option.title && this.adr.decisionOutcome.chosenOption !== ''
      }
    }
  };
</script>

<style>
  .optiontitle .CodeMirror * {
    font-family: Arial, monospace;
    font-weight: bold;
  }
</style>