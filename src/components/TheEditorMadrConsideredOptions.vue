<template>
  <div>
    <h3>Considered Options</h3>

    <v-card flat class="flex-grow-1" style="min-width: 600px">
      <v-expansion-panels class="mb-6" accordion multiple dense flat>
        <v-expansion-panel  class="my-0 py-0" dense v-for="(option, i) in adr.consideredOptions" :key="i">
          <v-expansion-panel-header class="my-0 py-0" expand-icon="mdi-menu-down" v-on:click.native.stop>
            <template v-slot:actions>
              <v-icon class="expansion-left">$expand</v-icon>
            </template>

            <v-card flat v-on:click.native.stop class="d-flex my-0 py-0 expansion-right">
            <codemirror :ref="'codemirror-' + i" class="my-0 py-0 mx-4"  v-model="option.title" v-on:keyup.native.prevent.stop=""></codemirror>
            <div class="align-center flex-shrink-0 flex-grow-0  my-0 py-0">
              <v-btn v-show="i < adr.consideredOptions.length - 1"
                v-on:click.native.stop="adr.consideredOptions.splice(i, 1)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-btn v-show="i >= adr.consideredOptions.length - 1" v-on:click.native.stop="adr.addOption()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </div>
            </v-card>

          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-card-subtitle> Description </v-card-subtitle>
            <v-card flat class="mb-2 px-16">
              <codemirror hint="Description of the option" v-model="option.description"></codemirror>
            </v-card>

            <div class="d-flex flex-wrap">
              <v-card flat class="flex-grow-1" style="width: 50%; min-width: 600px">
                <v-card-subtitle> Good, because ... </v-card-subtitle>
                <EditorMadrList :list="option.pros" class="ml-16" />

              </v-card>
              <v-card flat class="flex-grow-1" style="width: 50%; min-width: 600px">
                <v-card-subtitle> Bad, because ... </v-card-subtitle>
                <EditorMadrList :list="option.cons" class="ml-16" />
              </v-card>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>

    </v-card>
  </div>
</template>

<script>
  import codemirror from './TheEditorMadrCodemirror.vue'
  import EditorMadrList from './TheEditorMadrList.vue'

  export default {
    name: 'EditorMadrProsCons',
    components: {
      codemirror,
      EditorMadrList
    },
    props: ['adr'],
    data: () => ({
      activeOption: 0
    }),
    watch: {
      activeOption(newValue) {
        console.log(newValue)
      }
    },
    mounted() {
      if (this.adr.consideredOptions.length === 0) {
        console.log('Update Considered Options', this.adr);
        this.adr.addOption();
      }
    },
    beforeUpdate() {
      if (this.adr.consideredOptions.length === 0) {
        console.log('Update Considered Options', this.adr);
        this.adr.addOption();
      }
    },
    methods: {
      scrollTo(target) {
        this.$emit('scroll-to', target)
      },
    }
  };
</script>

<style scoped>
  .expansion-left {
      order: 0;
  }

  .expansion-right {
      order: 1;
  }
</style>