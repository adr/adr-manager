<template>
  <div>

    <!-- Chips for Date, Status, Deciders -->
    <v-card flat v-if="true" class="d-flex flex-wrap">
      <v-card flat class="mb-4" min-width="400px">
        <DatePickerMenu v-model="adr.date"></DatePickerMenu>

        <v-menu v-model="showStatusDropdown" :close-on-content-click="false" bottom right origin="top left">
          <template v-slot:activator="{ on, attrs }">
            <v-chip data-cy="statusPro" outlined :color="statusColor" class="mx-5" v-on="on" v-bind="attrs">
              {{ displayedStatus }}
            </v-chip>
          </template>
          <v-list class="mx-0 px-0 py-0 my-0">
            <v-list-item class="mx-0 px-0 py-0 my-0">
              <v-text-field ref="statustextfield" dense filled hide-details class="mx-0 px-0 py-0 my-0"
                placeholder="custom status" v-model="adr.status"></v-text-field>
            </v-list-item>
            <v-list-item v-for="(item, index) in statusSuggestions" :key="index"
              @click="adr.status = item.name; showStatusDropdown = false">
              <v-list-item-title v-text="item.name" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card>
      <v-card flat class="mb-4">
        <v-chip outlined>
          <div @click="focusDecidersTextField">

          <v-icon class="mr-2">mdi-account</v-icon>
          <input data-cy="authorPro" type="text" ref="deciderstextfield" v-autowidth="{maxWidth: '960px', minWidth: '60px', comfortZone: 0}" v-model="adr.deciders">
          </div>
        </v-chip>
      </v-card>
    </v-card>

    <!-- Technical Story Field-->
    <v-row class="pl-4">
      <v-col class="my-0 py-0 px-0 mx-0 px-0 align-self-center" style="max-width: 150px">
        <h5> Technical Story: </h5>
      </v-col>
      <v-col no-cols class="my-0 py-0">
        <codemirror data-cy="technicalStoryPro" v-model="adr.technicalStory"></codemirror>
      </v-col>
    </v-row>
  </div>

</template>

<script>
  import _ from 'lodash';
  import DatePickerMenu from "./DatePickerMenu.vue";
  import codemirror from "./EditorMadrCodemirror.vue";
  import { ArchitecturalDecisionRecord } from "@/plugins/classes.js";

  export default {
    components: {
      DatePickerMenu,
      codemirror
    },
    data: () => ({
      showStatusDropdown: false,
      showDateDropdown: false,
      testText: '',
      statusPresets: [{ name: 'proposed' }, { name: 'rejected', color: 'red' }, { name: 'accepted', color: 'success' }, { name: 'deprecated' }, { name: 'superseded' }]
    }),
    props: {
      adr: {
        type: ArchitecturalDecisionRecord
      }
    },
    watch: {
      /** Focus the status text field, when the menu is opened (i.e. the status chip is clicked) */
      showStatusDropdown(newValue) {
        if (newValue) {
          let func = this.focusStatusTextField;
          /* Delay focussing for 100 ms. Immediately focussing doesn't seem to work. */
          _.debounce(function () {
            func();
          }, 100)();
        }
      }
    },
    computed: {
      displayedStatus() {
        if (this.adr.status && this.adr.status !== '') {
          return this.adr.status.toUpperCase();
        } else {
          return 'No status'
        }
      },
      statusColor() {
        let status = this.statusPresets.find((item) => (item.name === this.adr.status));
        if (status) {
          return status.color;
        } else if (this.adr.status.trim() === "") {
          return "grey";
        } else {
          return undefined;
        }
      },
      statusSuggestions() {
        return this.statusPresets.filter((item) => (item.name !== this.adr.status));
      }
    },
    methods: {
      scrollTo(target) {
        this.$vuetify.goTo(target, { container: '.scroll' });
      },
      focusStatusTextField() {
          this.$refs["statustextfield"].$refs.input.focus();
      },
      focusDecidersTextField() {
          this.$refs["deciderstextfield"].focus();
      }
    }
  };
</script>

<style scoped>
</style>