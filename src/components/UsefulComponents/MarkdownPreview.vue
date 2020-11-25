<template>
  <div class="compiled-markdown" v-html="compiledMarkdown"></div>
</template>

<script>
export default {
  props: ['value'],
  computed: {
    compiledMarkdown: function() {
      const marked = require('marked');
      return marked(this.value);
    },
  },
};
</script>

<style scoped>
  div {
    text-align: left;
  }
</style>
