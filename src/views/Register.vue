<template>
  <v-container fluid class="register text-center">
    <h2>
      Register
    </h2>
    <GitLogIn />
  </v-container>
</template>

<script>
// @ is an alias to /src
  import GitLogIn from '@/components/UsefulComponents/GitLogIn.vue'

export default {
  name: 'Editor',
  components: {
    GitLogIn
  },
  data: () => ({
  })
}
</script>
