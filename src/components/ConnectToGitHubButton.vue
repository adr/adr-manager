<template>
    <div>
        <v-btn @click="hasAuthId()">Connect to GitHub</v-btn>
    </div>
</template>

<script>
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth, GithubProvider } from "../plugins/firebase/client";
export default {
    name: "connectGitHub",
    components: {},
    data: () => ({
        user: null,
        repositories: []
    }),
    mounted() {
        console.log("mounted");
    },
    destroyed() {
        console.log("Bye from the git login github component!");
    },
    methods: {
        hasAuthId() {
            if (localStorage.getItem("authId") === null) {
                this.signInWithGithub();
            } else {
                this.$router.push({
                    name: "Editor",
                    params: { id: this.user }
                });
            }
        },
        signInWithGithub: async function () {
            GithubProvider.addScope("repo read:user gist workflow read:org");
            return signInWithPopup(auth, GithubProvider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                    localStorage.setItem("authId", token);
                    localStorage.setItem("user", user?.reloadUserInfo?.screenName);
                    this.$router.push({
                        name: "Editor",
                        params: { id: this.user }
                    });
                })
                .catch((error) => {
                    console.error("SignIn Error", error);
                });
        }
    }
};
</script>
