<template>
  <div class="text-left">
    <div class="text-left">{{ rootDirectoryPath }}</div>

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
                activatable
                open-on-click
                item-key="path"
                @update:active="selectFile">

      <template v-slot:append>
        <v-btn text >
          <v-icon>
            mdi-delete
          </v-icon>
        </v-btn>
      </template>
    </v-treeview>
  </div>
</template>

<script>
  //import { Teatree, NodeName, NodeToggle } from "vue-teatree";
  import { snakeCase2naturalCase } from '@/plugins/utilities'

  import axios from 'axios'
  export default {
    components: {
      //Teatree, NodeName, NodeToggle
    },
    props: {
      repo: String,
      branch: String
    },
    data: () => ({
      fetchedData: [],
      folderStructure: [],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
    }),
    computed: {
      githubAPITree() {
        return 'https://api.github.com/repos/' + this.repo + '/git/trees/' + this.branch + '?recursive=4'
      },
      githubAPIContents() {
        return 'https://raw.githubusercontent.com/' + this.repo + '/' + this.branch + '/'
      },
      rootDirectoryPath() {
        return this.folderStructure[0] && this.folderStructure[0].path.includes('/') ?
          this.folderStructure[0].path.replace(/[/][^/]*$/, '') : ''
      }
    },
    created() {
      this.fetchData(this.githubAPITree)
    },
    watch: {
      repo() {
        this.fetchData(this.githubAPITree)
      },
      branch() {
        this.fetchData(this.githubAPITree)
      }
    },
    methods: {
      fetchData(api) {
        axios.get(api)
          .then(({ data }) => {
            this.fetchedData = data
            this.folderStructure = this.computeFolderStructureFromData(data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      computeFolderStructureFromData(fetchedData) {
        var fS = []
        fetchedData.tree.forEach(function addToStructure(dataEntry) {
          var path = dataEntry.path.split('/')
          var last = path.pop()
          var parent = fS
          for (var i in path) {
            parent = parent.find(function(val) {
              return val.name == path[i]
            }).children
          }
          parent.push({
            name: last.match("\\d{4}-.*[.]md") ? snakeCase2naturalCase(last).replace('.md', '') : last,
            children: [],
            path: dataEntry.path
          })
        })
        let adrFolder = fS.find((folder) => (folder.name === 'docs'))
        if (adrFolder) adrFolder = adrFolder.children.find((folder) => (folder.name === 'adr'))
        if (adrFolder) {
          fS = adrFolder.children
        }
        return fS
      },
      selectFile(filePath) {
        axios.get(this.githubAPIContents + filePath)
          .then(({ data }) => {
            this.$emit('select-file', data);
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>
  /* @import "~vue-teatree/build/Teatree.css"; */
</style>
