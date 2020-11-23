<template>
  <v-container fluid class="editor text-left d-flex flex-column" id="editor-madr">

    <v-sheet class="mx-auto mx-0 my-0 px-0 py-0" style="height: 100%; width:100%;">

      <v-container fluid class="mx-auto overflow-y-auto scroll" style="height: 100%;">
        <NavigatorFab :options="adr.consideredOptions" @scroll-to="scrollTo" v-if="showOptionalFields"/>

        <h1>
          <v-text-field background="#eeeeee" label="Titel" hint="Changing this field, changes the file name. Do not use special characters." 
          v-model="adr.title" @input="$emit('input', adr)"></v-text-field>
        </h1>
        <StatusDateDecidersStory v-bind:adr="adr" 
          v-bind:showOptionalFields="showOptionalFields" 
          @input="$emit('input', adr)"
          v-if="mode !== 'basic'"></StatusDateDecidersStory>

        <h3>Context and Problem Statement</h3>
        <v-card flat class="mb-4">
          <codemirror v-model="adr.contextAndProblemStatement" @input="(val) => { adr.contextAndProblemStatement = val; $emit('input', adr) }"></codemirror>
        </v-card>

        <div v-if="showOptionalFields" class="my-8">
          <h3>Decision Drivers</h3>
          <GenericList :list="adr.decisionDrivers"/>
        </div>

        <ConsideredOptions :adr="adr" @scroll-to="scrollTo" @input="$emit('input', adr)" class="my-8"></ConsideredOptions>

        <DecisionOutcome :adr="adr" :showOptionalFields="showOptionalFields" @input="$emit('input', adr)" class="my-8"></DecisionOutcome>

        <ProsAndConsOfOptions :adr="adr" :showOptionalFields="showOptionalFields" @input="$emit('input', adr)" class="my-8"></ProsAndConsOfOptions>


        <div v-if="showOptionalFields">
          <h3>Links</h3>
          <GenericList :list="adr.links" class="mb-16"/>
        </div>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
  //import _ from 'lodash'
  import { ArchitecturalDecisionRecord } from '@/plugins/utilities.js'
  import { EventBus } from '@/plugins/event-bus.js';

  import codemirror from './TheEditorMadrCodemirror.vue'
  import NavigatorFab from './TheEditorMadrFab.vue'
  import StatusDateDecidersStory from './TheEditorMadrStatusDateDecidersStory.vue'
  import DecisionOutcome from './TheEditorMadrDecisionOutcome.vue'
  import ProsAndConsOfOptions from './TheEditorMadrProsCons.vue'
  import ConsideredOptions from './TheEditorMadrConsideredOptions.vue'

  import GenericList from './TheEditorMadrList.vue'

  export default {
    name: 'EditorMADR',
    components: {
      codemirror,
      NavigatorFab,
      StatusDateDecidersStory,
      ConsideredOptions,
      DecisionOutcome,
      ProsAndConsOfOptions,
      GenericList
    },
    props: {
      value: { type: ArchitecturalDecisionRecord },
    },
    data: () => ({
      adr: {},
      mode: ['basic', 'advanced', 'professional'].includes(localStorage.getItem('mode')) ?  localStorage.getItem('mode') : 'basic'
    }),
    computed: {
      showOptionalFields() {
        return this.mode !== 'basic'
      }
    },
    watch: {
      value() {
        this.adr = this.value
      },
      adr: {
        handler() {
          this.$emit('input', this.adr)
        },
        deep: true
      }
    },
    created() {
      this.adr = this.value;
      EventBus.$on('change-mode', (mode) => { this.mode = mode });
    },
    methods: {
      scrollTo(target) {
        this.$vuetify.goTo(target, { container: '.scroll' })
      }
    }
  };
</script>

<style scoped>
</style>
