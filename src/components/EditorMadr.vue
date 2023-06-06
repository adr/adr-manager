<template>
    <v-container fluid class="editor text-left d-flex flex-column mx-0" id="editor-madr">
        <v-sheet class="mx-auto mx-0 my-0 px-0 py-0" style="height: 100%; width: 100%">
            <v-container fluid class="mx-auto overflow-y-auto scroll px-8" style="height: 100%">
                <!-- Title Style -->
                <v-row class="my-0">
                    <v-text-field
                        data-cy="titleAdr"
                        v-if="true"
                        filled
                        dense
                        placeholder="Title"
                        :autofocus="true"
                        hint="Changing the title changes the file name. Do not use special characters."
                        v-model="adr.title"
                        @input="$emit('input', adr)"
                        style="font-family: Roboto, sans-serif; font-size: 28px; font-weight: 500"
                    >
                        <template v-slot:append="">
                            <HelpIcon>
                                This is the Title. <br />
                                It should describe the solved problem and the solution concisely. <br />
                                The title is also used as file name, so keep it short and avoid using special
                                characters.
                            </HelpIcon>
                        </template>
                    </v-text-field>
                </v-row>

                <v-alert
                    v-if="isModeTooLow"
                    border="left"
                    colored-border
                    type="warning"
                    elevation="2"
                    class="my-4 py-2"
                >
                    <div class="d-flex my-0 py-0">
                        <span class="flex-grow-1 align-self-center my-0 py-0">
                            Some fields of this ADR are not displayed in the current mode.
                        </span>
                        <v-btn class="justify-self-end align-self-end my-0 py-0" @click="switchToMinimumRequiredMode()">
                            Switch to {{ minimumRequiredModeForAdr(adr) }} Mode
                        </v-btn>
                    </div>
                </v-alert>

                <StatusDateDecidersStory
                    v-if="mode !== 'basic'"
                    class="mb-8"
                    v-bind:adr="adr"
                    @input="$emit('input', adr)"
                />

                <v-divider class="my-0" />

                <v-row class="mt-8 mb-1 mx-0">
                    <h3 style="display: inline-flex">
                        Context and Problem Statement
                        <HelpIcon>
                            Describe the context and problem statement, e.g., in free form using two to three sentences.
                            <br />
                            You may want to articulate the problem in form of a question.
                        </HelpIcon>
                    </h3>
                </v-row>
                <v-card flat class="mb-8">
                    <codemirror
                        data-cy="contextAdr"
                        v-model="adr.contextAndProblemStatement"
                        @input="
                            (val) => {
                                adr.contextAndProblemStatement = val;
                                $emit('input', adr);
                            }
                        "
                        style="min-height: 100px"
                    />
                </v-card>

                <div v-if="mode === 'professional'">
                    <v-divider class="my-8" />
                    <v-row class="mx-0 my-1">
                        <h3 style="display: inline-flex">
                            Decision Drivers
                            <HelpIcon>
                                Decision Drivers are competing forces or facing concerns that influence the decision.
                            </HelpIcon>
                        </h3>
                    </v-row>
                    <GenericList :list="adr.decisionDrivers" />
                </div>

                <v-divider class="my-8" />

                <ConsideredOptions :adr="adr" :mode="mode" @input="$emit('input', adr)" />

                <v-divider class="my-8" />
                <DecisionOutcome :adr="adr" :mode="mode" @input="$emit('input', adr)" />

                <div v-if="mode === 'professional'">
                    <v-divider class="my-8" />
                    <v-row class="mx-0 mb-1">
                        <h3 style="display: inline-flex">
                            Links
                            <HelpIcon> Add referenes, e.g., to related ADRs </HelpIcon>
                        </h3>
                    </v-row>
                    <GenericList data-cy="linkPro" :list="adr.links" />
                </div>

                <div class="my-16"></div>
            </v-container>
        </v-sheet>
    </v-container>
</template>

<script>
import { ArchitecturalDecisionRecord } from "/src/plugins/classes.js";
import { store } from "/src/plugins/store.js";

import codemirror from "./EditorMadrCodemirror.vue";
import StatusDateDecidersStory from "./EditorMadrStatusDateDecidersStory.vue";
import DecisionOutcome from "./EditorMadrDecisionOutcome.vue";
import ConsideredOptions from "./EditorMadrConsideredOptions.vue";
import HelpIcon from "./HelpIcon.vue";

import GenericList from "./EditorMadrList.vue";

export default {
    name: "EditorMADR",
    components: {
        codemirror,
        StatusDateDecidersStory,
        ConsideredOptions,
        DecisionOutcome,
        GenericList,
        HelpIcon
    },
    props: {
        value: { type: ArchitecturalDecisionRecord }
    },
    data: () => ({
        adr: {}
    }),
    computed: {
        mode() {
            return store.mode;
        },
        isModeTooLow() {
            let mode = store.mode;
            let requiredMode = this.minimumRequiredModeForAdr(this.adr);
            switch (mode) {
                case "basic":
                    if (requiredMode !== "basic") {
                        return true;
                    }
                    break;
            }
            return false;
        }
    },
    watch: {
        value() {
            this.adr = this.value;
        },
        adr: {
            handler() {
                this.$emit("input", this.adr);
            },
            deep: true
        }
    },
    created() {
        this.adr = this.value;
    },
    methods: {
        /** Returns the minimum mode that displays all fields of the ADR. */
        minimumRequiredModeForAdr(adr) {
            if (adr.decisionDrivers.length > 0 || adr.links > 0) {
                return "professional";
            } else {
                return "basic";
            }
        },
        switchToMinimumRequiredMode() {
            store.setMode(this.minimumRequiredModeForAdr(this.adr));
        }
    }
};
</script>
