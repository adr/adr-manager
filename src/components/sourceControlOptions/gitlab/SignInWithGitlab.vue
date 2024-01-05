<template>
    <v-btn @click="signIn" color="primary" class="my-2">
        <v-icon left>mdi-gitlab</v-icon>
        Sign In with Gitlab
    </v-btn>
</template>

<script>
import { signInWithGitlab } from './signInWithGitlab';

export default {
    name: "SignInWithGitlab",
    methods: {
        signIn() {
            signInWithGitlab()
                .then(({ token, user }) => {
                    localStorage.setItem("authId", token);
                    localStorage.setItem("user", user?.reloadUserInfo?.localId);
                    this.$router.push({
                        name: "Editor",
                        params: { id: user }
                    });
                })
                .catch((error) => {
                    console.error("Sign In Error", error);
                });
        }
    }
}
</script>
