<template>
  <v-container fluid class="editor text-center">
    <splitpanes class="default-theme">
      <pane size="20%">

        <v-row no-gutters dense
               class="d-flex align-content-space-around flex-wrap">
          <v-col cols="1"
                 style="max-width: 100%;"
                 class="flex-grow-0 flex-shrink-0">
            <v-dialog v-model="dialog"
                      width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs"
                       v-on="on">
                  Commit changes
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Commit changes
                </v-card-title>

                <v-card-text>
                  The following files were changed:
                  <ul>
                    <li>1234 Adr X</li>
                    <li>3456 Adr Y</li>
                  </ul>
                  Do you want to push to a new branch?
                  <v-switch v-model="dialogSwitch">
                    <template v-slot:label>
                      <div>
                        <div>
                          <div v-if="dialogSwitch"> Push to new branch '{{ currentBranch }}-adr-update'.</div>
                          <div v-else>Push to {{ currentBranch }}.</div>
                        </div>
                      </div>
                    </template>
                  </v-switch>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog = false">
                    Commit and push!
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-col cols="2"
                 style="min-width: 175px; max-width: 100%;"
                 class="flex-grow-1 flex-shrink-0 text-right">
            <v-autocomplete dense class="px-4  pt-2" label="Current branch"
                            v-model="currentBranch"
                            :items="[branchName, 'master', 'branch 1', 'branch 2']"></v-autocomplete>
          </v-col>
        </v-row>
        <GitRepoTree v-on:select-file="updateMd" v-bind:repo="repoName" v-bind:branch="branchName" />
        <v-btn v-on:click="createNewAdr">New ADR</v-btn>

      </pane>

      <pane>
        <v-tabs v-model="tab"
                background-color="primary"
                dark>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="align-self-center mr-4"
                     dark
                     v-bind="attrs"
                     v-on="on">
                File
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in ['Save locally', 'Commit and Push', 'Delete ADR', 'Create new ADR']"
                           :key="index"
            link>
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-tab v-for="item in tabs"
                 :key="item.tabName">
            {{ item.tabName }}
          </v-tab>
          <!--<v-checkbox text
              v-if="tab.tabName !== 'Markdown Preview' !== 'Markdown Preview'"
              v-model="alwaysShowMarkdownPreview"
              class="align-self-center mr-4"
              label="Show Markdown Preview">
  </v-checkbox>-->
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item :key="'MADR Editor'">
            <v-card flat>
              <splitpanes class="default-theme">
                <pane>
                  <AdrRepresentation v-model="adr" v-on:input="updateAdr" />
                </pane>
                <pane v-if="alwaysShowMarkdownPreview">
                  <MarkdownPreview v-model="dValue"></MarkdownPreview>
                </pane>
              </splitpanes>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="'Raw Markdown'">
            <v-card flat>
              <splitpanes class="default-theme">
                <pane>
                  <v-textarea v-model="dValue" v-on:input="updateMd"
                              auto-grow style="max-width: 100%; min-width: 100%"></v-textarea>
                </pane>
                <pane v-if="alwaysShowMarkdownPreview">
                  <MarkdownPreview v-model="dValue"></MarkdownPreview>
                </pane>
              </splitpanes>
            </v-card>
          </v-tab-item>
          <v-tab-item :key="'Markdown Preview'">
            <v-card flat>
              <MarkdownPreview v-model="dValue"></MarkdownPreview>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </pane>
    </splitpanes>
</v-container>
</template>

<script>
  import _ from 'lodash'
  import { md2json, json2adr, adr2md, ArchitecturalDecisionRecord } from '@/plugins/utilities'

  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  import AdrRepresentation from './MadrRepresentation.vue'
  import GitRepoTree from '../UsefulComponents/GitRepoTree.vue'
  import MarkdownPreview from '../UsefulComponents/MarkdownPreview.vue'

  export default {
    name: 'AdrEditor',
    components: {
      Splitpanes, Pane,
      AdrRepresentation,
      GitRepoTree,
      MarkdownPreview
    },
    data: () => ({
      adr: {},
      dValue: "# Default ADR Editor heading",
      tab: 'MADR Editor',
      tabs: [
        { tabName: 'MADR Editor' },
        { tabName: 'Raw Markdown' },
        { tabName: 'Markdown Preview' }
      ],
      alwaysShowMarkdownPreview: false,
      dialog: false,
      dialogSwitch: false,
      currentBranch: '',
      _
    }),
    props: {
      value: {
        type: String,
        default: adr2md(new ArchitecturalDecisionRecord())
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
    created() {
      this.dValue = this.value;
      this.adr = json2adr(md2json(this.value));
      this.currentBranch = this.branchName;
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
      createNewAdr: _.debounce(function () {
        this.adr = new ArchitecturalDecisionRecord();
        this.dValue = adr2md(this.adr);
        this.$emit('new-adr', this.dValue);
      }, 300)
    }
  };
</script>

<style scoped>
  #editor {
    margin: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
    text-align: left;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>
