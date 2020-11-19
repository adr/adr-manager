<template>
  <v-card class="flex-grow-1 py-1 text-left flex-shrink-1">
    <codemirror v-model="dValue" :options="cmOptions" v-on:input="(ev) => update(ev)"
                ref="cm"></codemirror>
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
        }
      }
    },
    computed: {
      codemirror() {
        return this.$refs.cm.codemirror.getDoc()
      }
    },
    watch: {
      value() {
        if (this.dValue !== this.value) {
          // console.log('CodemirrorDoc', this.codemirror)
          this.codemirror.setValue(this.value)
        }
      }
    },
    created() {
      this.dValue = this.value
    },
    mounted() {
      // console.log('Codemirror mounted')
      this.codemirror.setValue(this.value)
    },
    methods: {
      update: _.debounce(function () {
        this.$emit('input', this.dValue)
      }, 300)
    }
  };
</script>

<style scoped>
  textarea {
    padding: 20px;
  }
</style>
