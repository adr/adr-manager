<template>
  <div fluid class="text-left">

    <h3>Decision Outcome</h3>
    <v-card dense flat class="px-0 py-0 my-0">
      <v-combobox data-cy="decOutChooseAdr" filled class="pb-0 mb-0" v-model="adr.decisionOutcome.chosenOption"
        :items="adr.consideredOptions.map((opt) => { return opt.title })" label="Chosen option"></v-combobox>
    </v-card>
    <div class="d-flex">
      <h5 class="py-0 pl-0 mr-4 flex-grow-0 flex-shrink-0 align-baseline">because</h5>
      <div class="mx-0 flex-grow-1 align-baseline">
        <codemirror data-cy="decOutBecAdr" v-model="adr.decisionOutcome.explanation"></codemirror>
      </div>
    </diV>
    <!--<v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>-->

    <v-row flat v-if="mode !== 'basic'">
      <v-col lg="6" md="12" flat class="flex-grow-1" min-width="600px" max-width="100%">
        <h5 class="my-4">Positive Consequences</h5>
        <EditorMadrList data-cy="posConseqPro" :list="adr.decisionOutcome.positiveConsequences" />
      </v-col>
      <v-col lg="6" md="12" flat class="flex-grow-1" min-width="600px" max-width="100%">
        <h5 class="my-4">Negative Consequences</h5>
        <EditorMadrList data-cy="negConseqPro"  :list="adr.decisionOutcome.negativeConsequences" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import codemirror from './EditorMadrCodemirror.vue'
  import EditorMadrList from './EditorMadrList.vue'
  export default {
    name: 'EditorMADR',
    components: {
      codemirror, EditorMadrList
    },
    props: {
      adr: {},
      mode: {
        type: String
      }
    },
    data: () => ({
    })
  };
</script>