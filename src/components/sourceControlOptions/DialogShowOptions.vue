<template>
    <v-dialog v-model="dialogOpen" width="700">
        <template v-slot:activator="{ on, attrs }">
            <slot name="activator" v-bind:on="on" v-bind:attrs="attrs"> </slot>
            <v-overlay>
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </template>
        <v-card class="d-flex flex-column" data-cy="loadOptions">
            <div class="text-right">
                <v-btn icon @click="closeDialog">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center m-5">
                <SignInWithGithubFree />
                <SignInWithGithubEnterprise />
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
import SignInWithGithubFree from './github/SignInWithGithubFree.vue';
import SignInWithGithubEnterprise from './github/SignInWithGithubEnterprise.vue';
export default {
    data() {
        return {
            dialogOpen: true,
        };
    },
    mounted() {
        console.log('dialog show option mounted');
    },
    methods: {
        closeDialog() {
            this.$emit('close-dialog');
        },
    },
    components: { SignInWithGithubFree, SignInWithGithubEnterprise }
};
</script>