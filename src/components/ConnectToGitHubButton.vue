<template>
  <div>
    <v-btn @click="hasAuthId()">Connect to GitHub</v-btn>
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
      host: "https://adr-manager.herokuapp.com",
      publishableKey: "dpWJ4TU2yCu7ys4Nb6eX5zhv32GV6YcVYYvDJZvS",
    });
  },
  destroyed() {
    console.log("Bye from the git login github component!");
  },
  methods: {
    hasAuthId() {
      if (localStorage.getItem("authId") === null) {
        this.connect();
      } else this.$router.push({ name: "Editor", params: { id: this.user } });
    },
    connect: function () {
      // Here, we create a new method
      // that "connect" a user to GitHub
      this.$pizzly
        .integration("github")
        .connect()
        .then(this.connectSuccess)
        .catch(this.connectError);
    },
    connectSuccess: function (data) {
      // On success, we update the user object
      this.user = data.authId;
      localStorage.setItem("authId", data.authId);
      this.$router.push({ name: "Editor", params: { id: this.user } });
    },
    connectError: function (err) {
      console.log("error");
      console.error(err);
      alert("Something went wrong. Look at the logs.");
    },
  },
};
</script>
