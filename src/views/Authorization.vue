<template>
  <v-row text-align="center">
    <v-col>
      <h2>Authorization ongoing ...</h2>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'Editor',
  components: {},
  data: () => ({
    tokenPath: 'http://localhost:5000/token',
  }),
  mounted() {
    console.log('Hello from the Authorization component!');
    console.log(window.location.href);
    console.log(this.$route.query);

    // After we have received the authorisation from the user, a code is provided in the url with which we can request the token.
    const currURL = document.URL;
    const formData = new FormData();
    formData.append('code', currURL.split('?code=')[1]);

    axios
        .post(this.tokenPath, formData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
        // eslint-disable-next-line
        console.error(error);
        });

    this.$router.push({name: 'Editor'});
  },
  destroyed() {
    console.log('Bye from the Authorization component!');
  },
};
</script>
