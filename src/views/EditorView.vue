<template>
  <v-card class="editor text-center mx-auto d-flex flex-column" height="100%">
    <v-toolbar dense
               color="primary"
               dark style="-webkit-flex: 0; flex: 0;">
      <v-btn class="align-self-center" to="/">Log Out</v-btn>
      <!--<ToolbarMenuFile v-on:commit="logNotImplemented"
                 v-on:create-adr="createNewAdr"
                 v-on:delete-adr="logNotImplemented" />-->
      <ToolbarMenuMode />
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="mx-0 my-0 px-0 py-0" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">
      <splitpanes class="default-theme" style="height: 100%; width: 100%; ">
        <pane size="30%" class="d-flex flex-column" style="-webkit-flex-grow: 1; flex-grow: 1; position: relative;">

          <FileExplorer v-on:open-file="updateMd"
                        v-bind:user="userName" />
        </pane> <!--end File Explorer Pane -->

        <pane>
          <Editor style="height: 100%;"
                  v-model="adrRaw" />
        </pane>
      </splitpanes>
    </v-card-text>

    <v-system-bar>
      Current ADR: Not implemented
      <v-spacer></v-spacer>

      Current branch:
      <select name="current-branch" id="current-branch" style="width: 20%">
        <option v-for="(branchName, index) in ['master', 'branch 1', 'branch 2']" :key="index" v-text="branchName"></option>
      </select>
    </v-system-bar>
  </v-card>
</template>

<script>
  // @ is an alias to /src
  import { adr2md, ArchitecturalDecisionRecord } from '@/plugins/utilities'

  import { Splitpanes, Pane } from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  import ToolbarMenuMode from '@/components/ToolbarMenuMode.vue'
  //import ToolbarMenuFile from '@/components/ToolbarMenuFile.vue'
  //import ToolbarNavigation from '@/components/ToolbarNavigation.vue'
  import Editor from '@/components/TheEditor.vue'
  import FileExplorer from '@/components/FileExplorer.vue'


  export default {
    components: {
      Splitpanes, Pane,
      ToolbarMenuMode,
      Editor,
      FileExplorer
    },
    data: () => ({
      currentBranch: '',
      adrRaw: adr2md(new ArchitecturalDecisionRecord()),
      userName: 'adr'
    }),
    methods: {
      updateMd: function (md) {
        this.adrRaw = md;
      },
      createNewAdr: function () {
        this.adrRaw = adr2md(new ArchitecturalDecisionRecord());
      },
      addRepository() {
        console.log('ToDo: Add a Repository.')
      },
      logNotImplemented() {
        console.log('Not implemented.')
      }
    }
  }
</script>

<style>
  html {
    overflow: auto;
  }
</style>