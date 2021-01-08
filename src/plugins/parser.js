import { cloneDeep } from "lodash";

import antlr4 from 'antlr4';
import MADRLexer from './parser/MADRLexer.js';
import MADRParser from './parser/MADRParser.js';
import MADRListener from './parser/MADRListener.js';
import { ArchitecturalDecisionRecord } from './classes.js';


/**
 * Creates an ADR from a ParseTree by listening to a ParseTreeWalker.
 * 
 * Use with '''antlr4.tree.ParseTreeWalker.DEFAULT.walk(generator, parseTree);'''
 * The parsed ADR is saved in the attribute 'adr'.
 */
class MADRGenerator extends MADRListener {

    constructor() {
        super()
        this.adr = new ArchitecturalDecisionRecord()
    }

    enterTitle(ctx) {
        this.adr.title = ctx.getText()
    }

    enterStatus(ctx) {
        this.adr.status = ctx.getText()
    }

    enterDeciders(ctx) {
        this.adr.deciders = ctx.getText()
    }

    enterDate(ctx) {
        this.adr.date = ctx.getText()
    }

    enterTechnicalStory(ctx) {
        this.adr.technicalStory = ctx.getText()
    }

    enterContextAndProblemStatement(ctx) {
        this.adr.contextAndProblemStatement = ctx.getText();
    }

    enterDecisionDrivers(ctx) {
        this.addListItemsFromListToList(ctx.children[0], this.adr.decisionDrivers)
    }

    enterConsideredOptions(ctx) {
        let tmpOptionList = []
        this.addListItemsFromListToList(ctx.children[0], tmpOptionList)
        tmpOptionList.forEach(opt => {
            if (opt.trim() !== "") {
                this.adr.addOption({ title: opt })
            }
        })
    }

    enterChosenOptionAndExplanation(ctx) {
        let rawDecisionOutcome = ctx.getText()

        if (rawDecisionOutcome.startsWith('Chosen option: ')) {
            rawDecisionOutcome = rawDecisionOutcome.split(/, because */)
            rawDecisionOutcome[0] = rawDecisionOutcome[0].substring('Chosen option: '.length).trim() // Remove 'Chosen option: '
            let delim = rawDecisionOutcome[0].charAt(0)
            let chosenOption = ""

            if (delim === rawDecisionOutcome[0].charAt(rawDecisionOutcome[0].length - 1)) {
                chosenOption = rawDecisionOutcome[0].substring(1, rawDecisionOutcome[0].length - 1)
            } else {
                chosenOption = rawDecisionOutcome[0]
            }
            let explanation = rawDecisionOutcome.slice(1).join()
            this.adr.decisionOutcome.chosenOption = chosenOption
            this.adr.decisionOutcome.explanation = explanation.trim()
        } else {
            console.log('Couldn\'t find chosen option.')
        }
    }

    enterPositiveConsequences(ctx) {
        this.addListItemsFromListToList(ctx.children[0], this.adr.decisionOutcome.positiveConsequences)
    }

    enterNegativeConsequences(ctx) {
        this.addListItemsFromListToList(ctx.children[0], this.adr.decisionOutcome.negativeConsequences)
    }

    enterOptionTitle(ctx) {
        this.currentOption = this.getMostSimilarOptionTo(ctx.getText())
    }

    enterOptionDescription(ctx) {
        if (this.currentOption) {
            this.currentOption.description = ctx.getText()
        }
    }

    enterProlist(ctx) {
        if (this.currentOption) {
            this.addListItemsFromListToList(ctx, this.currentOption.pros)
        }
    }

    enterConlist(ctx) {
        if (this.currentOption) {
            this.addListItemsFromListToList(ctx, this.currentOption.cons)
        }
    }

    enterLinks(ctx) {
        this.addListItemsFromListToList(ctx.children[0], this.adr.links)
    }
    /**
     * 
     * @param {string} optTitle 
     */
    getMostSimilarOptionTo(optTitle) {
        // Find the option with a very similar title.
        let opt = this.adr.consideredOptions.find(function (opt) {
            return this.matchOptionTitleAlmostExactly(opt.title, optTitle)
        }, this);
        if (opt) { // If a fitting option was found, return it.
            return opt;
        }
        // Else check if there is another (less) similar title.
        opt = this.adr.consideredOptions.find(function (opt) {
            return this.matchOptionTitleMoreRelaxed(opt.title, optTitle)
        }, this);
        if (opt) { // If a fitting option was found, return it.
            return opt;
        }
        // If no fitting option is found, create a new option and return it.
        return this.adr.addOption({ title: optTitle })
    }

    /**
     * Option titles are similar, iff they are equal after 
     *  (1) removing all white spaces
     *  (2) lower-casing them.
     * 
     * @param {string} optTitle1 
     * @param {string} optTitle2 
     * @returns {boolean} True, iff the option titles are very similar.
     */
    matchOptionTitleAlmostExactly(optTitle1, optTitle2) {
        let trimmed1 = optTitle1.replace(/ /g, '').toLowerCase() // Remove whitespaces and lower-case heading
        let trimmed2 = optTitle2.replace(/ /g, '').toLowerCase()
        return trimmed1 === trimmed2
    }

    /**
     * Option titles are similar, iff they are equal after 
     *  (1) removing all white spaces
     *  (2) lower-casing them
     * or one of these normalized titles is a prefix of the other title.
     * 
     * @param {string} optTitle1 
     * @param {string} optTitle2 
     * @returns {boolean} True, iff the option titles are similar
     */
    matchOptionTitleMoreRelaxed(optTitle1, optTitle2) {
        let trimmed1 = optTitle1.replace(/ /g, '').toLowerCase() // Remove whitespaces and lower-case heading
        let trimmed2 = optTitle2.replace(/ /g, '').toLowerCase()
        return trimmed1 === trimmed2 || trimmed1.startsWith(trimmed2) || trimmed2.startsWith(trimmed1)
    }

    /**
     * 
     * @param {} parseTreeList - a list node in the parse tree.
     * @param {string[]} targetList - a js array, where each list entry is copied into.
     */
    addListItemsFromListToList(parseTreeList, targetList) {
        for (let i = 0; i < parseTreeList.children.length; i++) {
            if (parseTreeList.children[i].ruleIndex === MADRParser.ruleNames.indexOf('textLine') // if it is a text line 
                && parseTreeList.children[i].getText().trim() !== "") {
                targetList.push(parseTreeList.children[i].getText());
            }
        }
    }
}

/**
 * Converts a markdown into a MADR object.
 * @param {string} md 
 * @returns {ArchitecturalDecisionRecord}
 */
export function md2adr(md) {
    const chars = new antlr4.InputStream(md);
    const lexer = new MADRLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new MADRParser(tokens);
    parser.buildParseTrees = true;
    parser.removeErrorListeners();

    const tree = parser.start(); // 'start' is the name of the starting rule.
    // console.log('Created Parse Tree! ', tree)
    const printer = new MADRGenerator();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(printer, tree);
    // console.log('Result ADR ', printer.adr)
    printer.adr.cleanUp();
    return printer.adr;
}

export function adr2md(adrToParse) {
    let adr = cloneDeep(adrToParse)
    adr.cleanUp();
    var md = '# ' + adr.title + '\n'

    if ((adr.status !== '' && adr.status !== 'null') || adr.deciders.length > 0 || adr.date !== '') {
        if (adr.status !== '' && adr.status !== 'null') {
            md = md.concat('\n* Status: ' + adr.status.trim())
        }
        if (adr.deciders.length > 0) {
            md = md.concat('\n* Deciders: ' + adr.deciders)
        }
        if (adr.date !== '') {
            md = md.concat('\n* Date: ' + adr.date)
        }
        md = md.concat('\n')
    }

    if (adr.technicalStory !== '') {
        md = md.concat('\nTechnical Story: ' + adr.technicalStory + '\n')
    }

    if (adr.contextAndProblemStatement !== '') {
        md = md.concat('\n## Context and Problem Statement\n\n' + adr.contextAndProblemStatement + '\n')
    }

    if (adr.decisionDrivers.length > 0) {
        md = md.concat('\n## Decision Drivers\n\n')
        for (let i in adr.decisionDrivers) {
            md = md.concat('* ' + adr.decisionDrivers[i] + '\n')
        }
    }

    if (adr.consideredOptions.length > 0) {
        md = md.concat('\n## Considered Options\n\n')
        md = adr.consideredOptions.reduce((total, opt) => (total + '* ' + opt.title + '\n'), md)
    }

    md = md.concat('\n## Decision Outcome\n\nChosen option: "' + adr.decisionOutcome.chosenOption)

    if (adr.decisionOutcome.explanation.trim() !== '') {
        let isList = adr.decisionOutcome.explanation.trim().match(/^[*-+]/)
        if (isList) {
            md = md.concat('", because\n\n' + adr.decisionOutcome.explanation + '\n')
        } else {
            md = md.concat('", because ' + adr.decisionOutcome.explanation + '\n')
        }
    } else {
        md = md.concat('"\n')
    }

    if (adr.decisionOutcome.positiveConsequences.length > 0) {
        md = md.concat('\n### Positive Consequences\n\n')
        md = adr.decisionOutcome.positiveConsequences.reduce((total, con) => (total + '* ' + con + '\n'), md)

    }
    if (adr.decisionOutcome.negativeConsequences.length > 0) {
        md = md.concat('\n### Negative Consequences\n\n')
        md = adr.decisionOutcome.negativeConsequences.reduce((total, con) => (total + '* ' + con + '\n'), md)
    }

    if (adr.consideredOptions.some((opt) => (opt.description !== '' || opt.pros.length > 0 || opt.cons.length > 0))) {
        md = md.concat('\n## Pros and Cons of the Options\n')
        md = adr.consideredOptions.reduce((total, opt) => {
            if (opt.description !== '' || opt.pros.length > 0 || opt.cons.length > 0) {
                let res = total.concat('\n### ' + opt.title + '\n\n')
                if (opt.description !== '') {
                    res = res.concat(opt.description + '\n\n')
                }
                res = opt.pros.reduce((total, arg) => (total.concat('* Good, because ' + arg + '\n')), res)
                res = opt.cons.reduce((total, arg) => (total.concat('* Bad, because ' + arg + '\n')), res)
                return res
            } else {
                return total
            }
        }, md)
    }
    if (adr.links.length > 0) {
        md = md.concat('\n## Links\n\n')
        md = adr.links.reduce((total, link) => (total + '* ' + link + '\n'), md)
    }
    return md
}



/**
 * Converts an string in snake case into an natural-language-like string.
 * 
 * Example: '0001-add-status-field' is converted to '0001 Add Status Field'
 * 
 * @param {string} snake 
 */
export function snakeCase2naturalCase(snake) {
    return snake.replace(
        /([-_][a-z])/g,
        (group) => group.toUpperCase()
            .replace('-', ' ')
            .replace('_', ' ')
    )
}

/**
* Converts an string in natural case into an snake case string.
* 
* Can be used to generate a file name from the title of an ADR.
* 
* Example: 'Add status Field' is converted to 'add-status-field'
* 
* @param {string} snake
*/
export function naturalCase2snakeCase(natural) {
    return natural.toLowerCase().split(' ').join('-');
}