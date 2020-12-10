<template>
  <v-card class="d-flex flex-column">
    <v-card-text
      class="px-0 py-0 my-0"
      style="position: relative; height: 100%"
    >
      <v-tabs-items
        v-model="tab"
        style="position: absolute; height: 100%; width: 100%; "
      >
        <v-tab-item :value="'MADR Editor'" style="height: 100%; ">
          <splitpanes class="mx-auto default-theme">
            <pane style="height: 100%;">
              <v-card-text
                class="mx-auto mx-0 my-0 px-0 py-0"
                style="height: 100%;"
              >
                <EditorMadr
                  style="height: 100%;"
                  class="mx-auto mx-0 my-0 px-0 py-0"
                  v-model="adr"
                  v-on:input="updateAdrToMd"
                />
              </v-card-text>
            </pane>
            <pane
              class="mx-auto overflow-y-auto"
              v-if="alwaysShowMarkdownPreview"
            >
              <v-card class="mx-auto">
                <MarkdownPreview v-model="dValue"></MarkdownPreview>
              </v-card>
            </pane>
          </splitpanes>
        </v-tab-item>
        <!--end 'MADR Editor'-->
        <v-tab-item :value="'Convert'" style="height: 100%;">
          <EditorDiff :raw="dValue" v-on:accept="acceptAfterDiff" />
        </v-tab-item>
        <!--end 'Compare MD'-->
        <v-tab-item
          :value="'Markdown Preview'"
          style="height: 100%;"
          class="mx-auto overflow-y-auto"
        >
          <MarkdownPreview v-model="dValue"></MarkdownPreview>
        </v-tab-item>
        <!--end 'Markdown Preview'-->
        <v-tab-item :value="'Raw Markdown'" style="height: 100%;">
          <splitpanes class="default-theme">
            <pane class="mx-auto overflow-y-hidden height: 100%">
              <EditorRaw
                v-model="dValue"
                v-on:input="updateMdToAdr"
                style="max-width: 100%; min-width: 100%; height: 100%"
              ></EditorRaw>
            </pane>
            <pane
              v-if="alwaysShowMarkdownPreview"
              class="mx-auto overflow-y-auto"
            >
              <v-card>
                <MarkdownPreview v-model="dValue"></MarkdownPreview>
              </v-card>
            </pane>
          </splitpanes>
        </v-tab-item>
        <!--end 'Raw Editor'-->
      </v-tabs-items>
    </v-card-text>

    <v-toolbar dense class="my-0 py-0">
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
        dense
        class="pt-0 mt-0 align-self-end"
      >
        <!--<v-checkbox v-if="tab !== 'Markdown Preview'"
              v-model="alwaysShowMarkdownPreview"
              class="align-self-center mx-4"
              label="Show Markdown Preview">
        </v-checkbox>-->

        <v-spacer></v-spacer>
        <v-tab v-for="(item, i) in displayedTabs" :key="i" :href="'#' + item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </v-card>
</template>

<script>
import _ from "lodash";
import { ArchitecturalDecisionRecord } from "@/plugins/classes";
import { md2adr, adr2md } from "@/plugins/parser";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import EditorMadr from "./TheEditorMadr.vue";
import EditorDiff from "./TheEditorDiff.vue";
import EditorRaw from "./TheEditorRaw.vue";
import MarkdownPreview from "./UsefulComponents/MarkdownPreview.vue";

export default {
  name: "Editor",
  components: {
    Splitpanes,
    Pane,
    EditorMadr,
    EditorDiff,
    EditorRaw,
    MarkdownPreview,
  },
  props: {
    filePath: String,
    value: {
      type: String,
      default: adr2md(new ArchitecturalDecisionRecord()),
    },
    userName: {
      type: String,
      default: "adr",
    },
    repoName: {
      type: String,
      default: "madr",
    },
    branchName: {
      type: String,
      default: "master",
    },
  },
  data: () => ({
    adr: {},
    dValue: "# Default ADR Editor heading",
    tab: "MADR Editor",
    tabs: ["MADR Editor", "Markdown Preview", "Raw Markdown"],
    alwaysShowMarkdownPreview: false,
    _,
  }),
  computed: {
    editingAllowed() {
      return Boolean(
        this.tab === "MADR Editor" ||
          (typeof this.dValue === "string" &&
            adr2md(md2adr(this.dValue)) === this.dValue)
      );
    },
    displayedTabs() {
      let dTabs = !this.editingAllowed
        ? this.tabs.map((val) => {
            if (val === "MADR Editor") return "Convert";
            else return val;
          })
        : this.tabs;
      return dTabs;
    },
  },
  created() {
    this.dValue = (" " + this.value).slice(1);
    this.adr = md2adr(this.value);
    this.currentBranch = this.branchName;
  },

  watch: {
    /**This method is called whenever the value prop changes.
     * When the MADR Editor is opened and the new value cannot be parsed perfectly, the Convert-Tab will be opened.
     * (This is the main reason, why the parent component should not change the value-prop unless when opening an other ADR.)
     */
    value(newValue) {
      this.dValue = (" " + newValue).slice(1);
      let tmpAdr = md2adr(newValue);
      if (this.dValue === adr2md(tmpAdr)) {
        // If the parser did a perfect job, update the ADR.
        this.adr = tmpAdr;
        if (this.tab === "Convert") {
          this.tab = "MADR Editor";
        }
        console.log("Updated ADR");
      } else if (this.tab === "MADR Editor") {
        // Else ask the user to review his ADR.
        this.tab = "Convert";
      }
    },
    dValue(newValue) {
      this.$emit("input", newValue);
    },
  },
  methods: {
    updateAdrToMd(adr) {
      if (this.tab === "MADR Editor") {
        this.dValue = adr2md(adr);
        this.$emit("adr-file", adr);
      }
    },
    updateMdToAdr(md) {
      if (this.tab !== "MADR Editor") {
        this.adr = md2adr(md);
      }
    },
    acceptAfterDiff(md) {
      console.log("Accept in Editor - Switching Tab.");
      this.updateMdToAdr(md);
      this.tab = "MADR Editor";
    },
    logNotImplemented() {
      console.log("Not implemented.");
    },
  },
};
</script>
