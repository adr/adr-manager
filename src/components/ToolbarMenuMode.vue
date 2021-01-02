<template>
  <div>
    <v-tabs v-model="tab" class="mx-0 px-0 pt-0 mt-0 flex-grow-0" background-color="transparent">
      <v-tooltip v-for="item in modes" :key="item.name" open-delay="500" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-tab text v-on:click="setMode(item.name)" v-on="on" v-bind="attrs">
            {{ item.name }}
          </v-tab>
        </template>
        <span>
          {{ item.tooltip }}
        </span>
      </v-tooltip>
    </v-tabs>
  </div>
</template>

<script>
  import { store } from '@/plugins/store.js'

  export default {
    name: 'MenuMode',
    components: {
    },
    data: () => ({
      tab: 0,
      modes: [
        { name: 'basic', tooltip: 'Only show required fields.' },
        { name: 'advanced', tooltip: 'Show advanced fields.' },
        { name: 'professional', tooltip: 'Show all fields.' }
      ]
    }),
    props: {
      consideredOptions: {
        type: Array, // Array
        required: false,
        default: () => ([])
      }
    },
    computed: {
    },
    created() {
      this.tab = this.modes.findIndex(m => (m.name === store.mode));
      store.$on('set-mode', this.updateModeLocal);
    },
    methods: {
      updateModeLocal(mode) {
        this.tab = this.modes.findIndex(m => (m.name === mode));
      },
      setMode(mode) {
        store.setMode(mode);
      }
    }
  };
</script>

<style scoped>
</style>