<template>
  <v-card fluid class="editor text-left d-flex flex-column px-0 pb-2" id="editor-madr" style="height: 100%">
    <v-card-title> Sorry, we have parsing trouble. </v-card-title>
    <div>
      If you want to use the MADR-Editor, our parser will generate the markdown on the right-hand side.
      You can edit your raw Markdown to make sure that no important content is lost while parsing. <br />
      Note, that we only support MADRs matching the template at
      <a href="https://github.com/adr/madr/blob/master/template/template.md" target="_blank">
        https://github.com/adr/madr/blob/master/template/template.md
      </a>
    </div>

    <div class="d-flex text-center">
      <h5 class="flex-grow-1 text-center">Your ADR</h5>
      <h5 class="flex-grow-1 text-center">Result</h5>
    </div>
    <div class="flex-grow-1 overflow-auto">
      <codemirror ref="compare" class="flex-grow-1" v-model="mergeMd" :merge="true" :options="cmOption"
        @scroll="onCmScroll" v-observe-visibility="visibilityChanged"></codemirror>

    </div>

    <v-btn data-cy="acceptDiv" color="success" @click="accept">Accept</v-btn>
  </v-card>
</template>

<script>
  // require component
  import { adr2md, md2adr } from '@/plugins/parser.js'
  import _ from 'lodash'

  // require component
  import { codemirror } from 'vue-codemirror'
  // require styles
  import 'codemirror/lib/codemirror.css'

  // merge js
  import 'codemirror/addon/merge/merge.js'
  // merge css
  import 'codemirror/addon/merge/merge.css'

  // language
  import 'codemirror/mode/markdown/markdown.js'

  // google DiffMatchPatch
  import DiffMatchPatch from 'diff-match-patch'
  // DiffMatchPatch config with global
  window.diff_match_patch = DiffMatchPatch
  window.DIFF_DELETE = -1
  window.DIFF_INSERT = 1
  window.DIFF_EQUAL = 0

  export default {
    components: {
      codemirror
    },
    props: {
      raw: { // original MD pulled from GitHub
        type: String,
        default: 'Test String',
        required: false // For testing
      }
    },
    data: () => ({
      cmOption: {
        connect: 'align',
        mode: 'text/x-markdown',
        lineNumbers: true,
        lineWrapping: true,
        collapseIdentical: false,
        highlightDifferences: true,
        viewPortMargin: Infinity
      },
      mergeMd: ' ',
    }),
    computed: {
      codemirror() {
        return this.$refs.compare.codemirror
      }
    },
    created() {
      this.mergeMd = this.raw
      this.cmOption.value = this.mergeMd
      this.$set(this.cmOption, 'origRight', adr2md(md2adr(this.mergeMd)))
    },
    watch: {
      mergeMd() {
        this.updateOrig()
      },
      raw: function (newRaw) {
        this.mergeMd = (' ' + newRaw).slice(1);
      }
    },
    methods: {
      onCmScroll() {
        console.log('onCmScroll')
      },
      /** Called when user accepted. Emits 'accept' event.
       */
      accept() {
        console.log('Accept')
        this.$emit('accept', adr2md(md2adr(this.mergeMd)))
      },
      updateOrig: _.debounce(function () {
        this.codemirror.right.orig.setValue(adr2md(md2adr(this.mergeMd)))
      }, 300),
      /** Refresh code mirror, when it becomes visible, to avoid anomalies.
       */
      visibilityChanged(isVisible) {
        if (isVisible) {
          this.codemirror.edit.refresh()
          this.codemirror.right.orig.refresh()
        }
      }
    }
  }
</script>


<style>
  .CodeMirror-merge,
  .CodeMirror-merge .CodeMirror {
    height: auto;
    min-height: 100px;
    /*border-bottom: none;*/
  }
</style>