<template>
  <v-card flat class="flex-grow-1 py-1 pl-2 text-left flex-shrink-1" :color="color"
    v-observe-visibility="visibilityChanged" v-resize @resize="refresh()">
    <codemirror v-model="dValue" :options="cmOptions" v-on:input="(ev) => update(ev)" ref="cm" class="customizedcm"
      @blur="$emit('blur')" @focus="$emit('focus')"></codemirror>
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
          lineNumbers: false
        },

        isVisible: true,
        /**Refreshes the code mirror to avoid update anomalies.
         * This method is a data property, because it must be unique for every cm instance.
         */
        refresh: _.debounce(function () {
          if (this.isVisible) {
            this.codemirror.refresh();
          }
        }, 100)
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
          this.codemirror.setValue(newValue);
          this.codemirror.clearHistory();
        }
      }
    },
    updated() {
      this.codemirror.refresh()
    },
    created() {
      this.dValue = this.value;
    },
    mounted() {
      this.dValue = this.value;
      this.codemirror.setValue(this.value);
    },
    methods: {
      /** Emit 'input' event.
       */
      update: _.debounce(function () {
        this.$emit('input', this.dValue)
      }, 0),
      visibilityChanged(isVisible) {
        this.isVisible = isVisible;
        if (isVisible) {
          this.codemirror.refresh();
        }
      },

      /**
       * Focuses the text field of this component.
       * May be called by parent components.
       */
      focus() {
        this.$nextTick(() => {
          this.codemirror.focus();
          this.codemirror.setCursor({
            line: 1,
            ch: 1,
          });
        })
      }
    }
  };
</script>

<style scoped>
  .customizedcm>>>.CodeMirror {
    background-color: transparent;
    font-family: Arial, monospace;
    font-size: 11pt;
  }
</style>