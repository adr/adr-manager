<template>
  <v-container fluid class="register text-center px-0 py-0">
    <v-toolbar color="primary" dark>
      <v-spacer></v-spacer>
      <img src="../assets/logo.png" alt="ADR-Manager" height="90%">
      <v-spacer></v-spacer>
      <a href="https://github.com/koppor/adr-manager" target="_blank" style="color: white;"> View on GitHub <v-icon>mdi-open-in-new</v-icon></a>
    </v-toolbar>
    <v-row class="align-center my-16 mx-0">
      <v-col cols="12" sm="1">
        <v-sheet rounded="lg">
          <!--  -->
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="5">
        <v-sheet class="text-right" rounded="lg">
          <!--  -->
          <div>
            Architectural Decision Records are a way to quickly write down Architectural Decisions. <br>
            This tool is meant to make the editing and management of ADRs on GitHub easier.
          </div>
        </v-sheet>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" sm="3">
        <v-sheet class="text-left" rounded="lg">
          <!-- Button to connect to GitHub -->
          <ConnectToGitHubButton />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  // @ is an alias to /src
  import ConnectToGitHubButton from '@/components/ConnectToGitHubButton.vue'

  export default {
    name: 'Editor',
    components: {
      ConnectToGitHubButton
    },
    data: () => ({
    })
  }
</script>