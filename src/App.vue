<template>
  <v-app id="app" style="height: 100%;">
    <v-main style="height: 100%;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
      //
    })
  };
</script>