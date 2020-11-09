<template>
  <v-container fluid class="px-0 py-0">
    <!-- added a navbar -->
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand mb-0 h2">ADR-Manager</span>
    </nav>

    <!-- wrapped the data component in a container -->
    <div class="container">
      <!-- inject the Data component -->
      <Data />
    </div>
  </v-container>
</template>

<script>
  // import the data component
  import Data from "@/components/Data.vue";
  export default {
    name: "app",
    components: {
      Data
    }
  };
</script>

<style>
  /* global styles */
  body {
    background-color: #fefefe;
  }

  .asset {
    word-break: break-all;
  }

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
</style>
