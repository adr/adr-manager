<template>
  <div class="overflow-y-auto">
    <v-list shaped
            class="text-left">
      <v-subheader>Your Repositories</v-subheader>
      <v-list-item-group>
        <v-list-item v-for="(item, i) in repositoryList"
                     :key="i"
                     v-on:click="selectRepo(item)">
          <v-list-item-icon></v-list-item-icon>
            <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item>
      </v-list-item-group>
      <v-list-item>
        <v-list-item-icon></v-list-item-icon>
        <v-list-item-content>
          <v-btn>Add Repository</v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data: () => ({
      fetchedData: [],
      repositoryList: []
    }),
    props: {
      userName: {
        type: String,
        default: 'adr'
      }
    },
    computed: {
      githubAPIRepos() {
        return 'https://api.github.com/users/' + this.userName + '/repos'
      }
    },
    mounted() {
      this.fetchData(this.githubAPIRepos)
    },
    methods: {
      fetchData(api) {
        axios.get(api)
          .then(({ data }) => {
            this.fetchedData = data
            this.repositoryList = this.computeRepositoryListFromData(data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      computeRepositoryListFromData(fetchedData) {
        var fS = []
        fetchedData.forEach(function addToStructure(dataEntry) {
          fS.push({
            id: dataEntry.id,
            name: dataEntry.full_name,
            treeApi: dataEntry.trees_url.replace('{/sha}', '') + '/' + dataEntry.default_branch,
            data: dataEntry
          })
        })
        return fS
      },
      selectRepo(repository) {
        this.$emit('select-repo', repository.data)
      }
    }
  }
</script>
