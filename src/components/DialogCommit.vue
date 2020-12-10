<template>
  <v-dialog
    v-bind:value="showDialog"
    v-on:input="
      (value) => {
        showDialog = value;
        $emit('input', value);
      }
    "
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" v-bind:on="on" v-bind:attrs="attrs"> </slot>
    </template>
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Commit changes
      </v-card-title>

      <v-card-text>
        <h6 style="margin-top: %">Changes staged for commit</h6>

        <v-container
          style="height: 150px;"
          class="border border-dark rounded overflow-y-auto"
        >
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
          <li>1234 Adr X</li>
          <li>3456 Adr Y</li>
        </v-container>

        <h6 style="margin-top: 2%">Choose branch</h6>

        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.title"
            v-model="item.active"
            :prepend-icon="item.action"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item v-for="child in item.items" :key="child.title">
              <v-list-item-content>
                <v-list-item-title v-text="child.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>

        <v-text-field
          label="Commit message"
          ref="message"
          v-model="message"
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="
            () => {
              requestLastCommitSha();
              showDialog = false;
              $emit('commit');
            }
          "
        >
          Commit and push!
        </v-btn>
        <v-btn @click="showDialog = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  getCommitSha,
  createBlobs,
  createFileTree,
  createCommit,
  pushToGitHub,
} from "@/plugins/api.js";

export default {
  name: "EditorAddRepositoryDialog",
  props: {
    currUser: String,
    currRepo: String,
    listFilesChanged: {},
    // value is true, iff showDialog == true, iff the dialog is shown. (value-prop enables v-model)
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    currentBranch: {
      type: String,
      required: false,
      default: "master",
    },
  },
  data: () => ({
    dataAuth: "",
    showDialog: false,
    organization: "",
    pushToNewBranch: false,
    lastCommitSha: "",
    blobSha: {},
    message: "",
    items: [
      {
        action: "mdi-list",
        active: true,
        items: [
          { title: "gui-update" },
          { title: "git-integration" },
          { title: "hotfix" },
        ],
        title: "Main",
      },
    ],
  }),
  watch: {
    value() {
      this.dialog = this.value;
    },
  },
  mounted() {
    this.dataAuth = this.$route.params.id;
  },
  methods: {
    requestLastCommitSha() {
      /**
       *
       * branch is missing
       *
       *
       */
      getCommitSha(this.dataAuth, this.currUser, this.currRepo, "main")
        .then((res) => {
          this.lastCommitSha = res.commit.sha;
          this.createBlobsRequest();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    createBlobsRequest() {
      let countKeysList = Object.keys(this.listFilesChanged).length;
      let countForEach = 0;
      Object.entries(this.listFilesChanged).forEach((value) => {
        createBlobs(this.dataAuth, this.currUser, this.currRepo, value[1].value)
          .then((res) => {
            countForEach++;
            let path =
              value[1].path.split("/")[2] +
              "/" +
              value[1].path.split("/")[3] +
              "/" +
              value[1].path.split("/")[4];
            this.blobSha[value[1].title] = {
              blobSha: res.sha,
              path: path,
            };
            if (countForEach === countKeysList) {
              this.createFolderTreeRequest();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    createFolderTreeRequest() {
      let folderTree = [];
      Object.entries(this.blobSha).forEach((value) => {
        folderTree.push({
          path: value[1].path,
          mode: "100644",
          type: "blob",
          sha: value[1].blobSha,
        });
      });
      console.log("tree", folderTree);
      createFileTree(
        this.dataAuth,
        this.currUser,
        this.currRepo,
        this.lastCommitSha,
        folderTree
      )
        .then((res) => {
          this.createCommitRequest(res.sha);
        })
        .catch((error) => console.error(error));
    },
    createCommitRequest(treeSha) {
      createCommit(
        this.dataAuth,
        this.currUser,
        this.currRepo,
        this.message,
        {
          name: "Manuel Merkel",
          email: "manuel.merkel98@gmail.com",
        },
        this.lastCommitSha,
        treeSha
      )
        .then((res) => this.pushToGitHubRequest(res.sha))
        .catch((error) => console.error(error));
      console.log("finally here");
    },

    pushToGitHubRequest(newCommitSha) {
      pushToGitHub(
        this.dataAuth,
        this.currUser,
        this.currRepo,
        "main",
        newCommitSha
      )
        .then((res) => console.log("res", res))
        .catch((error) => console.error(error));
    },
  },
};
</script>

<style scoped></style>
