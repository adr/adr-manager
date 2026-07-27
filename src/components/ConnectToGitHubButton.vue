<template>
    <div>
        <v-btn @click="connect()">Connect to GitHub</v-btn>
    </div>
</template>

<script>
export default {
    name: "connectGitHub",
    mounted() {
        if (localStorage.getItem("authId")) {
            this.$router.push({ name: "Editor" });
        }
    },
    methods: {
        connect() {
            if (localStorage.getItem("authId")) {
                this.$router.push({ name: "Editor" });
            } else {
                window.location.assign("/api/login");
            }
        }
    }
};
</script>
