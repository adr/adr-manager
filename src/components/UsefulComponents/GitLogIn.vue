<template>
  <div>
    <v-btn :href="githubAuthorizeUrl">
      Log In with GitHub
    </v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      text: 'Text',
      githubAuthorizeUrl: 'https://github.com/login/oauth/authorize?client_id=2a2586230dd928a44291'
    }),
    methods: {
      authorizeToGitHub() {
        window.location.href = this.githubAuthorizeUrl
      }
    }
  };
</script>

<style>
</style>
