<template>
  <div>
    <v-btn
      href="https://github.com/login/oauth/authorize?client_id=7399c989ae7246112a4d&scope=repo"
    >
      Log In with GitHub
    </v-btn>
    <div>
      <main v-if="user">
        <h1>Latest repositories starred</h1>
        <ul>
          <li v-for="repository in repositories" :key="repository.name">
            <a :href="repository.html_url" target="_blank">{{
              repository.name
            }}</a>
          </li>
        </ul>
        <p v-if="repositories.length === 0">Whoa, such empty!</p>
      </main>
      <div v-else>
        <button @click.prevent="connect">Connect to GitHub</button>
      </div>
    </div>
  </div>
</template>
<script>
import Pizzly from "pizzly-js";

export default {
  name: "connectGitHub",
  components: {},
  data: () => ({
    user: null,
    repositories: [],
  }),
  mounted() {
    // Here we initialize Pizzly.
    console.log("mounted");
    this.$pizzly = new Pizzly({
      host: "adr-manager.herokuapp.com",
      publishableKey: "dpWJ4TU2yCu7ys4Nb6eX5zhv32GV6YcVYYvDJZvS",
    });
  },
  destroyed() {
    console.log("Bye from the git login github component!");
  },
  methods: {
    connect: function() {
      // Here, we create a new method
      // that "connect" a user to GitHub
      console.log("connectFun");
      this.$pizzly
        .integration("github")
        .connect()
        .then(this.connectSuccess)
        .catch(this.connectError);
    },
    connectSuccess: function(data) {
      // On success, we update the user object
      console.log("success");
      console.log(data);
      this.user = data.authId;
      this.fetchStarringRepositories();
    },
    connectError: function(err) {
      console.log("error");
      console.error(err);
      alert("Something went wrong. Look at the logs.");
    },
    fetchStarringRepositories: function() {
      console.log("fetch");
      this.$pizzly
        .integration("github")
        .auth(this.user)
        .get("/user/starred")
        .then((response) => response.json())
        .then((data) => {
          this.repositories = data;
        })
        .catch(this.fetchError);
    },
    fetchError: function(err) {
      console.error(err);
      alert("Something went wrong. Look at the logs.");
    },
  },
};
</script>
