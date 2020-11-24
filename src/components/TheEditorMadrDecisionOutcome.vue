<template>
  <div fluid class="text-left">

    <h3>Decision Outcome</h3>
    <v-card dense flat class="px-4 py-0 my-0">
      <v-combobox filled class="pb-0 mb-0" v-model="adr.decisionOutcome.chosenOption"
        :items="adr.consideredOptions.map((opt) => { return opt.title })" label="Chosen option"></v-combobox>
    </v-card>
    <v-card-subtitle class="mt-0 pt-0">because</v-card-subtitle>
    <codemirror class="mx-4" v-model="adr.decisionOutcome.explanation"></codemirror>
    <!--<v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>-->

    <div v-if="showOptionalFields" class="d-flex flex-wrap my-4">
        <v-card flat class="flex-grow-1" style="width: 50%; min-width: 600px">
          <v-card-title>Positive Consequences</v-card-title>
          <EditorMadrList :list="adr.decisionOutcome.positiveConsequences" class="ml-8" />
        </v-card>
        <v-card flat class="flex-grow-1" style="width: 50%; min-width: 600px">
          <v-card-title>Negative Consequences</v-card-title>
          <EditorMadrList :list="adr.decisionOutcome.negativeConsequences" class="ml-8" />
        </v-card>
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