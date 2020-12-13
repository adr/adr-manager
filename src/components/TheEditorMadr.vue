<template>
  <v-container fluid class="editor text-left d-flex flex-column mx-0" id="editor-madr">

    <v-sheet class="mx-auto mx-0 my-0 px-0 py-0" style="height: 100%; width:100%;">

      <v-container fluid class="mx-auto overflow-y-auto scroll px-8" style="height: 100%;">
        <v-card-title class="mx-0 px-0 mb-0 pb-0">
          <v-text-field filled label="Title"
            hint="Changing this field, changes the file name. Do not use special characters." v-model="adr.title"
            @input="$emit('input', adr)" />
        </v-card-title>

        <StatusDateDecidersStory v-if="mode !== 'basic'" v-bind:adr="adr" @input="$emit('input', adr)" />

        <v-divider class="my-8" />

        <h3 class="mt-8">Context and Problem Statement</h3>
        <v-card flat class="mb-8">
          <codemirror v-model="adr.contextAndProblemStatement"
            @input="(val) => { adr.contextAndProblemStatement = val; $emit('input', adr) }" />
        </v-card>


        <div v-if="mode === 'professional'">
          <v-divider class="my-8" />
          <h3>Decision Drivers</h3>
          <GenericList :list="adr.decisionDrivers" />
        </div>

        <v-divider class="my-8" />

        <ConsideredOptions :adr="adr" :mode="mode" @scroll-to="scrollTo" @input="$emit('input', adr)" />

        <v-divider class="my-8" />
        <DecisionOutcome :adr="adr" :mode="mode" @input="$emit('input', adr)" />

        <div v-if="mode === 'professional'">
          <v-divider class="my-8" />
          <h3>Links</h3>
          <GenericList :list="adr.links" />
        </div>

        <div class="my-16"></div>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
  //import _ from 'lodash'
  import { ArchitecturalDecisionRecord } from '@/plugins/classes.js'
  import { store } from '@/plugins/store.js';

  import codemirror from './TheEditorMadrCodemirror.vue'
  //import NavigatorFab from './TheEditorMadrFab.vue'
  import StatusDateDecidersStory from './TheEditorMadrStatusDateDecidersStory.vue'
  import DecisionOutcome from './TheEditorMadrDecisionOutcome.vue'
  //import ProsAndConsOfOptions from './TheEditorMadrProsCons.vue'
  import ConsideredOptions from './TheEditorMadrConsideredOptions.vue'

  import GenericList from './TheEditorMadrList.vue'

  export default {
    name: 'EditorMADR',
    components: {
      codemirror,
      //NavigatorFab,
      StatusDateDecidersStory,
      ConsideredOptions,
      DecisionOutcome,
      //ProsAndConsOfOptions,
      GenericList
    },
    props: {
      value: { type: ArchitecturalDecisionRecord },
    },
    data: () => ({
      adr: {},
    }),
    computed: {
      mode() {
        return store.mode
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
    },
    methods: {
      scrollTo(target) {
        this.$vuetify.goTo(target, { container: '.scroll' })
      }
    }
  };
</script>