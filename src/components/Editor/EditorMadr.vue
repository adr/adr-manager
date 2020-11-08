<template>
  <v-container fluid class="editor text-left">
    <h1><v-text-field label="Titel" hint="Changing this field, changes the file name. Do not use special characters." v-model="adr.title" 
      @input="(val) => {adr.title=val; update()}"></v-text-field></h1>
      <v-card tile v-if="showOptionalFields"
      dense class="d-flex flex-row flex-wrap mb-6">
        <v-card tile outlined class="d-flex pr-4">
          <div style="flex-shrink: 0">
            <v-card-title>
              Status
            </v-card-title>
          </div>
          <div  style="flex-shrink: 1; flex-grow: 1">
            <v-combobox v-model="adr.status" :items="statusSuggestions"></v-combobox>
          </div>
          </v-card>
        <v-card tile outlined class="d-flex pr-4">
          <div>
            <v-card-title style="flex-shrink: 0">
              Date
              </v-card-title>
          </div>
            <div class="flex-grow-1 flex-shrink-1">
              <DatePickerMenu v-model="adr.date"></DatePickerMenu>
            </div>
          </v-card>
          <v-card tile outlined class="d-flex flex-grow-1 flex-shrink-0 pr-4" style="min-width: 200px">
            <div  style="flex-shrink: 0">
              <v-card-title>Deciders</v-card-title>
            </div>
            <div class="flex-grow-1 flex-shrink-1">
              <v-combobox dense v-model="adr.deciders"
                          multiple chips></v-combobox>
            </div>
          </v-card>
          <v-card tile outlined class="d-flex pr-4" style="flex-grow: 3">
            <div style="flex-shrink: 0">
              <v-card-title>
                Technical Story
              </v-card-title>
            </div>
            <div class="align-self-end flex-grow-1" style="min-width: 400px;">
              <v-textarea dense auto-grow rows="1" v-model="adr.technicalStory"></v-textarea>
            </div>
          </v-card>
</v-card>

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
          <v-btn v-on:click="adr.decisionDrivers.push('')"><v-icon>mdi-plus</v-icon></v-btn>
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
        <v-btn v-on:click="adr.addOption()"><v-icon>mdi-plus</v-icon></v-btn>
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
          <v-btn v-on:click="adr.decisionOutcome.positiveConsequences.push('')"><v-icon>mdi-plus</v-icon></v-btn>
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
          <v-btn v-on:click="adr.decisionOutcome.negativeConsequences.push('')"><v-icon>mdi-plus</v-icon></v-btn>
        </v-list-item>
      </v-list>
    </div>
    <div v-if="showOptionalFields">
      <h3>Pros and Cons of the  Options</h3>
      <div v-for="(option, i) in adr.consideredOptions"
           v-bind:key="i"
           v-bind:id="'considered-option-' + i">
        <h4> {{ option.title }} </h4>
        <v-textarea dense auto-grow rows="1" hint="Description of the option" v-model="option.description"></v-textarea>
        <h5> Pros </h5>
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
            <v-btn v-on:click="option.pros.push('')"><v-icon>mdi-plus</v-icon></v-btn>
          </v-list-item>
        </v-list>

        <h5> Cons </h5>

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
            <v-btn v-on:click="option.cons.push('')"><v-icon>mdi-plus</v-icon></v-btn>
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
          <v-btn v-on:click="adr.links.push('')"><v-icon>mdi-plus</v-icon></v-btn>
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
      adr: {}
    }),
    props: ['value', 'showOptionalFields'],
    computed: {
      statusSuggestions() {
        return ['proposed', 'rejected', 'superseded by'].concat(this.adr.status.startsWith('superseded ') ? ['superseded by ADR-0001', 'superseded by ADR-0002', 'superseded by ADR-0003'] : []) 
      }
    },
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
</style>
