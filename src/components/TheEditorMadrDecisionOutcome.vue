<template>
  <div fluid class="text-left">

        <h3>Decision Outcome</h3>
        <v-card dense flat color="#EEEEEE" class="px-4 py-0 my-0">
          <v-combobox class="pb-0 mb-0"
                      v-model="adr.decisionOutcome.chosenOption"
                      :items="adr.consideredOptions.map((opt) => { return opt.title })"
                      label="Chosen option"></v-combobox>
        </v-card>
        because
        <codemirror v-model="adr.decisionOutcome.explanation"></codemirror>
        <!--<v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>-->

        <div v-if="showOptionalFields" class="my-4">
          <h4>Positive Consequences</h4>
          <EditorMadrList :list="adr.decisionOutcome.positiveConsequences" class="ml-8"/>
          <h4>Negative Consequences</h4>
          <EditorMadrList :list="adr.decisionOutcome.negativeConsequences" class="ml-8"/>
        </div>
  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'
  import EditorMadrList from './TheEditorMadrList.vue'
  export default {
    name: 'EditorMADR',
    components: {
      codemirror, EditorMadrList
    },
    props: {
      adr: {},
      showOptionalFields: {
        type: Boolean,
      }
    },
    data: () => ({
    }),
  };
</script>

<style scoped>
</style>
