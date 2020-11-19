<template>
  <v-container fluid class="editor text-left d-flex flex-column" id="editor-madr">

    <v-sheet class="mx-auto mx-0 my-0 px-0 py-0" style="height: 100%; width:100%;">

      <v-container fluid class="mx-auto overflow-y-auto scroll" style="height: 100%;">
        <NavigatorFab :options="adr.consideredOptions" @scroll-to="scrollTo" />

        <h1>
          <v-text-field label="Titel" hint="Changing this field, changes the file name. Do not use special characters." v-model="adr.title"></v-text-field>
        </h1>
        <StatusDateDecidersStory v-bind:adr="adr" v-bind:showOptionalFields="showOptionalFields"></StatusDateDecidersStory>

        <h3>Context and Problem Statement</h3>
        <v-card class="mb-4">
          <codemirror v-model="adr.contextAndProblemStatement"></codemirror>
        </v-card>

        <DecisionDrivers :adr="adr" :showOptionalFields="showOptionalFields" class="mb-4"></DecisionDrivers>

        <ConsideredOptions :adr="adr" @scroll-to="scrollTo"></ConsideredOptions>

        <DecisionOutcome :adr="adr" :showOptionalFields="showOptionalFields" class="mb-4"></DecisionOutcome>

        <ProsAndConsOfOptions :adr="adr" :showOptionalFields="showOptionalFields" class="mb-4"></ProsAndConsOfOptions>


        <div v-if="showOptionalFields">
          <h3>Links</h3>
          <v-list>
            <v-list-item dense
                         v-for="(link, i) in adr.links"
                         :key="i">
              <v-list-item-icon></v-list-item-icon>
              <codemirror v-model="adr.links[i]"></codemirror>
              <v-list-item-icon>
                <v-btn v-on:click="adr.links.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-btn v-on:click="adr.links.push('')"><v-icon>mdi-plus</v-icon></v-btn>
            </v-list-item>
          </v-list>
        </div>
      </v-container>
    </v-sheet>

    <!--<v-navigation-drawer expand-on-hover float right position="absolute">

    <v-list>
      <v-list-item class="px-2">
        <v-list-item-icon><v-icon>mdi-up</v-icon></v-list-item-icon>
      </v-list-item>

      <v-list-item @click="$vuetify.goTo(0, { container: '#editor-madr' })">
        <v-list-item-content>
          <v-list-item-title class="title">
            Up
          </v-list-item-title>
          <v-list-item-subtitle>Scroll up</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav
            dense>
      <v-list-item v-for="(opt, i) in adr.consideredOptions" :key="i"
                   @click="$vuetify.goTo('#considered-option-' + i, { container: '#editor-madr' })">
        <v-list-item-icon>
          <v-icon>{{ i+1 }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="opt.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>-->
  </v-container>
</template>

<script>
  //import _ from 'lodash'
  import { ArchitecturalDecisionRecord } from '@/plugins/utilities.js'

  import codemirror from './TheEditorMadrCodemirror.vue'
  import NavigatorFab from './TheEditorMadrFab.vue'
  import StatusDateDecidersStory from './TheEditorMadrStatusDateDecidersStory.vue'
  import DecisionOutcome from './TheEditorMadrDecisionOutcome.vue'
  import ProsAndConsOfOptions from './TheEditorMadrProsCons.vue'
  import DecisionDrivers from './TheEditorMadrDecisionDrivers.vue'
  import ConsideredOptions from './TheEditorMadrConsideredOptions.vue'

  export default {
    name: 'EditorMADR',
    components: {
      codemirror,
      NavigatorFab,
      StatusDateDecidersStory,
      DecisionDrivers,
      ConsideredOptions,
      DecisionOutcome,
      ProsAndConsOfOptions
    },
    data: () => ({
      adr: {},
    }),
    props: {
      value: { type: ArchitecturalDecisionRecord },
      showOptionalFields: {
        type: Boolean,
        default: localStorage.getItem('mode') === 'professional'
      }
    },
    watch: {
      value() {
        this.adr = this.value
      }
    },
    created() {
      this.adr = this.value
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
