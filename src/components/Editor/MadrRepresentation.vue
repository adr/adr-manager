<template>
  <v-container fluid class="editor text-left">
    <v-row no-gutters dense
           class="d-flex align-content-space-around flex-wrap">
      <!--<v-col cols="3"
         style="max-width: 100%;"
         class="flex-grow-1 flex-shrink-0">
    <v-btn label="Update" v-on:click="update">Update MD</v-btn>
  </v-col>-->
      <v-col cols="3"
             style="min-width: 225px; max-width: 100%;"
             class="flex-grow-0 flex-shrink-0 text-right">
        <v-checkbox class="mt-0" label="Show Optional Fields" v-model="showOptionalFields"></v-checkbox>
      </v-col>
    </v-row>
    <h1><v-text-field label="Titel" hint="Changing this field, changes the file name. Do not use special characters." v-model="adr.title" 
      @input="(val) => {adr.title=val; update()}"></v-text-field></h1>
    <div v-if="showOptionalFields">
      <v-row no-gutters dense
             class="d-flex align-content-space-around flex-wrap">
        <v-col cols="3"
               style="min-width: 225px; max-width: 100%;"
               class="flex-grow-1 flex-shrink-0">
          Status

          <v-row no-gutters dense
                 class="d-flex align-content-space-around flex-wrap">
            <v-col cols="3"
                   :style="{ 'min-width': adr .status === 'superseded by' ? '125px' : '225px', 'max-width': '100%' }"
                   class="flex-grow-1 flex-shrink-0">
              <v-combobox dense v-model="adr.status" :items="['proposed', 'rejected', 'superseded by']"></v-combobox>
            </v-col>
            <v-col cols="2"
                   style="min-width: 100px; max-width: 100%;"
                   class="flex-grow-1 flex-shrink-0">
              <v-combobox v-if="adr.status === 'superseded by'"
                          dense
                          :items="['ADR-0001', 'ADR-0002', 'ADR-0003']"></v-combobox>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="2"
               style="min-width: 100px; max-width: 100%;"
               class="flex-grow-1 flex-shrink-0">
          Date <DatePickerMenu v-model="adr.date"></DatePickerMenu>
        </v-col>
        <v-col cols="6"
               style="min-width: 300px; max-width: 100%;"
               class="flex-grow-1 flex-shrink-1">
          Deciders
          <v-combobox dense v-model="adr.deciders"
                      multiple chips></v-combobox>
        </v-col>
        <v-col cols="12"
               class="flex-grow-0 flex-shrink-0">
          Technical Story
          <v-textarea dense auto-grow rows="1" v-model="adr.technicalStory"></v-textarea>
        </v-col>
      </v-row>
    </div>

    <h3>Context and Problem Statement</h3>
    <v-textarea dense auto-grow rows="1" hint="Description of the problem" v-model="adr.contextAndProblemStatement"></v-textarea>

    <div v-if="showOptionalFields">
      <h3>Decision Drivers</h3>
      <v-list>
        <v-list-item dense
                     v-for="(driver, i) in adr.decisionDrivers"
                     :key="i">
          <v-list-item-icon></v-list-item-icon>
          <v-textarea dense auto-grow rows="1" v-model="adr.decisionDrivers[i]"></v-textarea>
          <v-list-item-icon>
            <v-btn v-on:click="adr.decisionDrivers.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="adr.decisionDrivers.push('')">Add</v-btn>
        </v-list-item>
      </v-list>
    </div>

    <h3>Considered Options</h3>
    <v-list>
      <v-list-item dense
                   v-for="(option, i) in adr.consideredOptions"
                   :key="i">
        <v-list-item-icon> <v-btn text @click="$vuetify.goTo('#considered-option-' + i)"><v-icon>mdi-feather</v-icon></v-btn> </v-list-item-icon>
        <v-textarea dense auto-grow rows="1" v-model="option.title"></v-textarea>
        <v-list-item-icon>
          <v-btn v-on:click="adr.consideredOptions.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
        </v-list-item-icon>
      </v-list-item>
      <v-list-item>
        <v-btn v-on:click="adr.addOption()">Add</v-btn>
      </v-list-item>
    </v-list>

    <h3>Decision Outcome</h3>
    <v-combobox v-model="adr.decisionOutcome.chosenOption"
                :items="adr.consideredOptions.map((opt) => { return opt.title })"
                label="Chosen option"></v-combobox>
    because
    <v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>

    <div v-if="showOptionalFields">
      <h4>Positive Consequences</h4>
      <v-list>
        <v-list-item dense
                     v-for="(consequence, i) in adr.decisionOutcome.positiveConsequences"
                     v-bind:key="i">
          <v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.positiveConsequences[i]"></v-textarea>
          <v-list-item-icon>
            <v-btn v-on:click="adr.decisionOutcome.positiveConsequences.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="adr.decisionOutcome.positiveConsequences.push('')">Add</v-btn>
        </v-list-item>
      </v-list>
      <h4>Negative Consequences</h4>
      <v-list>
        <v-list-item dense
                     v-for="(consequence, i) in adr.decisionOutcome.negativeConsequences"
                     v-bind:key="i">
          <v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.negativeConsequences[i]"></v-textarea>
          <v-list-item-icon>
            <v-btn v-on:click="adr.decisionOutcome.negativeConsequences.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="adr.decisionOutcome.negativeConsequences.push('')">Add</v-btn>
        </v-list-item>
      </v-list>
    </div>
    <div v-if="showOptionalFields">
      <h3>Pros and Cons of the  Options</h3>
      <div v-for="(option, i) in adr.consideredOptions"
           v-bind:key="i"
           v-bind:id="'considered-option-' + i">
        <h4> Option: {{ option.title }} </h4>
        <v-textarea dense auto-grow rows="1" hint="Description of the option" v-model="option.description"></v-textarea>
        <h4> Pros </h4>
        <v-list>
          <v-list-item dense
                       v-for="(arg, i) in option.pros"
                       v-bind:key="i">
            <v-list-item-icon class="mr-4">Good, because</v-list-item-icon>
            <v-textarea dense auto-grow rows="1" hint="Your pro argument" v-model="option.pros[i]"></v-textarea>
            <v-list-item-icon>
              <v-btn v-on:click="option.pros.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item>
            <v-btn v-on:click="option.pros.push('')">Add</v-btn>
          </v-list-item>
        </v-list>

        <h4> Cons </h4>

        <v-list>
          <v-list-item dense
                       v-for="(arg, i) in option.cons"
                       v-bind:key="i">
            <v-list-item-icon class="mr-4">Bad, because</v-list-item-icon>
            <v-textarea dense auto-grow rows="1" hint="Your con argument" v-model="option.cons[i]"></v-textarea>
            <v-list-item-icon>
              <v-btn v-on:click="option.cons.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item>
            <v-btn v-on:click="option.cons.push('')">Add</v-btn>
          </v-list-item>
        </v-list>
      </div>
    </div> <!-- end Pros and Cons of Options-->

    <div v-if="showOptionalFields">
      <h3>Links</h3>
      <v-list>
        <v-list-item dense
                     v-for="(link, i) in adr.links"
                     :key="i">
          <v-list-item-icon></v-list-item-icon>
          <v-textarea dense auto-grow rows="1" v-model="adr.links[i]"></v-textarea>
          <v-list-item-icon>
            <v-btn v-on:click="adr.links.splice(i, 1)"><v-icon>mdi-minus</v-icon></v-btn>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item>
          <v-btn v-on:click="adr.links.push('')">Add</v-btn>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<script>
  import _ from 'lodash'
  import DatePickerMenu from '../UsefulComponents/DatePickerMenu.vue'

  export default {
    name: 'AdrRepresentation',
    components: {
      DatePickerMenu
    },
    data: () => ({
      adr: {},
      showOptionalFields: true
    }),
    props: ['value'],
    watch: {
      value() {
        this.adr = this.value
      }
    },
    created() {
      this.adr = this.value
    },
    methods: {
      update: _.debounce(function () {
        this.$emit('input', this.adr)
      }, 500)
    }
  };
</script>

<style scoped>
  #editor {
    margin: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
    color: #333;
    text-align: left;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: "Monaco", courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>
