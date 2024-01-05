<template>
    <v-btn @click="signIn" color="primary" class="my-2" data-cy="signInWithGithubFree">
        <v-icon left>mdi-github</v-icon>
        Sign In with GitHub
    </v-btn>
</template>

<script>
import { signInWithGithub } from './signInWithGithub';
export default {
    name: "SignInWithGithubFree",
    methods: {
        signIn() {
            console.log('came here')
            signInWithGithub()
                .then(({ token, user }) => {
                    localStorage.setItem("authId", token);
                    localStorage.setItem("user", user?.reloadUserInfo?.screenName);
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
