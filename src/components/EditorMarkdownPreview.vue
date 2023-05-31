<template>
    <v-sheet flat class="compiled-markdown" v-html="compiledMarkdown" data-cy="markdownPreview"></v-sheet>
</template>

<script>
import { marked } from "marked";

export default {
    props: ["value"],
    computed: {
        compiledMarkdown: function () {
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
