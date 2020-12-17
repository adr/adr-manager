<template>
  <div>
    <div class="d-flex flex-wrap">
      <div class="d-flex mx-0 px-0">
        <div style="flex-shrink: 0">
          <v-card-title class="py-1">
            Status
          </v-card-title>
        </div>
        <div style="flex-shrink: 1; flex-grow: 1">
          <v-combobox dense filled v-model="adr.status" :items="statusSuggestions"></v-combobox>
        </div>
      </div>
      <div class="d-flex mx-0 px-0">
        <div class="py-0 flex-shrink-0">
          <v-card-title class="py-1 flex-shrink-0">
            Date
          </v-card-title>
        </div>
        <div class="flex-grow-1 flex-shrink-1">
          <DatePickerMenu filled dense v-model="adr.date"></DatePickerMenu>
        </div>
      </div>
      <div class="d-flex flex-grow-1 flex-shrink-0 mx-0 px-0" style="min-width: 200px">
        <div style="flex-shrink: 0">
          <v-card-title class="py-1">Deciders</v-card-title>
        </div>
        <div class="flex-grow-1 flex-shrink-1">
          <v-text-field filled dense v-model="adr.deciders"></v-text-field>
        </div>
      </div>
    </div>
    <div class="d-flex mx-0 px-0" style="flex-grow: 3">
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
  import DatePickerMenu from "./UsefulComponents/DatePickerMenu.vue";
  import codemirror from "./TheEditorMadrCodemirror.vue";
  import { ArchitecturalDecisionRecord } from "@/plugins/classes.js";

  export default {
    components: {
      DatePickerMenu,
      codemirror
    },
    data: () => ({
    }),
    props: {
      adr: {
        type: ArchitecturalDecisionRecord
      }
    },
    computed: {
      statusSuggestions() {
        return ['proposed', 'rejected', 'accepted', 'deprecated', 'superseded by']
          .concat(
            this.adr.status.startsWith('superseded ') ?
              ['superseded by ADR-0001', 'superseded by ADR-0002', 'superseded by ADR-0003'] : []
          );
      }
    },
    methods: {
      scrollTo(target) {
        this.$vuetify.goTo(target, { container: '.scroll' });
      },
    }
  };
</script>

<style scoped>
</style>