<template>
    <div>
        <!-- Chips for Date, Status, Deciders -->
        <v-row class="pl-0 mx-0 my-1">
            <v-col class="mx-0 my-0 px-0 py-0">
                <label>Last Update:</label>
                <DatePickerMenu v-model="adr.date"></DatePickerMenu>
                <HelpIcon> The date of the last update </HelpIcon>
            </v-col>
            <v-col class="mx-0 my-0 px-0 py-0">
                <label>Status:</label>
                <v-menu v-model="showStatusDropdown" :close-on-content-click="false" bottom right origin="top left">
                    <template v-slot:activator="{ on, attrs }">
                        <v-chip data-cy="statusPro" outlined :color="statusColor" v-on="on" v-bind="attrs">
                            {{ displayedStatus }}
                        </v-chip>
                    </template>
                    <v-list class="mx-0 px-0 py-0 my-0">
                        <v-list-item class="mx-0 px-0 py-0 my-0">
                            <v-text-field
                                ref="statustextfield"
                                dense
                                filled
                                hide-details
                                class="mx-0 px-0 py-0 my-0"
                                placeholder="custom status"
                                v-model="adr.status"
                            ></v-text-field>
                        </v-list-item>
                        <v-list-item
                            v-for="(item, index) in statusSuggestions"
                            :key="index"
                            @click="
                                adr.status = item.name;
                                showStatusDropdown = false;
                            "
                        >
                            <v-list-item-title v-text="item.name" />
                        </v-list-item>
                    </v-list>
                </v-menu>
                <HelpIcon> The current status of the ADR </HelpIcon>
            </v-col>
            <v-col class="mx-0 my-0 px-0 py-0">
                <label>Deciders:</label>
                <v-chip outlined>
                    <div @click="focusDecidersTextField">
                        <v-icon class="mr-2">mdi-account-multiple</v-icon>
                        <input
                            data-cy="authorPro"
                            type="text"
                            ref="deciderstextfield"
                            v-autowidth="{
                                maxWidth: '960px',
                                minWidth: '60px',
                                comfortZone: 0
                            }"
                            v-model="adr.deciders"
                        />
                    </div>
                </v-chip>
                <HelpIcon> Everyone involved in the decision, e.g., separated with commas. </HelpIcon>
            </v-col>
        </v-row>

        <!-- Technical Story Field-->
        <v-row class="pl-0 mx-0 my-4">
            <v-col class="mx-0 my-0 px-0 py-0 align-self-center" style="max-width: 150px">
                <h5>Technical Story:</h5>
            </v-col>
            <v-col no-cols class="my-0 py-0">
                <codemirror data-cy="technicalStoryPro" v-model="adr.technicalStory"></codemirror>
            </v-col>
            <HelpIcon> Technical context of the ADR, e.g., a ticket or issue URL </HelpIcon>
        </v-row>
    </div>
</template>

<script>
import _ from "lodash";
import { ArchitecturalDecisionRecord } from "/src/plugins/classes.js";

import DatePickerMenu from "./DatePickerMenu.vue";
import codemirror from "./EditorMadrCodemirror.vue";
import HelpIcon from "./HelpIcon.vue";

export default {
    components: {
        DatePickerMenu,
        codemirror,
        HelpIcon
    },
    data: () => ({
        showStatusDropdown: false,
        showDateDropdown: false,
        testText: "",
        statusPresets: [
            { name: "proposed" },
            { name: "rejected", color: "red" },
            { name: "accepted", color: "success" },
            { name: "deprecated" },
            { name: "superseded" }
        ]
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
            if (this.adr.status && this.adr.status !== "") {
                return this.adr.status.toUpperCase();
            } else {
                return "No status";
            }
        },
        statusColor() {
            let status = this.statusPresets.find((item) => item.name === this.adr.status);
            if (status) {
                return status.color;
            } else if (this.adr.status.trim() === "") {
                return "grey";
            } else {
                return undefined;
            }
        },
        statusSuggestions() {
            return this.statusPresets.filter((item) => item.name !== this.adr.status);
        }
    },
    methods: {
        scrollTo(target) {
            this.$vuetify.goTo(target, { container: ".scroll" });
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
label {
    font-weight: bold;
    margin-right: 5px;
}
</style>
