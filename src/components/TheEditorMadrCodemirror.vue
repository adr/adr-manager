<template>
  <v-card flat class="flex-grow-1 py-1 pl-1 text-left flex-shrink-1" :color="color">
    <codemirror v-model="dValue" :options="cmOptions" v-on:input="(ev) => update(ev)" ref="cm"
      v-observe-visibility="visibilityChanged" class="customizedcm"></codemirror>
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
  // theme
  import 'codemirror/theme/lesser-dark.css'

  import 'vue-observe-visibility'
  export default {
    name: 'EditorMadrCodemirror',
    components: {
      codemirror
    },
    props: {
      value: {
        type: String,
        default: ' '
      },
      color: {
        type: String,
        default: 'grey lighten-3'
      }
    },
    data() {
      return {
        dValue: '',
        cmOptions: {
          value: '<p>hello</p>',
          connect: 'align',
          lineWrapping: true,
          mode: 'text/x-markdown',
          lineNumbers: false,
          autoRefresh: true,
        }
      }
    },
    computed: {
      codemirror() {
        return this.$refs.cm.codemirror
      }
    },
    watch: {
      value(newValue) {
        if (this.dValue !== newValue) {
          this.codemirror.setValue(newValue)
          this.codemirror.clearHistory()
        }
      }
    },
    updated() {
      this.codemirror.refresh()
    },
    created() {
      this.dValue = this.value
    },
    mounted() {
      this.codemirror.getDoc().setValue(this.value)
    },
    methods: {
      /** Emit 'input' event.
       */
      update: _.debounce(function () {
        this.$emit('input', this.dValue)
      }, 300),
      /** Refresh code mirror, when it becomes visible, to avoid anomalies.
       */
      visibilityChanged(isVisible) {
        if (isVisible) {
          this.codemirror.refresh()
        }
      }
    }
  };
</script>

<style scoped>
  .customizedcm >>> .CodeMirror {
    background-color: transparent;
    font-family: Arial, monospace;
    font-size: 11pt;
  }
</style>