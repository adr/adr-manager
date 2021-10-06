<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon class="mx-1" v-on="on">mdi-help-circle-outline</v-icon>
        </template>
        <div style="max-width: 400px">
            <slot />
        </div>
    </v-tooltip>
</template>

<script>
export default {
    name: "helpIcon",
    components: {},
    data: () => ({
        user: null,
        repositories: []
    }),
    mounted() {},
    destroyed() {},
    methods: {}
};
</script>
