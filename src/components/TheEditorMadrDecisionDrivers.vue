<template>
    <div v-if="showOptionalFields">
      <h3>Decision Drivers</h3>
      <v-list>
        <v-list-item dense class="align-self-center"
                     v-for="(driver, i) in adr.decisionDrivers"
                     :key="i">
          <v-list-item-icon></v-list-item-icon>
          <codemirror v-model="adr.decisionDrivers[i]"></codemirror>
          <v-list-item-icon>
            <v-btn v-on:click="adr.decisionDrivers.splice(i, 1)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="adr.decisionDrivers.push('')"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'

  export default {
    name: 'EditorMadrDecisionDrivers',
    components: {
      codemirror,
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
