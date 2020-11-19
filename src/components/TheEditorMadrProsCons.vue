<template>
  <div v-if="showOptionalFields">
    <h3>Pros and Cons of the  Options</h3>
    <div  class="mb-2"
        v-for="(option, i) in adr.consideredOptions"
         v-bind:key="i"
         v-bind:id="'considered-option-' + i">
      <h4> {{ option.title }} </h4>
      <v-card class="mb-2">
        <codemirror hint="Description of the option" v-model="option.description"></codemirror>
      </v-card>
      <h5> Pros </h5>
      <v-list>
        <v-list-item dense
                     v-for="(arg, i) in option.pros"
                     v-bind:key="i">
          <v-list-item-icon class="mr-4">Good, because</v-list-item-icon>
          <v-list-item-content>
            <codemirror v-model="option.pros[i]"></codemirror>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn v-on:click="option.pros.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="option.pros.push('')"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item>
      </v-list>

      <h5> Cons </h5>

      <v-list>
        <v-list-item dense
                     v-for="(arg, i) in option.cons"
                     v-bind:key="i">
          <v-list-item-icon class="mr-4">Bad, because</v-list-item-icon>
          <codemirror v-model="option.cons[i]"></codemirror>
          <v-list-item-icon>
            <v-btn v-on:click="option.cons.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="option.cons.push('')"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </div>

  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror,
    },
    data: () => ({
    }),
    props: ['adr', 'showOptionalFields']
  };
</script>

<style scoped>
</style>
