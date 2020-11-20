<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%;">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div style="height: 100%; width: 100%; position: absolute; overflow-y:auto">
        <v-list dense multiple>
          <v-list-group v-for="repo in folderStructure"
                        :key="repo.path"
                        :prepend-icon="fileTypeIconMapping[repo.fileType]"
                        :disabled="!folderContainsPath({ folder: repo, path: 'docs/adr' })">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="repo.name"></v-list-item-title>
              </v-list-item-content>

              <DialogRemoveRepository v-bind:repo="{ name: repo.name }" v-if="repo.fileType==='repo'">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                         v-on:click="$emit('remove-repo', repo)"
                         v-bind="attrs"
                         v-on="on">
                    <v-icon>mdi-folder-remove</v-icon>
                  </v-btn>
                </template>
              </DialogRemoveRepository>

            </template>
            <v-list-item-group>
              <v-list-item v-for="file in repo.children"
                           :key="file.path"
                           @click="openFileByPath({ path: file.path })">
                <v-list-item-icon>
                </v-list-item-icon>
                <v-list-item-content> <v-list-item-title v-text="file.name"></v-list-item-title> </v-list-item-content>

                <!-- Button-Icons for copy and delete -->
                <v-list-item-icon>
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                         v-if="file.fileType==='adr' || file.fileType==='md'">
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-btn>

                  <DialogDeleteAdr v-bind:adr="{ name: file.name }">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                             v-if="file.fileType==='adr' || file.fileType==='md'"
                             v-bind="attrs"
                             v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </DialogDeleteAdr>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item inactive>
                <v-btn block @click="createNewAdr({ repository : repo })"><v-icon>mdi-plus</v-icon> New ADR </v-btn>
              </v-list-item>

            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>
    </div>
      <div class="flex-grow-0 d-flex flex-wrap">
        <DialogAddRepositories>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs"
                   v-on="on"
                   class="flex-grow-1 secondary">
              Add Repository
            </v-btn>
          </template>
        </DialogAddRepositories>
        <DialogCommit>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs"
                   v-on="on"
                   class="flex-grow-1 secondary">
              Commit and Push
            </v-btn>
          </template>
        </DialogCommit>
      </div>
    </v-card>
</template>

<script>
  import {
    snakeCase2naturalCase,
    loadFileTreeOfRepository,
    loadRawFile
  } from '@/plugins/utilities'

  import DialogAddRepositories from '@/components/DialogAddRepositories.vue'
  import DialogCommit from '@/components/DialogCommit.vue'
  import DialogDeleteAdr from '@/components/DialogDeleteAdr.vue'
  import DialogRemoveRepository from '@/components/DialogRemoveRepository.vue'
  
  export default {
    components: {
      DialogAddRepositories,
      DialogRemoveRepository,
      DialogCommit,
      DialogDeleteAdr,
    },
    props: {
      user: String,
    },
    data: function () {
      return {
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
      }
    },
    watch: {
      folderStructure() {
        console.log(this.folderStructure)
      }
    },
    created() {
      //this.loadRepositories()
    },
    methods: {
      /* loadRepositories() {
        console.log('Load Repositories for user ' + this.user)
        return loadRepositoriesOfUser(this.user)
          .then((data) => {
            console.log('Loaded Repositories')
            this.repositoryList = this.computeRepositoryListFromData(data)
          })
          .then(() => {
            this.loadFileTreeOfAllRepositories(this.repositoryList)
          })
      },*/
      computeRepositoryListFromData(fetchedData) {
        var repos = []
        fetchedData.forEach(function addToStructure(dataEntry) {
          repos.push({
            id: dataEntry.id,
            name: dataEntry.name,
            fullName: dataEntry.full_name,
            defaultBranch: dataEntry.default_branch,
            data: dataEntry,
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
          children: [],
          itemDisabled: false
        }))
        this.folderStructure.forEach((repo) => {
          loadFileTreeOfRepository(repo.name, repo.branch)
            .then((data) => {
              console.log(data)
              repo.children = this.computeFolderStructureFromData({ data, basePath: repo.name, repository: repo })
              // this.disableInvalidRepositories()
            })
            .catch((err) => {
              console.log(err)
            })
        }
        )
      },

      disableInvalidRepositories() {
        this.folderStructure.forEach((repo) => {
          repo.itemDisabled = !this.folderContainsPath({ folder: repo, path: 'docs/adr'})
        })
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
            fileType: last.includes('.') ? (last.match("\\d{4}-.*[.]md") ? 'adr' : last.split('.').pop()) : 'folder',
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

      createNewAdr({ repository }) {
        console.log('New ADR in ', repository, 'This is not implemented.')
        console.log('New ADR in ', repository, 'This is not implemented.')
        this.$emit('new-adr', repository.path)
      }
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
