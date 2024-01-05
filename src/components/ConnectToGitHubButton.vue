<template>
    <div>
        <v-btn data-cy="connectToGithub" @click="connectClick()">
            Connect to GitHub
        </v-btn>
        <DialogShowOptions v-if="dialogComponentVisible" @close-dialog="onDialogClose" />
    </div>
</template>

<script>
import DialogShowOptions from "./DialogShowOptions.vue"
export default {
    name: "connectGitHub",
    components: {
        DialogShowOptions
    },
    data: () => ({
        user: null,
        repositories: [],
        dialogComponentVisible: false,
    }),
    mounted() {
        console.log("mounted");
    },
    destroyed() {
        console.log("Bye from the git login github component!");
    },
    methods: {
        connectClick() {
            this.hasAuthId()
        },
        hasAuthId() {
            if (localStorage.getItem("authId") === null) {
                this.dialogComponentVisible = true
                // this.signInWithGithub();
            } else {
                this.$router.push({
                    name: "Editor",
                    params: { id: this.user }
                });
            }
        },
        onDialogClose() {
            this.dialogComponentVisible = false
        },
    }
};
</script>
