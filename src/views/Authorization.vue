<template>
  <v-row text-align="center">
    <v-col>
      <h2> Authorization ongoing ... </h2>
    </v-col>
  </v-row>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Editor',
  components: {
    },
    mounted() {
      console.log('Hello from the Authorization component!')
      console.log(window.location.href)
      console.log(this.$route.query)
      var code = this.$route.query.code
      this.$router.push({ name: 'MockUp' })
      var axios = require('axios')
      axios.post(
        'https://github.com/login/oauth/access_token', null, {
          params: {
            client_id: '', // TODO: Request from backend?
            client_secret: '',
            code
          },
          headers: {
            Accept: 'application/json'
          }
        }
      ).then( ({ data }) => { console.log(data) } )
    },
    destroyed() {
      console.log('Bye from the Authorization component!')
    },
  data: () => ({
  })
}
</script>
