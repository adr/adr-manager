<template>
  <v-card class="d-flex flex-column">
    <v-card-text class="px-0 py-0" style="position: relative; height: 100%">
      <v-tabs-items v-model="tab" style="position: absolute; height: 100%; width: 100%; ">
        <v-tab-item :value="'MADR Editor'" style="height: 100%; ">
          <splitpanes class="mx-auto default-theme">
            <pane class="overflow-y-auto">
              <v-card-text class="mx-auto">
                <EditorMadr v-model="adr" v-on:input="updateAdr" v-bind:show-optional-fields="showOptionalFields" />
              </v-card-text>
            </pane>
            <pane class="mx-auto overflow-y-auto" v-if="alwaysShowMarkdownPreview">
              <v-card-text class="mx-auto">
                <MarkdownPreview v-model="dValue"></MarkdownPreview>
              </v-card-text>
            </pane>
          </splitpanes>
        </v-tab-item> <!--end 'MADR Editor'-->
          <v-tab-item :value="'Markdown Preview'"
          style="height: 100%;" class="mx-auto overflow-y-auto">
            <MarkdownPreview v-model="dValue"></MarkdownPreview>
          </v-tab-item> <!--end 'Markdown Preview'-->
        <v-tab-item :value="'Raw Markdown'"
        style="height: 100%;">
          <splitpanes class="default-theme">
            <pane class="mx-auto overflow-y-hidden height: 100%">
              <textarea v-model="dValue" v-on:input="updateMd($event.target.value)"
                        style="max-width: 100%; min-width: 100%; height: 100%"></textarea>
            </pane>
            <pane v-if="alwaysShowMarkdownPreview" class="mx-auto overflow-y-auto">
              <MarkdownPreview v-model="dValue"></MarkdownPreview>
            </pane>
          </splitpanes>
        </v-tab-item> <!--end 'Raw Editor'-->
      </v-tabs-items>
    </v-card-text>

    <v-tabs v-model="tab"
            background-color="primary"
            dark
            class="pt-0 mt-0 align-self-end">
      <v-checkbox v-if="tab !== 'Markdown Preview'"
                  v-model="alwaysShowMarkdownPreview"
                  class="align-self-center mx-4"
                  label="Show Markdown Preview">
      </v-checkbox>
      <v-checkbox v-if="tab === 'MADR Editor'"
                  v-model="showOptionalFields"
                  class="align-self-center mx-4"
                  label="Show Optional Fields"></v-checkbox>
      <v-spacer></v-spacer>
      <v-tab v-for="(item, i) in displayedTabs"
            :key="i"
             :href="'#'+item">
        {{ item }}
      </v-tab>
    </v-tabs>

  </v-card>
          
</template>

<script>
  import _ from 'lodash'
  import { md2json, json2adr, adr2md, ArchitecturalDecisionRecord } from '@/plugins/utilities'

  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  import EditorMadr from './TheEditorMadr.vue'
  import MarkdownPreview from './UsefulComponents/MarkdownPreview.vue'

  export default {
    name: 'Editor',
    components: {
      Splitpanes, Pane,
      EditorMadr,
      MarkdownPreview
    },
    props: {
      value: {
        type: String,
        default: adr2md(new ArchitecturalDecisionRecord())
      },
      userName: {
        type: String,
        default: 'adr'
      },
      repoName: {
        type: String,
        default: 'madr'
      },
      branchName: {
        type: String,
        default: 'master'
      }
    },
    data: () => ({
      adr: {},
      dValue: "# Default ADR Editor heading",
      tab: 0,
      tabs: ['MADR Editor', 'Markdown Preview', 'Raw Markdown'],
      alwaysShowMarkdownPreview: false,
      showOptionalFields: true,
      _
    }),
    computed: {
      displayedTabs() {
        //let dTabs = typeof this.dValue === 'string' && adr2md(json2adr(md2json(this.dValue))) === this.dValue ?
        //  this.tabs : this.tabs.slice(1); 
        return this.tabs
      }
    },
    created() {
      this.dValue = this.value;
      this.adr = json2adr(md2json(this.value));
      this.currentBranch = this.branchName;
    },
    watch: {
      value() {
        this.dValue = this.value;
        this.adr = json2adr(md2json(this.value))
      }
    },
    methods: {
      updateMd: function (md) {
        this.dValue = md;
        this.adr = json2adr(md2json(md))
        this.$emit('input', this.dValue);
      },
      updateAdr: _.debounce(function (adr) {
        this.dValue = adr2md(adr);
        this.adr = adr;
        this.$emit('input', this.dValue);
      }, 300),
      addRepository() {
        console.log('ToDo: Add a Repository.')
      },
      logNotImplemented() {
        console.log('Not implemented.')
      }
    }
  };
</script>

<style scoped>
  textarea {
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }
</style>
