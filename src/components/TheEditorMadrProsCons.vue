<template>
  <div v-if="showOptionalFields">
    <h3>Pros and Cons of the  Options</h3>
    <div  class="mb-2"
        v-for="(option, i) in displayedOptions"
        v-bind:key="i"
        v-bind:id="'considered-option-' + i">
      <h4> {{ option.title }} </h4>
      <v-card flat class="mb-2">
        <codemirror hint="Description of the option" v-model="option.description"></codemirror>
      </v-card>
      
      <div class="d-flex flex-wrap">
        <div class="flex-grow-1" style="width: 50%; min-width: 600px">
      <h5> Good, because ... </h5>
      <EditorMadrList :list="option.pros" class="ml-16"/>

    </div>
      <div class="flex-grow-1" style="width: 50%; min-width: 600px">
      <h5> Bad, because ... </h5>

      <EditorMadrList :list="option.cons" class="ml-16"/>
    </div>
  </div>
    </div>

  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'
  import EditorMadrList from './TheEditorMadrList.vue'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror, EditorMadrList
    },
    props: ['adr', 'showOptionalFields'],
    data: () => ({
    }),
    computed: {
      /* Only display options with a non-empty title */
      displayedOptions() {
        return this.adr.consideredOptions.filter((opt) => (opt.title !== ''))
      }
    },
  };
</script>

<style scoped>
</style>
