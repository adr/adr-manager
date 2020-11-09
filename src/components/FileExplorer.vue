<template>
  <div class="text-left">
    <v-treeview :items="folderStructure"
                dense
                open-on-click
                activatable
                item-key="path"
                @update:active="(activeKeyArray) => { openFileByPath({ path: activeKeyArray[0] }) }">

      <template v-slot:prepend="{ item }">
        <v-icon v-if="item.fileType==='repo'" v-text="fileTypeIconMapping[item.fileType]"></v-icon>
      </template>

      <template slot="label" slot-scope="{ item }">
        <a>{{ item.name }}</a>
      </template>
      <template v-slot:append="{ item }">

        <span v-if="item.fileType==='repo'">
          <span v-if="folderContainsPath({ folder: item, path: 'docs/adr' })">
            docs/adr
          </span>
          <span v-else>
            docs/adr missing <v-icon> mdi-alert-outline </v-icon>
          </span>
        </span>

        <v-menu offset-x v-if="item.fileType==='adr'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="align-self-center ml-0" dense text
                   v-bind="attrs"
                   v-on="on">
              <v-icon v-if="attrs['aria-expanded'] === 'true'">mdi-chevron-right</v-icon> <!--Menu is opened.-->
              <v-icon v-else>mdi-chevron-down</v-icon>
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
  import {
    snakeCase2naturalCase,
    loadRepositoriesOfUser,
    loadFileTreeOfRepository,
    loadRawFile
  } from '@/plugins/utilities'
  export default {
    components: {
    },
    props: {
      user: String,
    },
    data: () => ({
      repositoryList: [],
      folderStructure: [
        {
          name: 'madr',
          path: 'madr',
          fileType: 'repo',
          children: [
            {
              name: 'docs',
              path: 'madr/docs',
              fileType: 'folder',
              children: [
                {
                  name: 'adr',
                  path: 'madr/docs/adr',
                  fileType: 'folder',
                  children: [
                    {
                      name: 'file',
                      path: 'madr/docs/adr/file.md',
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
    created() {
      this.loadRepositories()
    },
    methods: {
      loadRepositories() {
        console.log('Load Repositories for user ' + this.user)
        return loadRepositoriesOfUser(this.user)
          .then((data) => {
            console.log('Loaded Repositories')
            this.repositoryList = this.computeRepositoryListFromData(data)
          })
          .then(() => {
            this.loadFileTreeOfAllRepositories(this.repositoryList)
          })
      },
      computeRepositoryListFromData(fetchedData) {
        var repos = []
        fetchedData.forEach(function addToStructure(dataEntry) {
          repos.push({
            id: dataEntry.id,
            name: dataEntry.name,
            fullName: dataEntry.full_name,
            defaultBranch: dataEntry.default_branch,
            data: dataEntry
          })
        })
        return repos
      },

      loadFileTreeOfAllRepositories: function (repositoryList) {
        this.folderStructure = repositoryList.map((repo) => ({
          name: repo.fullName,
          path: repo.fullName,
          fileType: 'repo',
          branch: repo.defaultBranch,
          children: []
        }))
        this.folderStructure.forEach((repo) => {
          loadFileTreeOfRepository(repo.name, repo.branch)
            .then((data) => {
              repo.children = this.computeFolderStructureFromData({ data, basePath: repo.name, repository: repo })
            })
            .catch((err) => {
              console.log(err)
            })
        }
        )
      },

      // For one repository
      computeFolderStructureFromData({ data, basePath, repository }) {
        var fS = []
        data.forEach(function addToStructure(dataEntry) {
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
            path: basePath + '/' + dataEntry.path,
            fileType: last.includes('.') ? (last.match("\\d{4}-.*[.]md") ? 'adr' : last.split('.')[-1]) : 'folder',
            repository
          })
        })

        let adrFolder = fS.find((folder) => (folder.name === 'docs'))
        if (adrFolder) adrFolder = adrFolder.children.find((folder) => (folder.name === 'adr'))
        if (adrFolder) {
          fS = adrFolder.children
        }
        return fS
      },

      folderContainsPath({ folder, path }) {
        let searchedDirectory = getFileByPath({ folder: folder, path: folder.path + '/' + path });
        return typeof searchedDirectory !== 'undefined';
      }, 

      selectRepo(repository) {
        console.log('select repo')
        this.$emit('select-repo', repository.data)
      },

      openFileByPath({ path }) {
        if (typeof path === 'undefined') {
          console.log('Can\'t open file at an undefined path.')
          return 
        }
        console.log('Open file by path: ' + path)
        let file = getFileByPath({ folder: this.folderStructure, path })
        this.openFile({ repoFullName: file.repository.name, branch: file.repository.branch, filePath: file.path.replace(file.repository.name, '') })
      },

      openFile({ repoFullName, branch, filePath }) {
        if (typeof repoFullName === 'string' && typeof branch === 'string' && typeof filePath === 'string') {
          loadRawFile(repoFullName, branch, filePath)
            .then(({ data }) => {
              this.$emit('open-file', data);
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('Open File Failed :(')
        }
      },

    }
  }
  // Private methods

  function getFileByPath({ folder, path }) {
    if (typeof path !== 'string') {
      console.log('A file path must be a string, but this isn\'t: ')
      console.log(path)
      return
    }

    let searchedFile = folder ? folder : this.folderStructure
    if (!searchedFile.path) {
      searchedFile = searchedFile.find((file) => (path.startsWith(file.path))) //= this.folderStructure.find((repo) => (remainingPath.startsWith(repo.name)))
    }

    let found = false
    while (!found) {
      if (searchedFile) {
        if (searchedFile.path === path) {
          return searchedFile
        } else if (searchedFile.path.startsWith(path)) {
          // The file path of the searched file can be longer, iff paths are skipped in the folder structure. 
          // E.g. if a folder or repository 'adr/madr' directly contains 'adr/madr/docs/adr/XXXX-...md'.
          return searchedFile
        }
        searchedFile = searchedFile.children.find((file) => (path.startsWith(file.path) || file.path.startsWith(path)))
      } else {
        return searchedFile
      }
    }

    return searchedFile
  }
</script>

<style scoped>
</style>
