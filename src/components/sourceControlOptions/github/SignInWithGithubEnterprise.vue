<template>
    <v-btn @click="signIn" color="primary" class="my-2">
        <v-icon left>mdi-github</v-icon>
        Sign In with GitHub Enterprise Version
    </v-btn>
</template>

<script>
import { signInWithGithub } from './signInWithGithub';
export default {
    name: "SignInWithGithubEnterprise",
    methods: {
        signIn() {
            console.log('came here')
            signInWithGithub("https://your-github-enterprise-instance.com")
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