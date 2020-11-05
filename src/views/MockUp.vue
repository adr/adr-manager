<template>
  <v-container fluid class="editor text-center">
      <MockUpMain />
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import MockUpMain from '@/components/MockUp/MockUpMain.vue'
  export default {
    components: {
      MockUpMain,
    }
  }
</script>
