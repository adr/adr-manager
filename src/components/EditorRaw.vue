<template>
  <v-card class="text-left overflow-y-auto" height="100%">
    <codemirror data-cy="markdownText" v-model="rawMd" @input="update" @cursorActivity="dragMethod"  :options="cmOptions" ref="cm" v-observe-visibility="visibilityChanged">
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
          lineNumbers: true,
          file: '',
          files: [],
          name: '',
          dragDrop: true,
          extraKeys: {
        "Ctrl-V": this.pasteMethod
      }
        },
        rawMd: this.value,
        controlDragDrop: true
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
      },
      dragMethod(cm) {
        // Check if files were dropped
        cm.on("drop", (data, e) => {
        this.files = e.dataTransfer.files;
        if (this.files.length > 0 && this.controlDragDrop) {
          e.preventDefault();
          e.stopPropagation();
          this.file = this.files[0];
          this.name = this.file.name.replace(/\.[^/.]+$/, "");
          this.rawMd += '![' + this.name +']('+ URL.createObjectURL(this.file) + ')';
          this.controlDragDrop = false;
          return false;
        }});
        this.controlDragDrop = true;
        
    },
    pasteMethod(cm){
        //TODO Copy-paste with ctrl+v implementation
        console.log(cm);
        this.controlDragDrop = true;
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