<template>
  <v-container fluid class="register text-center">
    <h1>
      ADR Manager
    </h1>
    <h2>
      Log In
    </h2>
    <GitLogIn />
  </v-container>
</template>

<script>
// @ is an alias to /src
import GitLogIn from '@/components/UsefulComponents/GitLogIn.vue';

export default {
  name: 'Editor',
  components: {
    GitLogIn,
  },
  data: () => ({}),
};
</script>
