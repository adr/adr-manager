// Generated from MADR.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from "antlr4";
import MADRListener from "./MADRListener.js";
const serializedATN = [
    4, 1, 23, 282, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8,
    7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2, 16, 7, 16,
    2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7, 21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2,
    25, 7, 25, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 61, 8, 0, 1, 0, 1, 0, 3, 0, 65, 8, 0, 1, 0, 1, 0,
    1, 0, 1, 0, 3, 0, 71, 8, 0, 1, 0, 1, 0, 3, 0, 75, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 81, 8, 0, 1, 0, 1, 0, 1, 0, 3,
    0, 86, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 92, 8, 0, 1, 0, 1, 0, 3, 0, 96, 8, 0, 1, 0, 1, 0, 3, 0, 100, 8, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 3, 0, 106, 8, 0, 1, 0, 1, 0, 1, 0, 3, 0, 111, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 117, 8, 0, 1, 0,
    1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 124, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 131, 8, 0, 1, 0, 1, 0, 1, 0, 3, 0, 136,
    8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 142, 8, 0, 1, 0, 1, 0, 1, 0, 3, 0, 147, 8, 0, 1, 0, 1, 0, 1, 0, 1, 0, 3, 0, 153,
    8, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 4, 1, 4, 1, 5, 1, 5, 1, 6, 1, 6, 1, 7, 1, 7, 1, 8, 1, 8, 1,
    9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 179, 8, 9, 1, 9, 1, 9, 3, 9, 183, 8, 9, 1, 9, 1, 9, 1, 9, 1, 9, 3, 9, 189, 8,
    9, 1, 9, 1, 9, 3, 9, 193, 8, 9, 1, 10, 1, 10, 1, 10, 4, 10, 198, 8, 10, 11, 10, 12, 10, 199, 1, 11, 1, 11, 1, 11, 1,
    11, 1, 11, 1, 11, 3, 11, 208, 8, 11, 1, 11, 1, 11, 1, 11, 3, 11, 213, 8, 11, 1, 11, 1, 11, 1, 11, 3, 11, 218, 8, 11,
    1, 12, 1, 12, 1, 13, 1, 13, 1, 14, 1, 14, 1, 15, 1, 15, 1, 16, 1, 16, 1, 17, 1, 17, 1, 17, 1, 17, 1, 17, 4, 17, 235,
    8, 17, 11, 17, 12, 17, 236, 1, 18, 1, 18, 1, 18, 1, 18, 1, 18, 4, 18, 244, 8, 18, 11, 18, 12, 18, 245, 1, 19, 1, 19,
    1, 19, 1, 20, 1, 20, 1, 20, 3, 20, 254, 8, 20, 4, 20, 256, 8, 20, 11, 20, 12, 20, 257, 1, 21, 1, 21, 4, 21, 262, 8,
    21, 11, 21, 12, 21, 263, 1, 22, 1, 22, 4, 22, 268, 8, 22, 11, 22, 12, 22, 269, 1, 23, 1, 23, 1, 24, 1, 24, 1, 25, 5,
    25, 277, 8, 25, 10, 25, 12, 25, 280, 9, 25, 1, 25, 2, 263, 269, 0, 26, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22,
    24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 0, 2, 4, 0, 3, 4, 7, 7, 13, 13, 15, 15, 1, 0, 5, 6, 290, 0,
    52, 1, 0, 0, 0, 2, 156, 1, 0, 0, 0, 4, 158, 1, 0, 0, 0, 6, 160, 1, 0, 0, 0, 8, 162, 1, 0, 0, 0, 10, 164, 1, 0, 0, 0,
    12, 166, 1, 0, 0, 0, 14, 168, 1, 0, 0, 0, 16, 170, 1, 0, 0, 0, 18, 172, 1, 0, 0, 0, 20, 197, 1, 0, 0, 0, 22, 201, 1,
    0, 0, 0, 24, 219, 1, 0, 0, 0, 26, 221, 1, 0, 0, 0, 28, 223, 1, 0, 0, 0, 30, 225, 1, 0, 0, 0, 32, 227, 1, 0, 0, 0,
    34, 234, 1, 0, 0, 0, 36, 243, 1, 0, 0, 0, 38, 247, 1, 0, 0, 0, 40, 255, 1, 0, 0, 0, 42, 261, 1, 0, 0, 0, 44, 267, 1,
    0, 0, 0, 46, 271, 1, 0, 0, 0, 48, 273, 1, 0, 0, 0, 50, 278, 1, 0, 0, 0, 52, 53, 5, 13, 0, 0, 53, 54, 3, 2, 1, 0, 54,
    55, 5, 6, 0, 0, 55, 64, 3, 50, 25, 0, 56, 57, 5, 8, 0, 0, 57, 60, 3, 4, 2, 0, 58, 59, 5, 5, 0, 0, 59, 61, 5, 11, 0,
    0, 60, 58, 1, 0, 0, 0, 60, 61, 1, 0, 0, 0, 61, 62, 1, 0, 0, 0, 62, 63, 3, 50, 25, 0, 63, 65, 1, 0, 0, 0, 64, 56, 1,
    0, 0, 0, 64, 65, 1, 0, 0, 0, 65, 74, 1, 0, 0, 0, 66, 67, 5, 10, 0, 0, 67, 70, 3, 6, 3, 0, 68, 69, 5, 5, 0, 0, 69,
    71, 5, 11, 0, 0, 70, 68, 1, 0, 0, 0, 70, 71, 1, 0, 0, 0, 71, 72, 1, 0, 0, 0, 72, 73, 3, 50, 25, 0, 73, 75, 1, 0, 0,
    0, 74, 66, 1, 0, 0, 0, 74, 75, 1, 0, 0, 0, 75, 85, 1, 0, 0, 0, 76, 77, 5, 9, 0, 0, 77, 80, 3, 8, 4, 0, 78, 79, 5, 5,
    0, 0, 79, 81, 5, 11, 0, 0, 80, 78, 1, 0, 0, 0, 80, 81, 1, 0, 0, 0, 81, 82, 1, 0, 0, 0, 82, 83, 5, 6, 0, 0, 83, 84,
    3, 50, 25, 0, 84, 86, 1, 0, 0, 0, 85, 76, 1, 0, 0, 0, 85, 86, 1, 0, 0, 0, 86, 95, 1, 0, 0, 0, 87, 88, 5, 12, 0, 0,
    88, 91, 3, 10, 5, 0, 89, 90, 5, 5, 0, 0, 90, 92, 5, 11, 0, 0, 91, 89, 1, 0, 0, 0, 91, 92, 1, 0, 0, 0, 92, 93, 1, 0,
    0, 0, 93, 94, 3, 50, 25, 0, 94, 96, 1, 0, 0, 0, 95, 87, 1, 0, 0, 0, 95, 96, 1, 0, 0, 0, 96, 99, 1, 0, 0, 0, 97, 98,
    5, 16, 0, 0, 98, 100, 3, 50, 25, 0, 99, 97, 1, 0, 0, 0, 99, 100, 1, 0, 0, 0, 100, 105, 1, 0, 0, 0, 101, 102, 5, 6,
    0, 0, 102, 103, 3, 12, 6, 0, 103, 104, 3, 50, 25, 0, 104, 106, 1, 0, 0, 0, 105, 101, 1, 0, 0, 0, 105, 106, 1, 0, 0,
    0, 106, 116, 1, 0, 0, 0, 107, 110, 5, 17, 0, 0, 108, 109, 5, 5, 0, 0, 109, 111, 5, 11, 0, 0, 110, 108, 1, 0, 0, 0,
    110, 111, 1, 0, 0, 0, 111, 112, 1, 0, 0, 0, 112, 113, 3, 50, 25, 0, 113, 114, 3, 14, 7, 0, 114, 115, 3, 50, 25, 0,
    115, 117, 1, 0, 0, 0, 116, 107, 1, 0, 0, 0, 116, 117, 1, 0, 0, 0, 117, 123, 1, 0, 0, 0, 118, 119, 5, 18, 0, 0, 119,
    120, 3, 50, 25, 0, 120, 121, 3, 16, 8, 0, 121, 122, 3, 50, 25, 0, 122, 124, 1, 0, 0, 0, 123, 118, 1, 0, 0, 0, 123,
    124, 1, 0, 0, 0, 124, 130, 1, 0, 0, 0, 125, 126, 5, 19, 0, 0, 126, 127, 3, 50, 25, 0, 127, 128, 3, 18, 9, 0, 128,
    129, 3, 50, 25, 0, 129, 131, 1, 0, 0, 0, 130, 125, 1, 0, 0, 0, 130, 131, 1, 0, 0, 0, 131, 141, 1, 0, 0, 0, 132, 135,
    5, 22, 0, 0, 133, 134, 5, 5, 0, 0, 134, 136, 5, 11, 0, 0, 135, 133, 1, 0, 0, 0, 135, 136, 1, 0, 0, 0, 136, 137, 1,
    0, 0, 0, 137, 138, 3, 50, 25, 0, 138, 139, 3, 20, 10, 0, 139, 140, 3, 50, 25, 0, 140, 142, 1, 0, 0, 0, 141, 132, 1,
    0, 0, 0, 141, 142, 1, 0, 0, 0, 142, 152, 1, 0, 0, 0, 143, 146, 5, 23, 0, 0, 144, 145, 5, 5, 0, 0, 145, 147, 5, 11,
    0, 0, 146, 144, 1, 0, 0, 0, 146, 147, 1, 0, 0, 0, 147, 148, 1, 0, 0, 0, 148, 149, 3, 50, 25, 0, 149, 150, 3, 38, 19,
    0, 150, 151, 3, 50, 25, 0, 151, 153, 1, 0, 0, 0, 152, 143, 1, 0, 0, 0, 152, 153, 1, 0, 0, 0, 153, 154, 1, 0, 0, 0,
    154, 155, 5, 0, 0, 1, 155, 1, 1, 0, 0, 0, 156, 157, 3, 42, 21, 0, 157, 3, 1, 0, 0, 0, 158, 159, 3, 42, 21, 0, 159,
    5, 1, 0, 0, 0, 160, 161, 3, 42, 21, 0, 161, 7, 1, 0, 0, 0, 162, 163, 3, 42, 21, 0, 163, 9, 1, 0, 0, 0, 164, 165, 3,
    42, 21, 0, 165, 11, 1, 0, 0, 0, 166, 167, 3, 44, 22, 0, 167, 13, 1, 0, 0, 0, 168, 169, 3, 40, 20, 0, 169, 15, 1, 0,
    0, 0, 170, 171, 3, 40, 20, 0, 171, 17, 1, 0, 0, 0, 172, 173, 3, 50, 25, 0, 173, 182, 3, 24, 12, 0, 174, 175, 3, 50,
    25, 0, 175, 178, 5, 20, 0, 0, 176, 177, 5, 5, 0, 0, 177, 179, 5, 11, 0, 0, 178, 176, 1, 0, 0, 0, 178, 179, 1, 0, 0,
    0, 179, 180, 1, 0, 0, 0, 180, 181, 3, 26, 13, 0, 181, 183, 1, 0, 0, 0, 182, 174, 1, 0, 0, 0, 182, 183, 1, 0, 0, 0,
    183, 192, 1, 0, 0, 0, 184, 185, 3, 50, 25, 0, 185, 188, 5, 21, 0, 0, 186, 187, 5, 5, 0, 0, 187, 189, 5, 11, 0, 0,
    188, 186, 1, 0, 0, 0, 188, 189, 1, 0, 0, 0, 189, 190, 1, 0, 0, 0, 190, 191, 3, 28, 14, 0, 191, 193, 1, 0, 0, 0, 192,
    184, 1, 0, 0, 0, 192, 193, 1, 0, 0, 0, 193, 19, 1, 0, 0, 0, 194, 195, 3, 22, 11, 0, 195, 196, 3, 50, 25, 0, 196,
    198, 1, 0, 0, 0, 197, 194, 1, 0, 0, 0, 198, 199, 1, 0, 0, 0, 199, 197, 1, 0, 0, 0, 199, 200, 1, 0, 0, 0, 200, 21, 1,
    0, 0, 0, 201, 202, 5, 14, 0, 0, 202, 203, 3, 30, 15, 0, 203, 207, 5, 6, 0, 0, 204, 205, 3, 50, 25, 0, 205, 206, 3,
    32, 16, 0, 206, 208, 1, 0, 0, 0, 207, 204, 1, 0, 0, 0, 207, 208, 1, 0, 0, 0, 208, 212, 1, 0, 0, 0, 209, 210, 3, 50,
    25, 0, 210, 211, 3, 34, 17, 0, 211, 213, 1, 0, 0, 0, 212, 209, 1, 0, 0, 0, 212, 213, 1, 0, 0, 0, 213, 217, 1, 0, 0,
    0, 214, 215, 3, 50, 25, 0, 215, 216, 3, 36, 18, 0, 216, 218, 1, 0, 0, 0, 217, 214, 1, 0, 0, 0, 217, 218, 1, 0, 0, 0,
    218, 23, 1, 0, 0, 0, 219, 220, 3, 44, 22, 0, 220, 25, 1, 0, 0, 0, 221, 222, 3, 40, 20, 0, 222, 27, 1, 0, 0, 0, 223,
    224, 3, 40, 20, 0, 224, 29, 1, 0, 0, 0, 225, 226, 3, 42, 21, 0, 226, 31, 1, 0, 0, 0, 227, 228, 3, 44, 22, 0, 228,
    33, 1, 0, 0, 0, 229, 230, 3, 50, 25, 0, 230, 231, 5, 7, 0, 0, 231, 232, 5, 1, 0, 0, 232, 233, 3, 42, 21, 0, 233,
    235, 1, 0, 0, 0, 234, 229, 1, 0, 0, 0, 235, 236, 1, 0, 0, 0, 236, 234, 1, 0, 0, 0, 236, 237, 1, 0, 0, 0, 237, 35, 1,
    0, 0, 0, 238, 239, 3, 50, 25, 0, 239, 240, 5, 7, 0, 0, 240, 241, 5, 2, 0, 0, 241, 242, 3, 42, 21, 0, 242, 244, 1, 0,
    0, 0, 243, 238, 1, 0, 0, 0, 244, 245, 1, 0, 0, 0, 245, 243, 1, 0, 0, 0, 245, 246, 1, 0, 0, 0, 246, 37, 1, 0, 0, 0,
    247, 248, 3, 40, 20, 0, 248, 249, 3, 50, 25, 0, 249, 39, 1, 0, 0, 0, 250, 251, 3, 50, 25, 0, 251, 253, 5, 7, 0, 0,
    252, 254, 3, 42, 21, 0, 253, 252, 1, 0, 0, 0, 253, 254, 1, 0, 0, 0, 254, 256, 1, 0, 0, 0, 255, 250, 1, 0, 0, 0, 256,
    257, 1, 0, 0, 0, 257, 255, 1, 0, 0, 0, 257, 258, 1, 0, 0, 0, 258, 41, 1, 0, 0, 0, 259, 262, 3, 46, 23, 0, 260, 262,
    5, 5, 0, 0, 261, 259, 1, 0, 0, 0, 261, 260, 1, 0, 0, 0, 262, 263, 1, 0, 0, 0, 263, 264, 1, 0, 0, 0, 263, 261, 1, 0,
    0, 0, 264, 43, 1, 0, 0, 0, 265, 268, 3, 46, 23, 0, 266, 268, 3, 48, 24, 0, 267, 265, 1, 0, 0, 0, 267, 266, 1, 0, 0,
    0, 268, 269, 1, 0, 0, 0, 269, 270, 1, 0, 0, 0, 269, 267, 1, 0, 0, 0, 270, 45, 1, 0, 0, 0, 271, 272, 7, 0, 0, 0, 272,
    47, 1, 0, 0, 0, 273, 274, 7, 1, 0, 0, 274, 49, 1, 0, 0, 0, 275, 277, 3, 48, 24, 0, 276, 275, 1, 0, 0, 0, 277, 280,
    1, 0, 0, 0, 278, 276, 1, 0, 0, 0, 278, 279, 1, 0, 0, 0, 279, 51, 1, 0, 0, 0, 280, 278, 1, 0, 0, 0, 35, 60, 64, 70,
    74, 80, 85, 91, 95, 99, 105, 110, 116, 123, 130, 135, 141, 146, 152, 178, 182, 188, 192, 199, 207, 212, 217, 236,
    245, 253, 257, 261, 263, 267, 269, 278
];

const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map((ds, index) => new antlr4.dfa.DFA(ds, index));

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class MADRParser extends antlr4.Parser {
    static grammarFileName = "MADR.g4";
    static literalNames = [
        null,
        "'Good, because '",
        "'Bad, because '",
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        "'<!-- optional -->'",
        null,
        "'# '"
    ];
    static symbolicNames = [
        null,
        null,
        null,
        "WORD",
        "CHARACTER",
        "WS",
        "NEWLINE",
        "LIST_MARKER",
        "STATUS_MARKER",
        "DATE_MARKER",
        "DECIDERS_MARKER",
        "OPTIONAL_MAKER",
        "TECHNICAL_STORY_MARKER",
        "HEADING_PREFIX",
        "SUBSUBHEADING_PREFIX",
        "SUBSUBSUBHEADING_PREFIX",
        "CONTEXT_AND_PROBLEM_STATEMENT",
        "DECISION_DRIVERS_HEADING",
        "CONSIDERED_OPTIONS_HEADING",
        "DECISION_OUTCOME_HEADING",
        "POSITIVE_CONSEQUENCES_HEADING",
        "NEGATIVE_CONSEQUENCES_HEADING",
        "PROS_AND_CONS_OF_THE_OPTIONS_HEADING",
        "LINKS_HEADING"
    ];
    static ruleNames = [
        "start",
        "title",
        "status",
        "deciders",
        "date",
        "technicalStory",
        "contextAndProblemStatement",
        "decisionDrivers",
        "consideredOptions",
        "decisionOutcome",
        "prosAndConsOfOptions",
        "optionSection",
        "chosenOptionAndExplanation",
        "positiveConsequences",
        "negativeConsequences",
        "optionTitle",
        "optionDescription",
        "prolist",
        "conlist",
        "links",
        "list",
        "textLine",
        "multilineText",
        "any",
        "wslb",
        "wslbs"
    ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = MADRParser.ruleNames;
        this.literalNames = MADRParser.literalNames;
        this.symbolicNames = MADRParser.symbolicNames;
    }

    start() {
        let localctx = new StartContext(this, this._ctx, this.state);
        this.enterRule(localctx, 0, MADRParser.RULE_start);
        var _la = 0;
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 52;
            this.match(MADRParser.HEADING_PREFIX);
            this.state = 53;
            this.title();
            this.state = 54;
            this.match(MADRParser.NEWLINE);
            this.state = 55;
            this.wslbs();
            this.state = 64;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 8) {
                this.state = 56;
                this.match(MADRParser.STATUS_MARKER);
                this.state = 57;
                this.status();
                this.state = 60;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 0, this._ctx);
                if (la_ === 1) {
                    this.state = 58;
                    this.match(MADRParser.WS);
                    this.state = 59;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 62;
                this.wslbs();
            }

            this.state = 74;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 10) {
                this.state = 66;
                this.match(MADRParser.DECIDERS_MARKER);
                this.state = 67;
                this.deciders();
                this.state = 70;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 2, this._ctx);
                if (la_ === 1) {
                    this.state = 68;
                    this.match(MADRParser.WS);
                    this.state = 69;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 72;
                this.wslbs();
            }

            this.state = 85;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 9) {
                this.state = 76;
                this.match(MADRParser.DATE_MARKER);
                this.state = 77;
                this.date();
                this.state = 80;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                if (_la === 5) {
                    this.state = 78;
                    this.match(MADRParser.WS);
                    this.state = 79;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }

                this.state = 82;
                this.match(MADRParser.NEWLINE);
                this.state = 83;
                this.wslbs();
            }

            this.state = 95;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 12) {
                this.state = 87;
                this.match(MADRParser.TECHNICAL_STORY_MARKER);
                this.state = 88;
                this.technicalStory();
                this.state = 91;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 6, this._ctx);
                if (la_ === 1) {
                    this.state = 89;
                    this.match(MADRParser.WS);
                    this.state = 90;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 93;
                this.wslbs();
            }

            this.state = 99;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 16) {
                this.state = 97;
                this.match(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT);
                this.state = 98;
                this.wslbs();
            }

            this.state = 105;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 6) {
                this.state = 101;
                this.match(MADRParser.NEWLINE);
                this.state = 102;
                this.contextAndProblemStatement();
                this.state = 103;
                this.wslbs();
            }

            this.state = 116;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 17) {
                this.state = 107;
                this.match(MADRParser.DECISION_DRIVERS_HEADING);
                this.state = 110;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 10, this._ctx);
                if (la_ === 1) {
                    this.state = 108;
                    this.match(MADRParser.WS);
                    this.state = 109;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 112;
                this.wslbs();
                this.state = 113;
                this.decisionDrivers();
                this.state = 114;
                this.wslbs();
            }

            this.state = 123;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 18) {
                this.state = 118;
                this.match(MADRParser.CONSIDERED_OPTIONS_HEADING);
                this.state = 119;
                this.wslbs();
                this.state = 120;
                this.consideredOptions();
                this.state = 121;
                this.wslbs();
            }

            this.state = 130;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 19) {
                this.state = 125;
                this.match(MADRParser.DECISION_OUTCOME_HEADING);
                this.state = 126;
                this.wslbs();
                this.state = 127;
                this.decisionOutcome();
                this.state = 128;
                this.wslbs();
            }

            this.state = 141;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 22) {
                this.state = 132;
                this.match(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING);
                this.state = 135;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 14, this._ctx);
                if (la_ === 1) {
                    this.state = 133;
                    this.match(MADRParser.WS);
                    this.state = 134;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 137;
                this.wslbs();
                this.state = 138;
                this.prosAndConsOfOptions();
                this.state = 139;
                this.wslbs();
            }

            this.state = 152;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 23) {
                this.state = 143;
                this.match(MADRParser.LINKS_HEADING);
                this.state = 146;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 16, this._ctx);
                if (la_ === 1) {
                    this.state = 144;
                    this.match(MADRParser.WS);
                    this.state = 145;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 148;
                this.wslbs();
                this.state = 149;
                this.links();
                this.state = 150;
                this.wslbs();
            }

            this.state = 154;
            this.match(MADRParser.EOF);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    title() {
        let localctx = new TitleContext(this, this._ctx, this.state);
        this.enterRule(localctx, 2, MADRParser.RULE_title);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 156;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    status() {
        let localctx = new StatusContext(this, this._ctx, this.state);
        this.enterRule(localctx, 4, MADRParser.RULE_status);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 158;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    deciders() {
        let localctx = new DecidersContext(this, this._ctx, this.state);
        this.enterRule(localctx, 6, MADRParser.RULE_deciders);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 160;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    date() {
        let localctx = new DateContext(this, this._ctx, this.state);
        this.enterRule(localctx, 8, MADRParser.RULE_date);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 162;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    technicalStory() {
        let localctx = new TechnicalStoryContext(this, this._ctx, this.state);
        this.enterRule(localctx, 10, MADRParser.RULE_technicalStory);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 164;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    contextAndProblemStatement() {
        let localctx = new ContextAndProblemStatementContext(this, this._ctx, this.state);
        this.enterRule(localctx, 12, MADRParser.RULE_contextAndProblemStatement);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 166;
            this.multilineText();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    decisionDrivers() {
        let localctx = new DecisionDriversContext(this, this._ctx, this.state);
        this.enterRule(localctx, 14, MADRParser.RULE_decisionDrivers);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 168;
            this.list();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    consideredOptions() {
        let localctx = new ConsideredOptionsContext(this, this._ctx, this.state);
        this.enterRule(localctx, 16, MADRParser.RULE_consideredOptions);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 170;
            this.list();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    decisionOutcome() {
        let localctx = new DecisionOutcomeContext(this, this._ctx, this.state);
        this.enterRule(localctx, 18, MADRParser.RULE_decisionOutcome);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 172;
            this.wslbs();
            this.state = 173;
            this.chosenOptionAndExplanation();
            this.state = 182;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 19, this._ctx);
            if (la_ === 1) {
                this.state = 174;
                this.wslbs();
                this.state = 175;
                this.match(MADRParser.POSITIVE_CONSEQUENCES_HEADING);
                this.state = 178;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 18, this._ctx);
                if (la_ === 1) {
                    this.state = 176;
                    this.match(MADRParser.WS);
                    this.state = 177;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 180;
                this.positiveConsequences();
            }
            this.state = 192;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 21, this._ctx);
            if (la_ === 1) {
                this.state = 184;
                this.wslbs();
                this.state = 185;
                this.match(MADRParser.NEGATIVE_CONSEQUENCES_HEADING);
                this.state = 188;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input, 20, this._ctx);
                if (la_ === 1) {
                    this.state = 186;
                    this.match(MADRParser.WS);
                    this.state = 187;
                    this.match(MADRParser.OPTIONAL_MAKER);
                }
                this.state = 190;
                this.negativeConsequences();
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    prosAndConsOfOptions() {
        let localctx = new ProsAndConsOfOptionsContext(this, this._ctx, this.state);
        this.enterRule(localctx, 20, MADRParser.RULE_prosAndConsOfOptions);
        var _la = 0;
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 197;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            do {
                this.state = 194;
                this.optionSection();
                this.state = 195;
                this.wslbs();
                this.state = 199;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            } while (_la === 14);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    optionSection() {
        let localctx = new OptionSectionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 22, MADRParser.RULE_optionSection);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 201;
            this.match(MADRParser.SUBSUBHEADING_PREFIX);
            this.state = 202;
            this.optionTitle();
            this.state = 203;
            this.match(MADRParser.NEWLINE);
            this.state = 207;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 23, this._ctx);
            if (la_ === 1) {
                this.state = 204;
                this.wslbs();
                this.state = 205;
                this.optionDescription();
            }
            this.state = 212;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 24, this._ctx);
            if (la_ === 1) {
                this.state = 209;
                this.wslbs();
                this.state = 210;
                this.prolist();
            }
            this.state = 217;
            this._errHandler.sync(this);
            var la_ = this._interp.adaptivePredict(this._input, 25, this._ctx);
            if (la_ === 1) {
                this.state = 214;
                this.wslbs();
                this.state = 215;
                this.conlist();
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    chosenOptionAndExplanation() {
        let localctx = new ChosenOptionAndExplanationContext(this, this._ctx, this.state);
        this.enterRule(localctx, 24, MADRParser.RULE_chosenOptionAndExplanation);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 219;
            this.multilineText();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    positiveConsequences() {
        let localctx = new PositiveConsequencesContext(this, this._ctx, this.state);
        this.enterRule(localctx, 26, MADRParser.RULE_positiveConsequences);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 221;
            this.list();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    negativeConsequences() {
        let localctx = new NegativeConsequencesContext(this, this._ctx, this.state);
        this.enterRule(localctx, 28, MADRParser.RULE_negativeConsequences);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 223;
            this.list();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    optionTitle() {
        let localctx = new OptionTitleContext(this, this._ctx, this.state);
        this.enterRule(localctx, 30, MADRParser.RULE_optionTitle);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 225;
            this.textLine();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    optionDescription() {
        let localctx = new OptionDescriptionContext(this, this._ctx, this.state);
        this.enterRule(localctx, 32, MADRParser.RULE_optionDescription);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 227;
            this.multilineText();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    prolist() {
        let localctx = new ProlistContext(this, this._ctx, this.state);
        this.enterRule(localctx, 34, MADRParser.RULE_prolist);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 234;
            this._errHandler.sync(this);
            var _alt = 1;
            do {
                switch (_alt) {
                    case 1:
                        this.state = 229;
                        this.wslbs();
                        this.state = 230;
                        this.match(MADRParser.LIST_MARKER);
                        this.state = 231;
                        this.match(MADRParser.T__0);
                        this.state = 232;
                        this.textLine();
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 236;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 26, this._ctx);
            } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    conlist() {
        let localctx = new ConlistContext(this, this._ctx, this.state);
        this.enterRule(localctx, 36, MADRParser.RULE_conlist);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 243;
            this._errHandler.sync(this);
            var _alt = 1;
            do {
                switch (_alt) {
                    case 1:
                        this.state = 238;
                        this.wslbs();
                        this.state = 239;
                        this.match(MADRParser.LIST_MARKER);
                        this.state = 240;
                        this.match(MADRParser.T__1);
                        this.state = 241;
                        this.textLine();
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 245;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 27, this._ctx);
            } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    links() {
        let localctx = new LinksContext(this, this._ctx, this.state);
        this.enterRule(localctx, 38, MADRParser.RULE_links);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 247;
            this.list();
            this.state = 248;
            this.wslbs();
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    list() {
        let localctx = new ListContext(this, this._ctx, this.state);
        this.enterRule(localctx, 40, MADRParser.RULE_list);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 255;
            this._errHandler.sync(this);
            var _alt = 1;
            do {
                switch (_alt) {
                    case 1:
                        this.state = 250;
                        this.wslbs();
                        this.state = 251;
                        this.match(MADRParser.LIST_MARKER);
                        this.state = 253;
                        this._errHandler.sync(this);
                        var la_ = this._interp.adaptivePredict(this._input, 28, this._ctx);
                        if (la_ === 1) {
                            this.state = 252;
                            this.textLine();
                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 257;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 29, this._ctx);
            } while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    textLine() {
        let localctx = new TextLineContext(this, this._ctx, this.state);
        this.enterRule(localctx, 42, MADRParser.RULE_textLine);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 261;
            this._errHandler.sync(this);
            var _alt = 1 + 1;
            do {
                switch (_alt) {
                    case 1 + 1:
                        this.state = 261;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 3:
                            case 4:
                            case 7:
                            case 13:
                            case 15:
                                this.state = 259;
                                this.any();
                                break;
                            case 5:
                                this.state = 260;
                                this.match(MADRParser.WS);
                                break;
                            default:
                                throw new antlr4.error.NoViableAltException(this);
                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 263;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
            } while (_alt != 1 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    multilineText() {
        let localctx = new MultilineTextContext(this, this._ctx, this.state);
        this.enterRule(localctx, 44, MADRParser.RULE_multilineText);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 267;
            this._errHandler.sync(this);
            var _alt = 1 + 1;
            do {
                switch (_alt) {
                    case 1 + 1:
                        this.state = 267;
                        this._errHandler.sync(this);
                        switch (this._input.LA(1)) {
                            case 3:
                            case 4:
                            case 7:
                            case 13:
                            case 15:
                                this.state = 265;
                                this.any();
                                break;
                            case 5:
                            case 6:
                                this.state = 266;
                                this.wslb();
                                break;
                            default:
                                throw new antlr4.error.NoViableAltException(this);
                        }
                        break;
                    default:
                        throw new antlr4.error.NoViableAltException(this);
                }
                this.state = 269;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 33, this._ctx);
            } while (_alt != 1 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER);
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    any() {
        let localctx = new AnyContext(this, this._ctx, this.state);
        this.enterRule(localctx, 46, MADRParser.RULE_any);
        var _la = 0;
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 271;
            _la = this._input.LA(1);
            if (!((_la & ~0x1f) === 0 && ((1 << _la) & 41112) !== 0)) {
                this._errHandler.recoverInline(this);
            } else {
                this._errHandler.reportMatch(this);
                this.consume();
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    wslb() {
        let localctx = new WslbContext(this, this._ctx, this.state);
        this.enterRule(localctx, 48, MADRParser.RULE_wslb);
        var _la = 0;
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 273;
            _la = this._input.LA(1);
            if (!(_la === 5 || _la === 6)) {
                this._errHandler.recoverInline(this);
            } else {
                this._errHandler.reportMatch(this);
                this.consume();
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }

    wslbs() {
        let localctx = new WslbsContext(this, this._ctx, this.state);
        this.enterRule(localctx, 50, MADRParser.RULE_wslbs);
        try {
            this.enterOuterAlt(localctx, 1);
            this.state = 278;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
            while (_alt != 2 && _alt != antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if (_alt === 1) {
                    this.state = 275;
                    this.wslb();
                }
                this.state = 280;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 34, this._ctx);
            }
        } catch (re) {
            if (re instanceof antlr4.error.RecognitionException) {
                localctx.exception = re;
                this._errHandler.reportError(this, re);
                this._errHandler.recover(this, re);
            } else {
                throw re;
            }
        } finally {
            this.exitRule();
        }
        return localctx;
    }
}

MADRParser.EOF = antlr4.Token.EOF;
MADRParser.T__0 = 1;
MADRParser.T__1 = 2;
MADRParser.WORD = 3;
MADRParser.CHARACTER = 4;
MADRParser.WS = 5;
MADRParser.NEWLINE = 6;
MADRParser.LIST_MARKER = 7;
MADRParser.STATUS_MARKER = 8;
MADRParser.DATE_MARKER = 9;
MADRParser.DECIDERS_MARKER = 10;
MADRParser.OPTIONAL_MAKER = 11;
MADRParser.TECHNICAL_STORY_MARKER = 12;
MADRParser.HEADING_PREFIX = 13;
MADRParser.SUBSUBHEADING_PREFIX = 14;
MADRParser.SUBSUBSUBHEADING_PREFIX = 15;
MADRParser.CONTEXT_AND_PROBLEM_STATEMENT = 16;
MADRParser.DECISION_DRIVERS_HEADING = 17;
MADRParser.CONSIDERED_OPTIONS_HEADING = 18;
MADRParser.DECISION_OUTCOME_HEADING = 19;
MADRParser.POSITIVE_CONSEQUENCES_HEADING = 20;
MADRParser.NEGATIVE_CONSEQUENCES_HEADING = 21;
MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING = 22;
MADRParser.LINKS_HEADING = 23;

MADRParser.RULE_start = 0;
MADRParser.RULE_title = 1;
MADRParser.RULE_status = 2;
MADRParser.RULE_deciders = 3;
MADRParser.RULE_date = 4;
MADRParser.RULE_technicalStory = 5;
MADRParser.RULE_contextAndProblemStatement = 6;
MADRParser.RULE_decisionDrivers = 7;
MADRParser.RULE_consideredOptions = 8;
MADRParser.RULE_decisionOutcome = 9;
MADRParser.RULE_prosAndConsOfOptions = 10;
MADRParser.RULE_optionSection = 11;
MADRParser.RULE_chosenOptionAndExplanation = 12;
MADRParser.RULE_positiveConsequences = 13;
MADRParser.RULE_negativeConsequences = 14;
MADRParser.RULE_optionTitle = 15;
MADRParser.RULE_optionDescription = 16;
MADRParser.RULE_prolist = 17;
MADRParser.RULE_conlist = 18;
MADRParser.RULE_links = 19;
MADRParser.RULE_list = 20;
MADRParser.RULE_textLine = 21;
MADRParser.RULE_multilineText = 22;
MADRParser.RULE_any = 23;
MADRParser.RULE_wslb = 24;
MADRParser.RULE_wslbs = 25;

class StartContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_start;
    }

    HEADING_PREFIX() {
        return this.getToken(MADRParser.HEADING_PREFIX, 0);
    }

    title() {
        return this.getTypedRuleContext(TitleContext, 0);
    }

    NEWLINE = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.NEWLINE);
        } else {
            return this.getToken(MADRParser.NEWLINE, i);
        }
    };

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    EOF() {
        return this.getToken(MADRParser.EOF, 0);
    }

    STATUS_MARKER() {
        return this.getToken(MADRParser.STATUS_MARKER, 0);
    }

    status() {
        return this.getTypedRuleContext(StatusContext, 0);
    }

    DECIDERS_MARKER() {
        return this.getToken(MADRParser.DECIDERS_MARKER, 0);
    }

    deciders() {
        return this.getTypedRuleContext(DecidersContext, 0);
    }

    DATE_MARKER() {
        return this.getToken(MADRParser.DATE_MARKER, 0);
    }

    date() {
        return this.getTypedRuleContext(DateContext, 0);
    }

    TECHNICAL_STORY_MARKER() {
        return this.getToken(MADRParser.TECHNICAL_STORY_MARKER, 0);
    }

    technicalStory() {
        return this.getTypedRuleContext(TechnicalStoryContext, 0);
    }

    CONTEXT_AND_PROBLEM_STATEMENT() {
        return this.getToken(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT, 0);
    }

    contextAndProblemStatement() {
        return this.getTypedRuleContext(ContextAndProblemStatementContext, 0);
    }

    DECISION_DRIVERS_HEADING() {
        return this.getToken(MADRParser.DECISION_DRIVERS_HEADING, 0);
    }

    decisionDrivers() {
        return this.getTypedRuleContext(DecisionDriversContext, 0);
    }

    CONSIDERED_OPTIONS_HEADING() {
        return this.getToken(MADRParser.CONSIDERED_OPTIONS_HEADING, 0);
    }

    consideredOptions() {
        return this.getTypedRuleContext(ConsideredOptionsContext, 0);
    }

    DECISION_OUTCOME_HEADING() {
        return this.getToken(MADRParser.DECISION_OUTCOME_HEADING, 0);
    }

    decisionOutcome() {
        return this.getTypedRuleContext(DecisionOutcomeContext, 0);
    }

    PROS_AND_CONS_OF_THE_OPTIONS_HEADING() {
        return this.getToken(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING, 0);
    }

    prosAndConsOfOptions() {
        return this.getTypedRuleContext(ProsAndConsOfOptionsContext, 0);
    }

    LINKS_HEADING() {
        return this.getToken(MADRParser.LINKS_HEADING, 0);
    }

    links() {
        return this.getTypedRuleContext(LinksContext, 0);
    }

    WS = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.WS);
        } else {
            return this.getToken(MADRParser.WS, i);
        }
    };

    OPTIONAL_MAKER = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.OPTIONAL_MAKER);
        } else {
            return this.getToken(MADRParser.OPTIONAL_MAKER, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterStart(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitStart(this);
        }
    }
}

class TitleContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_title;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterTitle(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitTitle(this);
        }
    }
}

class StatusContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_status;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterStatus(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitStatus(this);
        }
    }
}

class DecidersContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_deciders;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterDeciders(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitDeciders(this);
        }
    }
}

class DateContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_date;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterDate(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitDate(this);
        }
    }
}

class TechnicalStoryContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_technicalStory;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterTechnicalStory(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitTechnicalStory(this);
        }
    }
}

class ContextAndProblemStatementContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_contextAndProblemStatement;
    }

    multilineText() {
        return this.getTypedRuleContext(MultilineTextContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterContextAndProblemStatement(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitContextAndProblemStatement(this);
        }
    }
}

class DecisionDriversContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionDrivers;
    }

    list() {
        return this.getTypedRuleContext(ListContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterDecisionDrivers(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitDecisionDrivers(this);
        }
    }
}

class ConsideredOptionsContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_consideredOptions;
    }

    list() {
        return this.getTypedRuleContext(ListContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterConsideredOptions(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitConsideredOptions(this);
        }
    }
}

class DecisionOutcomeContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionOutcome;
    }

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    chosenOptionAndExplanation() {
        return this.getTypedRuleContext(ChosenOptionAndExplanationContext, 0);
    }

    POSITIVE_CONSEQUENCES_HEADING() {
        return this.getToken(MADRParser.POSITIVE_CONSEQUENCES_HEADING, 0);
    }

    positiveConsequences() {
        return this.getTypedRuleContext(PositiveConsequencesContext, 0);
    }

    NEGATIVE_CONSEQUENCES_HEADING() {
        return this.getToken(MADRParser.NEGATIVE_CONSEQUENCES_HEADING, 0);
    }

    negativeConsequences() {
        return this.getTypedRuleContext(NegativeConsequencesContext, 0);
    }

    WS = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.WS);
        } else {
            return this.getToken(MADRParser.WS, i);
        }
    };

    OPTIONAL_MAKER = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.OPTIONAL_MAKER);
        } else {
            return this.getToken(MADRParser.OPTIONAL_MAKER, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterDecisionOutcome(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitDecisionOutcome(this);
        }
    }
}

class ProsAndConsOfOptionsContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prosAndConsOfOptions;
    }

    optionSection = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(OptionSectionContext);
        } else {
            return this.getTypedRuleContext(OptionSectionContext, i);
        }
    };

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterProsAndConsOfOptions(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitProsAndConsOfOptions(this);
        }
    }
}

class OptionSectionContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionSection;
    }

    SUBSUBHEADING_PREFIX() {
        return this.getToken(MADRParser.SUBSUBHEADING_PREFIX, 0);
    }

    optionTitle() {
        return this.getTypedRuleContext(OptionTitleContext, 0);
    }

    NEWLINE() {
        return this.getToken(MADRParser.NEWLINE, 0);
    }

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    optionDescription() {
        return this.getTypedRuleContext(OptionDescriptionContext, 0);
    }

    prolist() {
        return this.getTypedRuleContext(ProlistContext, 0);
    }

    conlist() {
        return this.getTypedRuleContext(ConlistContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterOptionSection(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitOptionSection(this);
        }
    }
}

class ChosenOptionAndExplanationContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_chosenOptionAndExplanation;
    }

    multilineText() {
        return this.getTypedRuleContext(MultilineTextContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterChosenOptionAndExplanation(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitChosenOptionAndExplanation(this);
        }
    }
}

class PositiveConsequencesContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_positiveConsequences;
    }

    list() {
        return this.getTypedRuleContext(ListContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterPositiveConsequences(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitPositiveConsequences(this);
        }
    }
}

class NegativeConsequencesContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_negativeConsequences;
    }

    list() {
        return this.getTypedRuleContext(ListContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterNegativeConsequences(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitNegativeConsequences(this);
        }
    }
}

class OptionTitleContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionTitle;
    }

    textLine() {
        return this.getTypedRuleContext(TextLineContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterOptionTitle(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitOptionTitle(this);
        }
    }
}

class OptionDescriptionContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionDescription;
    }

    multilineText() {
        return this.getTypedRuleContext(MultilineTextContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterOptionDescription(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitOptionDescription(this);
        }
    }
}

class ProlistContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prolist;
    }

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    LIST_MARKER = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.LIST_MARKER);
        } else {
            return this.getToken(MADRParser.LIST_MARKER, i);
        }
    };

    textLine = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(TextLineContext);
        } else {
            return this.getTypedRuleContext(TextLineContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterProlist(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitProlist(this);
        }
    }
}

class ConlistContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_conlist;
    }

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    LIST_MARKER = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.LIST_MARKER);
        } else {
            return this.getToken(MADRParser.LIST_MARKER, i);
        }
    };

    textLine = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(TextLineContext);
        } else {
            return this.getTypedRuleContext(TextLineContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterConlist(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitConlist(this);
        }
    }
}

class LinksContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_links;
    }

    list() {
        return this.getTypedRuleContext(ListContext, 0);
    }

    wslbs() {
        return this.getTypedRuleContext(WslbsContext, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterLinks(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitLinks(this);
        }
    }
}

class ListContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_list;
    }

    wslbs = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbsContext);
        } else {
            return this.getTypedRuleContext(WslbsContext, i);
        }
    };

    LIST_MARKER = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.LIST_MARKER);
        } else {
            return this.getToken(MADRParser.LIST_MARKER, i);
        }
    };

    textLine = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(TextLineContext);
        } else {
            return this.getTypedRuleContext(TextLineContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterList(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitList(this);
        }
    }
}

class TextLineContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_textLine;
    }

    any = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(AnyContext);
        } else {
            return this.getTypedRuleContext(AnyContext, i);
        }
    };

    WS = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTokens(MADRParser.WS);
        } else {
            return this.getToken(MADRParser.WS, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterTextLine(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitTextLine(this);
        }
    }
}

class MultilineTextContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_multilineText;
    }

    any = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(AnyContext);
        } else {
            return this.getTypedRuleContext(AnyContext, i);
        }
    };

    wslb = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbContext);
        } else {
            return this.getTypedRuleContext(WslbContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterMultilineText(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitMultilineText(this);
        }
    }
}

class AnyContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_any;
    }

    WORD() {
        return this.getToken(MADRParser.WORD, 0);
    }

    CHARACTER() {
        return this.getToken(MADRParser.CHARACTER, 0);
    }

    LIST_MARKER() {
        return this.getToken(MADRParser.LIST_MARKER, 0);
    }

    HEADING_PREFIX() {
        return this.getToken(MADRParser.HEADING_PREFIX, 0);
    }

    SUBSUBSUBHEADING_PREFIX() {
        return this.getToken(MADRParser.SUBSUBSUBHEADING_PREFIX, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterAny(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitAny(this);
        }
    }
}

class WslbContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslb;
    }

    WS() {
        return this.getToken(MADRParser.WS, 0);
    }

    NEWLINE() {
        return this.getToken(MADRParser.NEWLINE, 0);
    }

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterWslb(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitWslb(this);
        }
    }
}

class WslbsContext extends antlr4.ParserRuleContext {
    constructor(parser, parent, invokingState) {
        if (parent === undefined) {
            parent = null;
        }
        if (invokingState === undefined || invokingState === null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslbs;
    }

    wslb = function (i) {
        if (i === undefined) {
            i = null;
        }
        if (i === null) {
            return this.getTypedRuleContexts(WslbContext);
        } else {
            return this.getTypedRuleContext(WslbContext, i);
        }
    };

    enterRule(listener) {
        if (listener instanceof MADRListener) {
            listener.enterWslbs(this);
        }
    }

    exitRule(listener) {
        if (listener instanceof MADRListener) {
            listener.exitWslbs(this);
        }
    }
}

MADRParser.StartContext = StartContext;
MADRParser.TitleContext = TitleContext;
MADRParser.StatusContext = StatusContext;
MADRParser.DecidersContext = DecidersContext;
MADRParser.DateContext = DateContext;
MADRParser.TechnicalStoryContext = TechnicalStoryContext;
MADRParser.ContextAndProblemStatementContext = ContextAndProblemStatementContext;
MADRParser.DecisionDriversContext = DecisionDriversContext;
MADRParser.ConsideredOptionsContext = ConsideredOptionsContext;
MADRParser.DecisionOutcomeContext = DecisionOutcomeContext;
MADRParser.ProsAndConsOfOptionsContext = ProsAndConsOfOptionsContext;
MADRParser.OptionSectionContext = OptionSectionContext;
MADRParser.ChosenOptionAndExplanationContext = ChosenOptionAndExplanationContext;
MADRParser.PositiveConsequencesContext = PositiveConsequencesContext;
MADRParser.NegativeConsequencesContext = NegativeConsequencesContext;
MADRParser.OptionTitleContext = OptionTitleContext;
MADRParser.OptionDescriptionContext = OptionDescriptionContext;
MADRParser.ProlistContext = ProlistContext;
MADRParser.ConlistContext = ConlistContext;
MADRParser.LinksContext = LinksContext;
MADRParser.ListContext = ListContext;
MADRParser.TextLineContext = TextLineContext;
MADRParser.MultilineTextContext = MultilineTextContext;
MADRParser.AnyContext = AnyContext;
MADRParser.WslbContext = WslbContext;
MADRParser.WslbsContext = WslbsContext;
