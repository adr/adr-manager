<template>
  <v-card flat class="text-left d-flex flex-column" style="height: 100%;">
    <div style="-webkit-flex-grow: 1; flex-grow: 1; position: relative">
      <div style="height: 100%; width: 100%; position: absolute; overflow-y:auto">
        <v-list dense multiple>
          <v-list-group v-for="repo in folderStructure" :key="repo.path"
            :prepend-icon="fileTypeIconMapping[repo.fileType]"
            :disabled="!folderContainsPath({ folder: repo, path: 'docs/adr' })">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="repo.name"></v-list-item-title>
              </v-list-item-content>

              <DialogRemoveRepository v-bind:repo="{ name: repo.name }" v-if="repo.fileType==='repo'" @remove-repo="removeRepository(repo)">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                    v-bind="attrs" v-on="on">
                    <v-icon>mdi-folder-remove</v-icon>
                  </v-btn>
                </template>
              </DialogRemoveRepository>

            </template>

            <!-- sub list containing the ADRs -->
            <v-list-item-group mandatory>
              <v-list-item v-for="file in repo.children" :key="file.path" @click="openFileByPath({ path: file.path })">
                <v-list-item-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>

                <!-- Button-Icons for copy and delete -->
                <v-list-item-icon>
                  <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                    v-if="file.fileType==='adr' || file.fileType==='md'">
                    <v-icon>mdi-content-duplicate</v-icon>
                  </v-btn>

                  <DialogDeleteAdr v-bind:adr="{ name: file.name }">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn style="width: 30px; min-width: 30px; height: 100%;" class="mx-0 px-0"
                        v-if="file.fileType==='adr' || file.fileType==='md'" v-bind="attrs" v-on="on">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </DialogDeleteAdr>
                </v-list-item-icon>
              </v-list-item>

              <v-list-item inactive>
                <v-btn block @click="createNewAdr({ repository : repo })">
                  <v-icon>mdi-plus</v-icon> New ADR
                </v-btn>
              </v-list-item>

            </v-list-item-group>
          </v-list-group>
        </v-list>
      </div>
    </div>
    <!-- Bottom Buttons for adding a repository and commiting -->
    <div class="flex-grow-0 d-flex flex-wrap">
      <DialogAddRepositories :repos="notAddedRepositories" @add-repositories="addRepositories">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
            Add Repository
          </v-btn>
        </template>
      </DialogAddRepositories>
      <DialogCommit>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" class="flex-grow-1 secondary">
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

  import { loadRepositories } from '@/plugins/api.js'

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
        folderStructure: [], // Tree structure of the displayed repositories and their contents
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
        allRepositories: [] // A list containing all repositories  (Raw Data fetched from GitHub) 
      }
    },
    computed: {
      addedRepoFullNames() {
        console.log(this.folderStructure)
        return this.folderStructure.map((repository) => (repository.fullName) )
      },
      notAddedRepositories() {
        console.log('notAddedRepositories', this.allRepositories)
        return this.allRepositories.filter((repo) => (!this.addedRepoFullNames.includes(repo.full_name)))
      }
    },
    watch: {
      folderStructure() {
        console.log(this.folderStructure)
      }
    },
    mounted() {
      this.loadRepositories()
    },
    methods: {
      /** Loads all (added and unadded) repositories the user is authorized to access into allRepositories.
       */
       loadRepositories() {
        loadRepositories().then((res) => {
            console.log('Loaded repo data', res.data);
            if (!Array.isArray(res.data)) {throw 'Couldn\'t load repos.'}
            this.allRepositories = res.data
            console.log('All Repositories', this.allRepositories)
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      },

      /** Adds all repositories from the repo list to the folder structure.
       * Called when the 'Add repositories'-Dialog is closed.
       * 
       * @param repoList - A list of repository data (like it is fetched from GitHub)
       */
      addRepositories(repoList) {
        this.loadFileTreeOfRepositories(repoList)
      },

      /** 
       * @param repo
       */
      removeRepository(repo) {
        this.folderStructure = this.folderStructure.filter((el) => (el.name !== repo.name))
        this.$emit('remove-repo', repo)
      },
      /** Loads the entire file trees of passed repositories and adds them to the folder structure, ready to be displayed.
       * 
       * TODO: The backend with the authorization token should be called.
       * 
       * @param repositoryList - the list of repos like it is fetched from GitHub.
       */
      loadFileTreeOfRepositories: function (repositoryList) {
        let addedRepoCount = this.folderStructure.length

        this.folderStructure = this.folderStructure.concat(repositoryList.map((repo) => ({
          data : repo,
          name: repo.full_name,
          fullName: repo.full_name,
          path: repo.full_name,
          fileType: 'repo',
          branch: repo.default_branch,
          children: []
        })))
        // Get the file tree of the added repositories
        this.folderStructure.slice(addedRepoCount).forEach((repo) => {
          loadFileTreeOfRepository(repo.name, repo.branch) // TODO: Here the backend should be called. (Currently this calls to the public api.)
            .then((data) => {
              console.log(data)
              repo.children = this.computeFolderStructureFromData({ data, basePath: repo.name, repository: repo })
            })
            .catch((err) => {
              console.log(err)
            })
        })
      },
      
      /** Computes the nested folder structure from the git tree of one repository.
       * 
       * If the repository contains the path docs/adr/, it is used as base path, i.e. all files outside that path will be ignored.
       * 
       * @param data - the file tree (JSON structure can be viewed in the  tree attributee at 'https://api.github.com/repos/adr/madr/git/trees/master?recursive=1')
       * @param basePath - prefix for all paths, e. g. the full repostory name
       * @param repository - the repository object every file in this folder structure should refer to
       * @returns the folder structure computed from the data 
       */
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

      /**
       * @param folder - the base folder in which should be searched
       * @param path - the path inside that folder
       * @returns True iff there is a file in the folder structur with the parameter path as prefix of its path
       */
      folderContainsPath({ folder, path }) {
        let searchedDirectory = getFileByPath({ folder: folder, path: folder.path + '/' + path });
        return typeof searchedDirectory !== 'undefined';
      },

      openFileByPath({ path }) {
        if (typeof path === 'undefined') {
          console.log('Can\'t open file at an undefined path.')
          return
        }
        console.log('Open file by path: ' + path)
        let file = getFileByPath({ folder: this.folderStructure, path })
        this.openFile({ repoFullName: file.repository.fullName, branch: file.repository.branch, filePath: file.path.replace(file.repository.name, '') })
      },

      /** TODO: Loads the file content from GitHub and emits an 'open-file' event with the file content as parameter.
       * 
       * @param repoFullName - the full name of the repo (i.e. 'owner/repoName')
       * @param branch - 
       * @param filePath - the path to the file 
       * @returns True iff there is a file in the folder structure with the parameter path as prefix of its path
       */
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