<template>
  <v-card class="text-left overflow-y-auto" height="100%">
    <codemirror v-model="rawMd" :options="cmOptions"
                @input="update" @scroll="onCmScroll" style="height: 100%"></codemirror>
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
        type: String,
      }
    },
    data() {
      return {
        cmOptions: {
          value: '<p>hello</p>',
          connect: 'align',
          lineWrapping: true,
          mode: 'text/x-markdown',
          lineNumbers: true,
        },
        rawMd: this.value,
      }
    },
    watch: {
      value() {
        console.log('raw value changed')
        this.rawMd = this.value
      }
    },
    methods: {
      onCmScroll() {
        console.log('onCmScroll')
      },
      update: _.debounce(function (ev) {
        console.log('update')
        this.$emit('input', ev)
      }, 300)
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