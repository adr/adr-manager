<template>
  <div fluid class="text-left">

        <h3>Decision Outcome</h3>
        <v-card dense class="px-4 py-0 my-0">
          <v-combobox class="pb-0 mb-0"
                      v-model="adr.decisionOutcome.chosenOption"
                      :items="adr.consideredOptions.map((opt) => { return opt.title })"
                      label="Chosen option"></v-combobox>
        </v-card>
        because
        <codemirror v-model="adr.decisionOutcome.explanation"></codemirror>
        <!--<v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>-->

        <div v-if="showOptionalFields">
          <h4>Positive Consequences</h4>
          <v-list>
            <v-list-item dense
                         v-for="(consequence, i) in adr.decisionOutcome.positiveConsequences"
                         v-bind:key="i">
              <codemirror v-model="adr.decisionOutcome.positiveConsequences[i]"></codemirror>
              <v-list-item-icon>
                <v-btn v-on:click="adr.decisionOutcome.positiveConsequences.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-btn v-on:click="adr.decisionOutcome.positiveConsequences.push('')"><v-icon>mdi-plus</v-icon></v-btn>
            </v-list-item>
          </v-list>
          <h4>Negative Consequences</h4>
          <v-list>
            <v-list-item dense
                         v-for="(consequence, i) in adr.decisionOutcome.negativeConsequences"
                         v-bind:key="i">
              <codemirror v-model="adr.decisionOutcome.negativeConsequences[i]"></codemirror>
              <v-list-item-icon>
                <v-btn v-on:click="adr.decisionOutcome.negativeConsequences.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-btn v-on:click="adr.decisionOutcome.negativeConsequences.push('')"><v-icon>mdi-plus</v-icon></v-btn>
            </v-list-item>
          </v-list>
        </div>
  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'

  export default {
    name: 'EditorMADR',
    components: {
      codemirror,
    },
    data: () => ({
    }),
    props: {
      adr: {},
      showOptionalFields: {
        type: Boolean,
      }
    },
  };
</script>

<style scoped>
</style>
