<template>
    <v-sheet
        flat
        class="compiled-markdown"
        v-html="compiledMarkdown"
        data-cy="markdownPreview"
    ></v-sheet>
</template>

<script>
export default {
    props: ["value"],
    computed: {
        compiledMarkdown: function() {
            var marked = require("marked");
            return marked(this.value);
        }
    }
};
</script>

<style scoped>
div {
    text-align: left;
}
</style>
