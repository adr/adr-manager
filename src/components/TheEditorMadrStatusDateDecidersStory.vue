<template>
        <div flat tile v-if="showOptionalFields"
             dense class="d-flex flex-row flex-wrap mb-6">
          <div dense class="d-flex pr-4">
            <div style="flex-shrink: 0">
              <v-card-title>
                Status
              </v-card-title>
            </div>
            <div style="flex-shrink: 1; flex-grow: 1">
              <v-combobox v-model="adr.status" :items="statusSuggestions"></v-combobox>
            </div>
          </div>
          <div class="d-flex pr-4">
            <div>
              <v-card-title style="flex-shrink: 0">
                Date
              </v-card-title>
            </div>
            <div class="flex-grow-1 flex-shrink-1">
              <DatePickerMenu v-model="adr.date"></DatePickerMenu>
            </div>
          </div>
          <div dense tile outlined class="d-flex flex-grow-1 flex-shrink-0 pr-4" style="min-width: 200px">
            <div style="flex-shrink: 0">
              <v-card-title>Deciders</v-card-title>
            </div>
            <div class="flex-grow-1 flex-shrink-1">
              <v-combobox v-model="adr.deciders"></v-combobox>
            </div>
          </div>
          <div tile outlined class="d-flex pr-4" style="flex-grow: 3">
            <div style="flex-shrink: 0">
              <v-card-title>
                Technical Story
              </v-card-title>
            </div>
            <div class="align-self-center flex-grow-1 py-1" style="min-width: 400px;">
              <codemirror v-model="adr.technicalStory"></codemirror>
            </div>
          </div>
        </div>

</template>

<script>
  //import _ from 'lodash'
  import DatePickerMenu from './UsefulComponents/DatePickerMenu.vue'
  import codemirror from './TheEditorMadrCodemirror.vue'
  import { ArchitecturalDecisionRecord } from '@/plugins/utilities.js'

  export default {
    name: 'EditorMadrStatusDateDecidersStory',
    components: {
      DatePickerMenu,
      codemirror,
    },
    data: () => ({
    }),
    props: {
      adr: {
        type: ArchitecturalDecisionRecord,
      },
      showOptionalFields: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      statusSuggestions() {
        return ['proposed', 'rejected', 'superseded by'].concat(this.adr.status.startsWith('superseded ') ? ['superseded by ADR-0001', 'superseded by ADR-0002', 'superseded by ADR-0003'] : [])
      }
    },
    methods: {
      scrollTo(target) {
        this.$vuetify.goTo(target, { container: '.scroll' })
      },
    }
  };
</script>

<style scoped>
</style>
