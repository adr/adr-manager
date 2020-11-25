<template>
  <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
    <v-toolbar dense color="primary" dark style="-webkit-flex: 0; flex: 0;">
      <v-btn class="align-self-center" to="/">Log Out</v-btn>
      <ToolbarMenuFile
        v-on:commit="logNotImplemented"
        v-on:create-adr="createNewAdr"
        v-on:delete-adr="logNotImplemented"
      />
      <ToolbarMenuMode />
      <v-spacer></v-spacer>
      <ToolbarNavigation />
    </v-toolbar>

    <v-card-text
      class="mx-0 my-0 px-0 py-0"
      style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;"
    >
      <splitpanes
        class="default-theme"
        style="overflow: auto; position: absolute; height: 100%; width: 100%; "
      >
        <pane size="30%" style="overflow: auto;">
          <FileExplorer v-on:open-file="updateMd" v-bind:user="userName" />
          <DialogAddRepositories>
            <template v-slot:activator="{ on, attrs }">
              <v-btn block v-bind="attrs" v-on="on" @click="addRepositories()">
                Add Repository
              </v-btn>
            </template>
          </DialogAddRepositories>
        </pane>
        <!--end File Explorer Pane -->

        <pane>
          <Editor style="height: 100%;" v-model="adrRaw" />
        </pane>
      </splitpanes>
    </v-card-text>

    <v-system-bar>
      Aktuelle Repo: Not implemented
      <v-spacer></v-spacer>

      Current branch:
      <select name="current-branch" id="current-branch" style="width: 20%">
        <option
          v-for="(branchName, index) in ['master', 'branch 1', 'branch 2']"
          :key="index"
          v-text="branchName"
        ></option>
      </select>
    </v-system-bar>
  </v-card>
</template>

<script>
// @ is an alias to /src
import {adr2md, ArchitecturalDecisionRecord} from '@/plugins/utilities';

import {Splitpanes, Pane} from 'splitpanes';
import 'splitpanes/dist/splitpanes.css';

import ToolbarMenuMode from '@/components/ToolbarMenuMode.vue';
import ToolbarMenuFile from '@/components/ToolbarMenuFile.vue';
import ToolbarNavigation from '@/components/ToolbarNavigation.vue';
import Editor from '@/components/TheEditor.vue';
import FileExplorer from '@/components/FileExplorer.vue';
import DialogAddRepositories from '@/components/DialogAddRepositories.vue';
import axios from 'axios';

export default {
  components: {
    Splitpanes,
    Pane,
    ToolbarMenuMode,
    ToolbarMenuFile,
    ToolbarNavigation,
    Editor,
    FileExplorer,
    DialogAddRepositories,
  },
  data: () => ({
    currentBranch: '',
    adrRaw: adr2md(new ArchitecturalDecisionRecord()),
    userName: 'adr',
    reposPath: 'http://localhost:5000/repos',
  }),
  methods: {
    updateMd: function(md) {
      this.adrRaw = md;
    },
    createNewAdr: function() {
      this.adrRaw = adr2md(new ArchitecturalDecisionRecord());
    },
    addRepositories() {
      axios
          .post(this.reposPath)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          });
    },
    logNotImplemented() {
      console.log('Not implemented.');
    },
  },
};
</script>

<style>
html {
  overflow: auto;
}
</style>
