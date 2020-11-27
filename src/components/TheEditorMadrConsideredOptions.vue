<template>
  <div>
    <h3>Considered Options</h3>
    <v-card v-if="mode === 'basic'" flat class="flex-grow-1 mx-0" style="min-width: 600px">
      <EditorMadrList :list="optionTitleList" @input="updateOptionTitles" class="mx-0 px-0" />
    </v-card>

    <v-card v-else flat class="flex-grow-1 mx-0" style="min-width: 600px">

      <v-card class="my-1" flat v-for="(option, i) in adr.consideredOptions" :key="i">
        <!-- Title and Icons -->
        <v-card flat class="d-flex">
          <v-card flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0 d-flex"
            style="width: 64px; min-width: 64px">
            <v-btn v-show="!activeOptions.includes(i)" text class="mx-0 px-0 flex-grow-1 flex-shrink-1"
              style="min-width: 0" @click="activeOptions.push(i)">

              <v-icon v-if="isChosenOption(option)" color="success" style="min-width: 18px; width: 18px">
                mdi-check-decagram
              </v-icon>
              <div v-else style="min-width: 18px"></div>
              <v-icon class="ml-2">mdi-chevron-down</v-icon>
            </v-btn>
            <v-btn v-show="activeOptions.includes(i)" text class="mx-0 px-0 flex-grow-1 flex-shrink-1"
              style="min-width: 0" @click="activeOptions = activeOptions.filter((val) => (val !== i))">

              <v-icon
                v-if="adr.decisionOutcome.chosenOption === option.title && adr.decisionOutcome.chosenOption !== ''"
                color="success" style="min-width: 18px; width: 18px">
                mdi-check-decagram
              </v-icon>
              <div v-else style="min-width: 18px"></div>

              <v-icon class="ml-2">mdi-chevron-up</v-icon>
            </v-btn>
          </v-card>
          <codemirror :ref="'codemirror-' + i" class="my-0 py-0 mr-4" v-model="option.title"
            v-on:keyup.native.prevent.stop=""></codemirror>
          <div class="align-center flex-shrink-0 flex-grow-0  my-0 py-0">
            <v-btn v-show="i < adr.consideredOptions.length">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </v-card>

        <!-- Expandable Description -->
        <v-expand-transition>
          <div v-show="activeOptions.includes(i)" class="pl-12">
            <h6 class="my-4 pl-4"> Description </h6>
            <v-card flat class="mb-2 pl-4 pr-0">
              <codemirror hint="Description of the option" color="green" v-model="option.description"></codemirror>
            </v-card>

            <div class="d-flex flex-wrap mx-0 px-0 mb-16">
              <v-card flat class="flex-grow-1 mx-0 px-0" style="width: 50%; min-width: 600px">
                <h6 class="my-4 pl-4"> Good, because ... </h6>
                <EditorMadrList :list="option.pros" class="ml-4 mr-0 px-0" />

              </v-card>
              <v-card flat class="flex-grow-1 mx-0 px-0" style="width: 50%; min-width: 600px">
                <h6 class="my-4 pl-4"> Bad, because ... </h6>
                <EditorMadrList :list="option.cons" class="ml-4 mr-0 px-0" />
              </v-card>
            </div>
          </div>
        </v-expand-transition>
      </v-card>

      <!-- Last Item with '+'-Button -->
      <v-card class="my-1" flat :key="adr.consideredOptions.length">
        <v-card flat class="d-flex">
          <v-card flat class="align-center flex-shrink-0 flex-grow-0 my-0 py-0" style="width: 64px; min-width:50px">
          </v-card>
          <codemirror :ref="'codemirror-' + adr.consideredOptions.length" class="my-0 py-0 mr-4" v-model="lastItem">
          </codemirror>
          <div class="align-center flex-shrink-0 flex-grow-0  my-0 py-0">
            <v-btn v-on:click.native.stop="adr.addOption({title: lastItem}); lastItem = ''">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-card>
    </v-card>
  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'
  import EditorMadrList from './TheEditorMadrList.vue'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror,
      EditorMadrList
    },
    props: {
      adr: {
        type: Object // ArchitecturalDecisionRecord
      },
      mode: {
        type: String
      }
    },
    data: () => ({
      activeOptions: [], // Indexes of expanded options
      lastItem: ''
    }),
    computed: {
      optionTitleList() {
        return this.adr.consideredOptions.map((opt) => (opt.title))
      }
    },
    mounted() {
      if (this.adr.consideredOptions.length === 0) {
        console.log('Update Considered Options', this.adr);
        this.adr.addOption();
      }
    },
    beforeUpdate() {
      if (this.adr.consideredOptions.length === 0) {
        console.log('Update Considered Options', this.adr);
        this.adr.addOption();
      }
    },
    methods: {
      scrollTo(target) {
        this.$emit('scroll-to', target)
      },
      /** Put option titles in option list of ADR. 
       * When in basic mode and only option titles are shown, this method is used to update the ADR solely based on the option titles. 
       * @param {Array[String]} titleList
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
      /** Put option titles in option list of ADR. 
       * When in basic mode and only option titles are shown, this method is used to update the ADR solely based on the option titles. 
       * @param {String} titleList
       * @param {int} titleList
       */
      removeOption(item, idx) {
        this.adr.consideredOptions.splice(idx, 1)
      },
      /** 
       * @param {Object} option - an option object (i.e. has the attribute 'title') 
       * @returns true iff the option is the chosen option
       */
      isChosenOption(option) {
        return this.adr.decisionOutcome.chosenOption === option.title && this.adr.decisionOutcome.chosenOption !== ''
      }
    }
  };
</script>