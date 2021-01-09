<template>
  <div data-cy="considerOptTextAdr">
    <h3>Considered Options</h3>
    <!-- Display an alert when there are pros and cons of options in basic mode. -->
    <v-alert v-if="isModeTooLow" border="left" colored-border type="warning" elevation="2" class="my-4 py-2">
      <div class="d-flex my-0 py-0">
        <span class="flex-grow-1 align-self-center my-0 py-0">
          Some options have a more detailed description that is not displayed in Basic Mode.
        </span>
        <v-btn class="justify-self-end align-self-end my-0 py-0" @click="switchToAdvancedMode()">
          Switch to Advanced Mode
        </v-btn>
      </div>
    </v-alert>

    <v-list v-if="mode === 'basic'" class="my-0 py-0">
      <v-list-item dense class="align-self-center mx-0 px-0 d-flex" v-for="(item, idx) in adr.consideredOptions"
        :key="item.id">

        <drop @dragenter="(event) => moveOption(event.data, idx)" class="my-0 py-0 flex-grow-1">
          <v-card flat class="d-flex" :style=" draggedOption === item ? {
                          borderLeft: '2px solid #1976D2',
                          marginLeft: '-2px',
                        }
                      : {}
              " :color="isChosenOption(item) ? 'light-green lighten-5' : 'transparent'"
            @mouseenter="hoveredOption = item" @mouseleave="hoveredOption = null">

            <!-- Left Icon for dragging -->
            <div data-cy="checkConsOptAdr" flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 mx-0 d-flex"
              style="width: 32px; min-width: 32px">
              <!-- Show the drag-icon (dots) when the item is hovered or dragged -->
              <drag v-show="hoveredOption === item || draggedOption === item" :data="item"
                @dragstart="draggedOption = item" @dragend="draggedOption = null" class="flex-grow-1">
                <template v-slot:drag-image>{{ item.content }}</template> <!-- Show the title while dragging. -->
                <v-icon> mdi-drag-vertical </v-icon>
              </drag>
              <!-- Else, show the chosen-option-icon, if it's the chosen option -->
              <v-icon v-show="hoveredOption !== item && draggedOption !== item && isChosenOption(item)" color="success"
                class="pl-1">
                mdi-check-decagram
              </v-icon>
              <!-- Else, show nothing, but reserve space -->
              <v-icon v-show="hoveredOption !== item && draggedOption !== item && !isChosenOption(item)"></v-icon>
            </div>

            <!-- Text field -->
            <v-card flat class="flex-grow-1">
              <codemirror :ref="'codemirror-' + item.id" v-model="item.title">
              </codemirror>
            </v-card>

            <!-- Delete Icon on the right. -->
            <v-list-item-icon v-show="hoveredOption === item" class="align-center flex-shrink-0">
              <v-btn icon v-on:click="removeOption(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-card>
        </drop>
      </v-list-item>

      <!-- last item with '+'-Button -->
      <v-list-item dense class="align-self-center mx-0 px-0 d-flex" :key="adr.highestOptionId">
        <!-- Reserve space to fit the drag icon indent -->
        <div class="align-center flex-shrink-0 flex-grow-0 my-0 py-0" style="width: 32px; min-width: 32px">
        </div>

        <codemirror v-model="lastItem" @input="addLastItemIfNotEmpty()"></codemirror>

      </v-list-item>
    </v-list>

    <!-- Advanced and professional mode -->
    <v-card data-cy="consOptPro" v-else flat>

      <div v-for="(item, i) in adr.consideredOptions" :key="item.id">
        <drop @dragenter="(event) => moveOption(event.data, i)" class="my-0 py-0">
          <v-card flat :class="['my-1', expandedOptions.includes(item) ? 'mb-8' : '']" :style="
                    draggedOption === item
                      ? {
                          borderLeft: '2px solid #1976D2',
                          marginLeft: '-2px',
                        }
                      : {}
              " @mouseenter="hoveredOption = item" @mouseleave="hoveredOption = null">
            <!-- Title and Icons -->
            <v-card flat class="d-flex" :color="isChosenOption(item) ? 'light-green lighten-5' : 'transparent'"
              min-height="36px">
              <!-- Left Icons -->
              <div flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 d-flex"
                style="width: 32px; min-width: 32px">
                <div class="mx-0 px-0 flex-grow-1 flex-shrink-1" style="min-width: 18px; width: 18px">
                  <!-- Show the drag-icon (dots) when the option is hovered or dragged -->
                  <drag v-show="hoveredOption === item || draggedOption === item" :key="item.id" :data="item"
                    @dragstart="draggedOption = item" @dragend="draggedOption = {}">
                    <template v-slot:drag-image>{{ item.title }}</template> <!-- Show the title while dragging. -->
                    <v-icon> mdi-drag-vertical </v-icon>
                  </drag>
                  <!-- Else, show the chosen-option-icon, if it's the chosen option -->
                  <v-icon data-cy="checkConsOptAdr" v-show="hoveredOption !== item && draggedOption !== item && isChosenOption(item)"
                    color="success" class="pl-1">
                    mdi-check-decagram
                  </v-icon>
                  <!-- Else, show nothing, but reserve space -->
                  <v-icon v-show="hoveredOption !== item && draggedOption !== item && !isChosenOption(item)"></v-icon>
                </div>
              </div>


              <!-- Option Title -->
              <div class="flex-grow-1 d-flex">
                <codemirror v-if="editedOptions.includes(item)" :ref="'codemirror-' + item.id"
                  :class="[ 'my-0', 'py-0', 'mr-4']" v-model="item.title">
                </codemirror>
                <button v-else class="flex-grow-1 text-left" @click="toggleExpansionOfOption(item)">
                  <div v-if="!expandedOptions.includes(item)">
                    <span v-text="item.title"></span>
                  </div>
                  <div v-else>
                    <h6 class="mb-0" v-text="item.title"></h6>
                  </div>
                </button>
                <!--<h6 class="flex-grow-1 align-self-center" v-text="item.title"></h6>-->
              </div>

              <!-- Right Icons -->
              <div v-show="hoveredOption === item || editedOptions.includes(item)"
                class="align-center flex-shrink-0 flex-grow-0 my-0 py-0" style="position: absolute right;">
                <v-btn icon class="mx-0 px-0 flex-grow-0 flex-shrink-0" @click="toggleEditingOfOption(item)">
                  <v-icon v-if="editedOptions.includes(item)">mdi-check</v-icon>
                  <v-icon v-else>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon class="mx-1" v-on:click="removeOption(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>

              <!-- Icon for expanding -->
              <div flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 d-flex"
                style="width: 32px; min-width: 32px">
                <v-btn v-show="!expandedOptions.includes(item)" text class="mx-0 px-0 flex-grow-1 flex-shrink-1"
                  style="min-width: 0" @click="expandedOptions.push(item)">
                  <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
                <v-btn v-show="expandedOptions.includes(item)" text class="mx-0 px-0 flex-grow-1 flex-shrink-1"
                  style="min-width: 0" @click="expandedOptions = expandedOptions.filter((val) => (val !== item))">
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>

            <!-- Expandable Description -->
            <v-expand-transition>
              <div v-show="expandedOptions.includes(item)" class="pl-12">
                <h6 class="py-4 pl-4"> Description </h6>
                <div class="pb-2 ml-4">
                  <codemirror data-cy="descriptionConsOpt" hint="Description of the option" v-model="item.description" color="grey lighten-3">
                  </codemirror>
                </div>

                <div class="d-flex flex-wrap mx-0 px-0 pb-4 py-0 my-0">
                  <div class="flex-grow-1 mx-0 px-0 py-0 my-0" style="width: 50%; min-width: 600px">
                    <h6 class="py-4 pl-4"> Good, because ... </h6>
                    <EditorMadrList data-cy="goodConsOpt" :list="item.pros" class="ml-4 mr-0 px-0" cm-color="grey lighten-3" />

                  </div>
                  <div class="flex-grow-1 mx-0 px-0 py-0 my-0" style="width: 50%; min-width: 600px">
                    <h6 class="py-4 pl-4"> Bad, because ... </h6>
                    <EditorMadrList data-cy="badConsOpt" :list="item.cons" class="ml-4 mr-0 px-0" cm-color="grey lighten-3" />
                  </div>
                </div>
                <v-divider />
              </div>
            </v-expand-transition>
          </v-card>
        </drop>
      </div>

      <!-- Last Item with '+'-Button -->
      <v-card class="my-1 mx-0" flat :key="adr.highestOptionId">
        <v-card flat class="d-flex">
          <div style="width: 32px"></div>

          <codemirror data-cy="considerOptTextAdr" :class="[ 'my-0', 'py-0', 'mr-0']" :value="lastItem"
            @input="(val) => { if(mode !== 'basic') { lastItem = val; addLastItemIfNotEmpty() } }">
          </codemirror>
          <!--<div class="align-center flex-shrink-0 flex-grow-0 mx-1 my-0 py-0" style="width: 64px">
          </div>-->
        </v-card>
      </v-card>

    </v-card>
  </div>
</template>

<script>
  import { ArchitecturalDecisionRecord } from '@/plugins/classes'
  import { store } from '@/plugins/store'
  import codemirror from './EditorMadrCodemirror.vue'
  import EditorMadrList from './EditorMadrList.vue'
  import { Drag, Drop } from 'vue-easy-dnd'

  export default {
    name: 'EditorMadrConsideredOptions',
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
      editedOptions: [], // Expanded options
      expandedOptions: [], // Expanded options
      hoveredOption: null, // Option, which the mouse hovers over (relevant to e.g. show Icons on hover)
      draggedOption: null // Option, which is currently dragged
    }),
    computed: {
      optionTitleList() {
        return this.adr.consideredOptions.map((opt) => (opt.title));
      },
      isModeTooLow() {
        return this.mode === 'basic' && this.adr.consideredOptions.find((opt) => (opt.description.length > 0 || opt.pros.length > 0 || opt.cons.length > 0))
      }
    },
    watch: {},
    mounted() {
    },
    methods: {
      /**
       * Used in Drag'n'Drop
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
          this.adr.consideredOptions.splice(this.adr.consideredOptions.indexOf(option), 1);
          this.adr.consideredOptions.splice(newIndex, 0, option);
        }
      },

      addLastItemIfNotEmpty() {
        if (this.lastItem.trim() !== '') {
          let newOption = this.addLastItemToOptions();
          if (this.mode !== "basic") {
            this.editedOptions.push(newOption);
            this.expandedOptions.push(newOption);
          }
          this.$nextTick(() => {
            try {
              this.$refs["codemirror-" + newOption.id][0].focus();
            } catch (e) {
              console.log("Failed to focus the option ", newOption, " after adding it to ", this.adr.consideredOptions);
              console.log(e);
            }
          });
        }
      },

      addLastItemToOptions() {
        if (this.lastItem.trim() !== '') {
          let option = this.adr.addOption({ title: this.lastItem });
          this.lastItem = "";
          return option;
        }
      },

      /** Remove the option. 
       * @param {object} option
       * @param {int} idx
       */
      removeOption(option, idx) {
        if (idx) {
          this.adr.consideredOptions.splice(idx, 1);
        } else {
          this.adr.consideredOptions.splice(this.adr.consideredOptions.indexOf(option), 1);
        }
      },

      toggleExpansionOfOption(option) {
        if (this.expandedOptions.includes(option)) {
          this.expandedOptions = this.expandedOptions.filter((val) => (val !== option));
        } else {
          this.expandedOptions.push(option);
        }
      },
      toggleEditingOfOption(option) {
        if (this.editedOptions.includes(option)) {
          this.editedOptions = this.editedOptions.filter((val) => (val !== option));
        } else {
          this.editedOptions.push(option);
          this.$nextTick(() => {
            try {
              this.$refs["codemirror-" + option.id][0].focus();
            } catch (e) {
              console.log("Failed to focus the option ", option, " when starting to edit.");
              console.log(e);
            }
          });
        }
      },

      /** 
       * @param {object} option - an option object (i.e. has the attribute 'title') 
       * @returns true iff the option is the chosen option
       */
      isChosenOption(option) {
        return this.adr.decisionOutcome.chosenOption === option.title && this.adr.decisionOutcome.chosenOption !== '';
      },

      switchToAdvancedMode() {
        store.setMode('advanced');
      },

      htmlOf(value) {
        var marked = require('marked');
        return marked(value);
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