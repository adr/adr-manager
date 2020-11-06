<template>
  <div class="text-left">

    <!--<Teatree :roots="folderStructure">
      <template slot="node-toggle" slot-scope="{ node }">
        <NodeToggle :node="node" />
      </template>
      <template slot="node-name" slot-scope="{ node }">
        <NodeName :node="node"
                  :handleNodeLeftClick="(node) => {selectFile(node.data.path)}"
                  :handleNodeRightClick="() => {}" />
      </template>
    </Teatree>-->
    <v-treeview :items="folderStructure"
                dense
                open-on-click
                item-key="path"
                @update:active="selectFile">

      <template v-slot:prepend="{ item }">
        <v-icon v-text="fileTypeIconMapping[item.fileType]"></v-icon>
      </template>
      <template v-slot:append="{ item }">

        <span v-if="item.fileType==='repo'">
          <span v-if="folderContainsPath(item, ['docs', 'adr'])">
            docs/adr
          </span>
          <span v-else>
            docs/adr missing <v-icon> mdi-alert-outline </v-icon>
          </span>
        </span>

        <v-menu offset-y v-if="item.fileType==='adr'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="align-self-center ml-4" dense text
                   v-bind="attrs"
                   v-on="on">
              <v-icon v-if="attrs['aria-expanded'] === 'true'">mdi-chevron-down</v-icon> <!--Menu is opened.-->
              <v-icon v-else>mdi-chevron-right</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in ['Edit', 'Copy', 'Delete']"
                         :key="index"
                         link>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </template>
    </v-treeview>
  </div>
</template>

<script>
  // import _ from 'lodash'
  import axios from 'axios'

  //import { Teatree, NodeName, NodeToggle } from "vue-teatree";
  import { snakeCase2naturalCase } from '@/plugins/utilities'

  export default {
    components: {
      //Teatree, NodeName, NodeToggle
    },
    props: {
      user: String,
      repo: String,
      branch: String
    },
    data: () => ({
      fetchedData: [],
      repositoryList: [],
      folderStructure: [
        {
          name: 'madr',
          path: 'madr',
          fileType: 'repo',
          children: [
            {
              name: 'docs',
              path: 'docs',
              fileType: 'folder',
              children: [
                {
                  name: 'adr',
                  path: 'docs/adr',
                  fileType: 'folder',
                  children: [
                    {
                      name: 'file',
                      path: 'docs/adr/file.md',
                      fileType: 'md',
                      children: []
                    }
                  ],
                }
              ]
            }
          ]
        },
        {
          name: 'other-rep',
          path: 'other-rep',
          fileType: 'repo',
          children: [
            {
              name: 'doc',
              path: 'doc',
              fileType: 'folder',
              children: [
                {
                  name: 'adr',
                  path: 'docs/adr',
                  fileType: 'folder',
                  children: [
                    {
                      name: 'file',
                      path: 'docs/adr/file1.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file2.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file3.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file4.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file5.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file6.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file7.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file8.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file9.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file10.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file11.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file12.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file13.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file14.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file15.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file16.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file17.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file18.md',
                      fileType: 'md',
                      children: []
                    },
                    {
                      name: 'file',
                      path: 'docs/adr/file19.md',
                      fileType: 'md',
                      children: []
                    }

                  ]
                }
              ]
            }
          ]
        }
      ],
      fileTypeIconMapping: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        repo: 'mdi-folder-star',
        folder: 'mdi-folder'
      },
    }),
    computed: {
      githubAPITree() {
        return 'https://api.github.com/repos/' + this.repo + '/git/trees/' + this.branch + '?recursive=4'
      },
      githubAPIContents() {
        return 'https://raw.githubusercontent.com/' + this.repo + '/' + this.branch + '/'
      },
      githubAPIRepos() {
        return 'https://api.github.com/users/' + this.user + '/repos'
      }
    },
    created() {
      console.log('Created ' + (this.githubAPIRepos))
      this.loadRepositories(this.githubAPIRepos)
    },
    methods: {
      loadRepositories(repoApi) {
        return axios.get(repoApi)
          .then(({ data }) => {
            console.log('Load Repositories')
            this.fetchedData = data
            this.repositoryList = this.computeRepositoryListFromData(data)
                                      .slice(0, 3) // For testing to reduce number of requests
            this.loadContentsForAllRepositories(this.repositoryList)
            console.log('Loaded Repositories')
          })
          .catch((err) => {
            console.log(err)
          })
      },
      computeRepositoryListFromData(fetchedData) {
        var repos = []
        // var getGithubContentsAPI = this.getGithubContentsAPI
        fetchedData.forEach(function addToStructure(dataEntry) {
          repos.push({
            id: dataEntry.id,
            name: dataEntry.name,
            fullName: dataEntry.full_name,
            defaultBranch: dataEntry.default_branch,
            // treeApi: dataEntry.trees_url.replace('{/sha}', '') + '/' + dataEntry.default_branch,
            data: dataEntry
          })
        })
        return repos
      },

      loadContentsForAllRepositories: function (repositoryList) {
        console.log('Load Contents For All Repositories in')
        console.log(repositoryList)
        var getGithubContentsAPI = this.getGithubContentsAPI
        var getGithubTreeAPI = this.getGithubTreeAPI
        this.folderStructure = repositoryList.map((repo) => ({
          name: repo.fullName,
          path: getGithubContentsAPI(repo.fullName, repo.defaultBranch),
          fileType: 'repo',
          treeApi: getGithubTreeAPI(repo.fullName, repo.defaultBranch),
          children: []
        }))
        this.folderStructure.forEach((repo) => {
          axios.get(repo.treeApi)
            .then(({ data }) => {
              this.fetchedData = data
              repo.children = this.computeFolderStructureFromData(data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        )
      },

      // For one repository
      computeFolderStructureFromData(fetchedData) {
        var fS = []
        fetchedData.tree.forEach(function addToStructure(dataEntry) {
          var path = dataEntry.path.split('/')
          var last = path.pop()
          var parent = fS
          for (var i in path) {
            parent = parent.find(function (val) {
              return val.name == path[i]
            }).children
          }
          parent.push({
            name: last.match("\\d{4}-.*[.]md") ? snakeCase2naturalCase(last).replace('.md', '') : last,
            children: [],
            path: dataEntry.path,
            fileType: last.includes('.') ? (last.match("\\d{4}-.*[.]md") ? 'adr' : last.split('.')[-1]) : 'folder'
          })
        })
        let adrFolder = fS.find((folder) => (folder.name === 'docs'))
        if (adrFolder) adrFolder = adrFolder.children.find((folder) => (folder.name === 'adr'))
        if (adrFolder) {
          fS = adrFolder.children
        }
        return fS
      },

      folderContainsPath(folder, path) {
        let searchedDirectory;
        searchedDirectory =
          (folder.children[0] && folder.children[0].path.startsWith(path.join('/'))) ||
          path.reduce((folder, name) => (
          folder && folder.children &&
          folder.children.find((file) => (file.name === name))
          ), folder)
        console.log(folder)
        console.log(searchedDirectory)
        console.log(typeof searchedDirectory !== 'undefined')
        return typeof searchedDirectory !== 'undefined'
      },

      selectRepo(repository) {
        console.log('select repo')
        this.$emit('select-repo', repository.data)
      },
      selectFile(filePath) {
        console.log('select file')
        console.log(filePath)
        console.log(this.folderStructure)

        axios.get(filePath)
          .then(({ data }) => {
            this.$emit('select-file', data);
          })
          .catch((err) => {
            console.log(err)
          })
      },

      getGithubTreeAPI(repoFullName, branch) {
        return 'https://api.github.com/repos/' + repoFullName + '/git/trees/' + branch + '?recursive=4'
      },
      getGithubContentsAPI(repoFullName, branch) {
        return 'https://raw.githubusercontent.com/' + repoFullName + '/' + branch + '/'
      },
      getGithubReposAPI(userName) {
        return 'https://api.github.com/users/' + userName + '/repos'
      },

    }
  }
</script>

<style scoped>
  /* @import "~vue-teatree/build/Teatree.css"; */
</style>
