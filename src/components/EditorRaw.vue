<template>
  <v-card class="text-left overflow-y-auto" height="100%">
    <codemirror data-cy="markdownText" v-model="rawMd" @input="update" :options="cmOptions" ref="cm" v-observe-visibility="visibilityChanged">
    </codemirror>
  </v-card>
</template>

<script>
  import _ from 'lodash'

  // require component
  import { codemirror } from 'vue-codemirror'
  // require styles
  import 'codemirror/lib/codemirror.css'
  // language
  import 'codemirror/mode/markdown/markdown.js'

  export default {
    components: {
      codemirror
    },
    props: {
      value: {
        type: String
      }
    },
    data() {
      return {
        cmOptions: {
          value: '<p>hello</p>',
          connect: 'align',
          lineWrapping: true,
          mode: 'text/x-markdown',
          lineNumbers: true
        },
        rawMd: this.value
      }
    },
    computed: {
      codemirror() {
        return this.$refs.cm.codemirror
      }
    },
    watch: {
      value() {
        this.rawMd = this.value
      }
    },
    methods: {
      update: _.debounce(function (ev) {
        this.$emit('input', ev)
      }, 300),
      /** Refresh code mirror, when it becomes visible, to avoid anomalies.
       */
      visibilityChanged(isVisible) {
        if (isVisible) {
          this.codemirror.refresh()
        }
      }
    }
  }
</script>

<style>
  .CodeMirror {
    height: auto;
  }

  textarea {
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }
</style>