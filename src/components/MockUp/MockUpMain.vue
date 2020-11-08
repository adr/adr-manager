<template>

  <!--
  <v-card-text class="px-0 py-0 d-flex flex-column">
    <v-tabs v-model="currentTab"
            align-with-title>
      <v-tab v-for="(item, i) in tabs"
             :key="i">
        {{ item }}
      </v-tab>
      <v-spacer></v-spacer>
      <v-btn class="align-self-center mr-4" to="/">Log Out</v-btn>
    </v-tabs>
    <v-tabs-items v-model="currentTab" style="height: 100%">
      <v-tab-item :key="tabs.indexOf('Repositories')" style="height: 100%">
        <v-card-text style="height: 100%;">
          <ShowRepos v-on:select-repo="openRepo"
                     style="height: 100%;"></ShowRepos>
        </v-card-text>
      </v-tab-item>
      <v-tab-item :key="tabs.indexOf('Editor')" style="height: 100%">
        <Editor v-bind:repo-name="repoName"
                v-bind:branch-name="branchName"
                style="height: 100%;">

          <template v-slot:menu-buttons>
            <v-btn class="align-self-center" to="/">Log Out</v-btn>
          </template>
        </Editor>
      </v-tab-item>
    </v-tabs-items>
  </v-card-text>
  -->
  <Editor v-bind:repo-name="repoName"
          v-bind:branch-name="branchName"
          style="height: 100%;">

    <template v-slot:menu-buttons>
      <v-btn class="align-self-center" to="/">Log Out</v-btn>
    </template>
  </Editor>
</template>

<script>
  // import ShowRepos from '../UsefulComponents/ShowRepos.vue'
  import Editor from '../Editor/Editor.vue'
  export default {
    components: {
      // ShowRepos,
      Editor
    },
    data: () => ({
      currentTab: 'Editor',
      repoName: 'adr/madr',
      branchName: 'master'
    }),
    computed: {
      tabs() {
        return ['Repositories', 'Editor']
      }
    },
    methods: {
      openRepo(repositoryData) {
        this.repoName = repositoryData.full_name
        this.branchName = repositoryData.default_branch
        this.currentTab = this.tabs.indexOf('Editor')
      }
    }
  }
</script>

<style>
  html {
    overflow-y: auto;
  } 
</style>