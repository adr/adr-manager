<template>
  <v-card fluid>
        <v-tabs v-model="currentTab"
                align-with-title>
          <v-tab v-for="(item, i) in tabs"
                 :key="i">
            {{ item }}
          </v-tab>
        </v-tabs>

    <v-tabs-items v-model="currentTab">
      <v-tab-item :key="tabs.indexOf('Repositories')">
        <v-card flat>
          <ShowRepos v-on:select-repo="openRepo"></ShowRepos>
        </v-card>
      </v-tab-item>
      <v-tab-item :key="tabs.indexOf('Editor')">
        <v-card flat>
          <Editor v-bind:repo-name="repoName"
                  v-bind:branch-name="branchName"></Editor>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  import ShowRepos from '../UsefulComponents/ShowRepos.vue'
  import Editor from '../Editor/AdrEditor.vue'
  export default {
    components: {
      ShowRepos,
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
