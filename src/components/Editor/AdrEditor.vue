<template>
  <v-sheet class="editor text-center mx-auto d-flex flex-column">

    <v-tabs v-model="tab"
            background-color="primary"
            dark style="-webkit-flex: 0; flex: 0;">
      <slot name="menu-buttons"></slot>
      
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="align-self-center ml-4"
                 dark text
                 v-bind="attrs"
                 v-on="on">
            File
          </v-btn>
        </template>
        <v-list>
          <v-dialog v-model="dialog"
                    width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item v-bind="attrs"
                           v-on="on">
                Commit and Push
              </v-list-item>
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
          <v-list-item v-for="(item, index) in ['Delete ADR', 'Create new ADR']"
                       :key="index"
                       link>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="align-self-center ml-4"
                 dark text
                 v-bind="attrs"
                 v-on="on">
            Mode
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title>Basic</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title>Advanced</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="align-self-center ml-4"
                 dark text
                 v-bind="attrs"
                 v-on="on">
            <v-icon>mdi-hamburger</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link
                       v-for="opt in adr.consideredOptions"
                       :key="opt.title">
            <v-list-item-title v-text="opt.title"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>

    <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex: 1; flex: 1; position: relative;">
      <splitpanes class="default-theme" style="overflow: auto; position: absolute; height: 100%; width: 100%; ">
        <pane size="20%" style="overflow: auto;">

          <v-row no-gutters dense
                 class="d-flex align-content-space-around flex-wrap">
            <v-col cols="1"
                   style="max-width: 100%;"
                   class="flex-grow-0 flex-shrink-0">
            </v-col>
            <v-col cols="2"
                   style="min-width: 175px; max-width: 100%;"
                   class="flex-grow-1 flex-shrink-0 text-right">
            </v-col>
          </v-row>
          <GitRepoTree v-on:select-file="updateMd" v-bind:repo="repoName" v-bind:branch="branchName" v-bind:user="userName" />

          <v-row no-gutters dense
                 class="d-flex align-content-space-around flex-wrap">
            <v-col cols="1"
                   style="max-width: 100%;"
                   class="flex-grow-1 flex-shrink-0 text-right">
              <v-btn v-on:click="addRepository">Add Repository</v-btn>
            </v-col>
          </v-row>

        </pane> <!--end File Explorer Pane -->

        <pane style="height: 100%; display: flex; flex-direction: column;">
          <v-card-text class="px-0 py-0" style="-webkit-flex: 1; flex: 1; position: relative;">

            <v-tabs-items v-model="tab" style="position: absolute; height: 100%; width: 100%; ">
              <v-tab-item :key="tabs.indexOf(tabs.find((el) => (el.tabName === 'MADR Editor')))" style="height: 100%; ">
                <splitpanes class="mx-auto default-theme">
                  <pane class="overflow-y-auto">
                    <v-card-text class="mx-auto">
                      <AdrRepresentation v-model="adr" v-on:input="updateAdr" v-bind:show-optional-fields="showOptionalFields" />
                    </v-card-text>
                  </pane>
                  <pane class="mx-auto overflow-y-auto" v-if="alwaysShowMarkdownPreview">
                    <v-card-text class="mx-auto">
                      <MarkdownPreview v-model="dValue"></MarkdownPreview>
                    </v-card-text>
                  </pane>
                </splitpanes>
              </v-tab-item> <!--end 'MADR Editor'-->
              <v-tab-item :key="tabs.indexOf(tabs.find((el) => (el.tabName === 'Markdown Preview')))" style="height: 100%;" class="mx-auto overflow-y-auto">
                <MarkdownPreview v-model="dValue"></MarkdownPreview>
              </v-tab-item> <!--end 'Markdown Preview'-->
              <v-tab-item :key="tabs.indexOf(tabs.find((el) => (el.tabName === 'Raw Markdown')))" style="height: 100%;">
                <splitpanes class="default-theme">
                  <pane class="mx-auto overflow-y-auto">
                    <v-textarea v-model="dValue" v-on:input="updateMd"
                                auto-grow style="max-width: 100%; min-width: 100%"></v-textarea>
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
                  class="pt-0 mt-0 align-self-end"
                  style="-webkit-flex: 0; flex: 0;">
            <v-checkbox v-if="tabs[tab].tabName !== 'Markdown Preview'"
                        v-model="alwaysShowMarkdownPreview"
                        class="align-self-center mx-4"
                        label="Show Markdown Preview">
            </v-checkbox>
            <v-checkbox v-if="tabs[tab].tabName === 'MADR Editor'"
                        v-model="showOptionalFields"
                        class="align-self-center mx-4"
                        label="Show Optional Fields"></v-checkbox>
            <v-spacer></v-spacer>
            <v-tab v-for="(item, i) in tabs"
                   :key="i">
              {{ item.tabName }}
            </v-tab>
          </v-tabs>
        </pane>
      </splitpanes>
    </v-card-text>
      <v-system-bar>
        Aktuelle Repo: {{ repoName }}
        <v-spacer></v-spacer>
        Current Branch:
        <v-autocomplete dense class="px-4  pt-2"
                        v-model="currentBranch"
                        :items="[branchName, 'branch 1', 'branch 2']"></v-autocomplete>
      </v-system-bar>
  </v-sheet>
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
      tab: 0,
      tabs: [
        { tabName: 'MADR Editor' },
        { tabName: 'Markdown Preview' },
        { tabName: 'Raw Markdown' }
      ],
      alwaysShowMarkdownPreview: false,
      showOptionalFields: true,
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
      }, 300),
      addRepository() {
        console.log('ToDo: Add a Repository.')
      }
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

  .v-select__selections input {
    display: none
  }
</style>
