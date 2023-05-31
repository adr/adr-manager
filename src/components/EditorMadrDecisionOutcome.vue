<template>
    <div fluid class="text-left">
        <v-row class="mx-0 my-1">
            <h3 style="display: inline-flex">
                Decision Outcome
                <HelpIcon>
                    Select the option that you chose to use.
                    <div v-if="mode === 'basic'">Note that you can add consequences in professional mode.</div>
                </HelpIcon>
            </h3>
        </v-row>

        <v-card dense flat class="px-0 py-0 my-0">
            <v-combobox
                data-cy="decOutChooseAdr"
                filled
                class="pb-0 mb-0"
                v-model="adr.decisionOutcome.chosenOption"
                :items="optionTitleList"
                label="Chosen option"
            ></v-combobox>
        </v-card>
        <div class="d-flex mb-4">
            <h5 class="py-0 pl-0 mr-4 flex-grow-0 flex-shrink-0 align-baseline">because</h5>
            <div class="mx-0 flex-grow-1 align-baseline">
                <codemirror data-cy="decOutBecAdr" v-model="adr.decisionOutcome.explanation"></codemirror>
            </div>
        </div>
        <!--<v-textarea dense auto-grow rows="1" v-model="adr.decisionOutcome.explanation"></v-textarea>-->

        <v-row flat v-if="mode !== 'basic'">
            <v-col lg="6" md="12" flat class="flex-grow-1" min-width="600px" max-width="100%">
                <v-row class="mx-0 my-2">
                    <h5 style="display: inline-flex">
                        Positive Consequences
                        <HelpIcon>
                            Give positive consequences, e.g., improvement of a quality attribute, follow-up decisions
                            required, ...
                        </HelpIcon>
                    </h5>
                </v-row>
                <EditorMadrList data-cy="posConseqPro" :list="adr.decisionOutcome.positiveConsequences" />
            </v-col>
            <v-col lg="6" md="12" flat class="flex-grow-1" min-width="600px" max-width="100%">
                <v-row class="mx-0 my-2">
                    <h5 style="display: inline-flex">
                        Negative Consequences
                        <HelpIcon>
                            Give negative consequences, e.g., afflicted quality attributes, follow-up decisions
                            required, ...
                        </HelpIcon>
                    </h5>
                </v-row>
                <EditorMadrList data-cy="negConseqPro" :list="adr.decisionOutcome.negativeConsequences" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import codemirror from "./EditorMadrCodemirror.vue";
import EditorMadrList from "./EditorMadrList.vue";
import HelpIcon from "./HelpIcon.vue";
import { createShortTitle } from "/src/plugins/classes";

export default {
    name: "EditorMADR",
    components: {
        codemirror,
        EditorMadrList,
        HelpIcon
    },
    props: {
        adr: {},
        mode: {
            type: String
        }
    },
    data: () => ({}),
    computed: {
        optionTitleList() {
            return this.adr.consideredOptions.map((opt) => createShortTitle(opt.title));
        }
    }
};
</script>
