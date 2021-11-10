// Generated from MADR.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';
import MADRListener from './MADRListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0019\u011c\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010",
    "\t\u0010\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013",
    "\u0004\u0014\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017",
    "\t\u0017\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a",
    "\u0004\u001b\t\u001b\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002?\n\u0002",
    "\u0003\u0002\u0003\u0002\u0005\u0002C\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0005\u0002I\n\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002M\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002",
    "\u0005\u0002S\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002",
    "X\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005\u0002",
    "^\n\u0002\u0003\u0002\u0003\u0002\u0005\u0002b\n\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002f\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002l\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002q\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0005",
    "\u0002w\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0005\u0002~\n\u0002\u0003\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0005\u0002\u0085\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002\u008a\n\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0005\u0002\u0090\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0005\u0002\u0095\n\u0002\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0005\u0002\u009b\n\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003",
    "\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00b5\n\u000b\u0003\u000b",
    "\u0003\u000b\u0005\u000b\u00b9\n\u000b\u0003\u000b\u0003\u000b\u0003",
    "\u000b\u0003\u000b\u0005\u000b\u00bf\n\u000b\u0003\u000b\u0003\u000b",
    "\u0005\u000b\u00c3\n\u000b\u0003\f\u0003\f\u0003\f\u0006\f\u00c8\n\f",
    "\r\f\u000e\f\u00c9\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0003\r\u0005",
    "\r\u00d2\n\r\u0003\r\u0003\r\u0003\r\u0005\r\u00d7\n\r\u0003\r\u0003",
    "\r\u0003\r\u0005\r\u00dc\n\r\u0003\u000e\u0003\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003\u0012\u0003",
    "\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0006",
    "\u0013\u00ed\n\u0013\r\u0013\u000e\u0013\u00ee\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0003\u0014\u0003\u0014\u0006\u0014\u00f6\n\u0014\r\u0014",
    "\u000e\u0014\u00f7\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0016\u0003",
    "\u0016\u0003\u0016\u0005\u0016\u0100\n\u0016\u0006\u0016\u0102\n\u0016",
    "\r\u0016\u000e\u0016\u0103\u0003\u0017\u0003\u0017\u0006\u0017\u0108",
    "\n\u0017\r\u0017\u000e\u0017\u0109\u0003\u0018\u0003\u0018\u0006\u0018",
    "\u010e\n\u0018\r\u0018\u000e\u0018\u010f\u0003\u0019\u0003\u0019\u0003",
    "\u001a\u0003\u001a\u0003\u001b\u0007\u001b\u0117\n\u001b\f\u001b\u000e",
    "\u001b\u011a\u000b\u001b\u0003\u001b\u0004\u0109\u010f\u0002\u001c\u0002",
    "\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e",
    " \"$&(*,.024\u0002\u0004\u0006\u0002\u0005\u0006\t\t\u000f\u000f\u0011",
    "\u0011\u0003\u0002\u0007\b\u0002\u0124\u00026\u0003\u0002\u0002\u0002",
    "\u0004\u009e\u0003\u0002\u0002\u0002\u0006\u00a0\u0003\u0002\u0002\u0002",
    "\b\u00a2\u0003\u0002\u0002\u0002\n\u00a4\u0003\u0002\u0002\u0002\f\u00a6",
    "\u0003\u0002\u0002\u0002\u000e\u00a8\u0003\u0002\u0002\u0002\u0010\u00aa",
    "\u0003\u0002\u0002\u0002\u0012\u00ac\u0003\u0002\u0002\u0002\u0014\u00ae",
    "\u0003\u0002\u0002\u0002\u0016\u00c7\u0003\u0002\u0002\u0002\u0018\u00cb",
    "\u0003\u0002\u0002\u0002\u001a\u00dd\u0003\u0002\u0002\u0002\u001c\u00df",
    "\u0003\u0002\u0002\u0002\u001e\u00e1\u0003\u0002\u0002\u0002 \u00e3",
    "\u0003\u0002\u0002\u0002\"\u00e5\u0003\u0002\u0002\u0002$\u00ec\u0003",
    "\u0002\u0002\u0002&\u00f5\u0003\u0002\u0002\u0002(\u00f9\u0003\u0002",
    "\u0002\u0002*\u0101\u0003\u0002\u0002\u0002,\u0107\u0003\u0002\u0002",
    "\u0002.\u010d\u0003\u0002\u0002\u00020\u0111\u0003\u0002\u0002\u0002",
    "2\u0113\u0003\u0002\u0002\u00024\u0118\u0003\u0002\u0002\u000267\u0007",
    "\u000f\u0002\u000278\u0005\u0004\u0003\u000289\u0007\b\u0002\u00029",
    "B\u00054\u001b\u0002:;\u0007\n\u0002\u0002;>\u0005\u0006\u0004\u0002",
    "<=\u0007\u0007\u0002\u0002=?\u0007\r\u0002\u0002><\u0003\u0002\u0002",
    "\u0002>?\u0003\u0002\u0002\u0002?@\u0003\u0002\u0002\u0002@A\u00054",
    "\u001b\u0002AC\u0003\u0002\u0002\u0002B:\u0003\u0002\u0002\u0002BC\u0003",
    "\u0002\u0002\u0002CL\u0003\u0002\u0002\u0002DE\u0007\f\u0002\u0002E",
    "H\u0005\b\u0005\u0002FG\u0007\u0007\u0002\u0002GI\u0007\r\u0002\u0002",
    "HF\u0003\u0002\u0002\u0002HI\u0003\u0002\u0002\u0002IJ\u0003\u0002\u0002",
    "\u0002JK\u00054\u001b\u0002KM\u0003\u0002\u0002\u0002LD\u0003\u0002",
    "\u0002\u0002LM\u0003\u0002\u0002\u0002MW\u0003\u0002\u0002\u0002NO\u0007",
    "\u000b\u0002\u0002OR\u0005\n\u0006\u0002PQ\u0007\u0007\u0002\u0002Q",
    "S\u0007\r\u0002\u0002RP\u0003\u0002\u0002\u0002RS\u0003\u0002\u0002",
    "\u0002ST\u0003\u0002\u0002\u0002TU\u0007\b\u0002\u0002UV\u00054\u001b",
    "\u0002VX\u0003\u0002\u0002\u0002WN\u0003\u0002\u0002\u0002WX\u0003\u0002",
    "\u0002\u0002Xa\u0003\u0002\u0002\u0002YZ\u0007\u000e\u0002\u0002Z]\u0005",
    "\f\u0007\u0002[\\\u0007\u0007\u0002\u0002\\^\u0007\r\u0002\u0002][\u0003",
    "\u0002\u0002\u0002]^\u0003\u0002\u0002\u0002^_\u0003\u0002\u0002\u0002",
    "_`\u00054\u001b\u0002`b\u0003\u0002\u0002\u0002aY\u0003\u0002\u0002",
    "\u0002ab\u0003\u0002\u0002\u0002be\u0003\u0002\u0002\u0002cd\u0007\u0012",
    "\u0002\u0002df\u00054\u001b\u0002ec\u0003\u0002\u0002\u0002ef\u0003",
    "\u0002\u0002\u0002fk\u0003\u0002\u0002\u0002gh\u0007\b\u0002\u0002h",
    "i\u0005\u000e\b\u0002ij\u00054\u001b\u0002jl\u0003\u0002\u0002\u0002",
    "kg\u0003\u0002\u0002\u0002kl\u0003\u0002\u0002\u0002lv\u0003\u0002\u0002",
    "\u0002mp\u0007\u0013\u0002\u0002no\u0007\u0007\u0002\u0002oq\u0007\r",
    "\u0002\u0002pn\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002\u0002qr\u0003",
    "\u0002\u0002\u0002rs\u00054\u001b\u0002st\u0005\u0010\t\u0002tu\u0005",
    "4\u001b\u0002uw\u0003\u0002\u0002\u0002vm\u0003\u0002\u0002\u0002vw",
    "\u0003\u0002\u0002\u0002w}\u0003\u0002\u0002\u0002xy\u0007\u0014\u0002",
    "\u0002yz\u00054\u001b\u0002z{\u0005\u0012\n\u0002{|\u00054\u001b\u0002",
    "|~\u0003\u0002\u0002\u0002}x\u0003\u0002\u0002\u0002}~\u0003\u0002\u0002",
    "\u0002~\u0084\u0003\u0002\u0002\u0002\u007f\u0080\u0007\u0015\u0002",
    "\u0002\u0080\u0081\u00054\u001b\u0002\u0081\u0082\u0005\u0014\u000b",
    "\u0002\u0082\u0083\u00054\u001b\u0002\u0083\u0085\u0003\u0002\u0002",
    "\u0002\u0084\u007f\u0003\u0002\u0002\u0002\u0084\u0085\u0003\u0002\u0002",
    "\u0002\u0085\u008f\u0003\u0002\u0002\u0002\u0086\u0089\u0007\u0018\u0002",
    "\u0002\u0087\u0088\u0007\u0007\u0002\u0002\u0088\u008a\u0007\r\u0002",
    "\u0002\u0089\u0087\u0003\u0002\u0002\u0002\u0089\u008a\u0003\u0002\u0002",
    "\u0002\u008a\u008b\u0003\u0002\u0002\u0002\u008b\u008c\u00054\u001b",
    "\u0002\u008c\u008d\u0005\u0016\f\u0002\u008d\u008e\u00054\u001b\u0002",
    "\u008e\u0090\u0003\u0002\u0002\u0002\u008f\u0086\u0003\u0002\u0002\u0002",
    "\u008f\u0090\u0003\u0002\u0002\u0002\u0090\u009a\u0003\u0002\u0002\u0002",
    "\u0091\u0094\u0007\u0019\u0002\u0002\u0092\u0093\u0007\u0007\u0002\u0002",
    "\u0093\u0095\u0007\r\u0002\u0002\u0094\u0092\u0003\u0002\u0002\u0002",
    "\u0094\u0095\u0003\u0002\u0002\u0002\u0095\u0096\u0003\u0002\u0002\u0002",
    "\u0096\u0097\u00054\u001b\u0002\u0097\u0098\u0005(\u0015\u0002\u0098",
    "\u0099\u00054\u001b\u0002\u0099\u009b\u0003\u0002\u0002\u0002\u009a",
    "\u0091\u0003\u0002\u0002\u0002\u009a\u009b\u0003\u0002\u0002\u0002\u009b",
    "\u009c\u0003\u0002\u0002\u0002\u009c\u009d\u0007\u0002\u0002\u0003\u009d",
    "\u0003\u0003\u0002\u0002\u0002\u009e\u009f\u0005,\u0017\u0002\u009f",
    "\u0005\u0003\u0002\u0002\u0002\u00a0\u00a1\u0005,\u0017\u0002\u00a1",
    "\u0007\u0003\u0002\u0002\u0002\u00a2\u00a3\u0005,\u0017\u0002\u00a3",
    "\t\u0003\u0002\u0002\u0002\u00a4\u00a5\u0005,\u0017\u0002\u00a5\u000b",
    "\u0003\u0002\u0002\u0002\u00a6\u00a7\u0005,\u0017\u0002\u00a7\r\u0003",
    "\u0002\u0002\u0002\u00a8\u00a9\u0005.\u0018\u0002\u00a9\u000f\u0003",
    "\u0002\u0002\u0002\u00aa\u00ab\u0005*\u0016\u0002\u00ab\u0011\u0003",
    "\u0002\u0002\u0002\u00ac\u00ad\u0005*\u0016\u0002\u00ad\u0013\u0003",
    "\u0002\u0002\u0002\u00ae\u00af\u00054\u001b\u0002\u00af\u00b8\u0005",
    "\u001a\u000e\u0002\u00b0\u00b1\u00054\u001b\u0002\u00b1\u00b4\u0007",
    "\u0016\u0002\u0002\u00b2\u00b3\u0007\u0007\u0002\u0002\u00b3\u00b5\u0007",
    "\r\u0002\u0002\u00b4\u00b2\u0003\u0002\u0002\u0002\u00b4\u00b5\u0003",
    "\u0002\u0002\u0002\u00b5\u00b6\u0003\u0002\u0002\u0002\u00b6\u00b7\u0005",
    "\u001c\u000f\u0002\u00b7\u00b9\u0003\u0002\u0002\u0002\u00b8\u00b0\u0003",
    "\u0002\u0002\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9\u00c2\u0003",
    "\u0002\u0002\u0002\u00ba\u00bb\u00054\u001b\u0002\u00bb\u00be\u0007",
    "\u0017\u0002\u0002\u00bc\u00bd\u0007\u0007\u0002\u0002\u00bd\u00bf\u0007",
    "\r\u0002\u0002\u00be\u00bc\u0003\u0002\u0002\u0002\u00be\u00bf\u0003",
    "\u0002\u0002\u0002\u00bf\u00c0\u0003\u0002\u0002\u0002\u00c0\u00c1\u0005",
    "\u001e\u0010\u0002\u00c1\u00c3\u0003\u0002\u0002\u0002\u00c2\u00ba\u0003",
    "\u0002\u0002\u0002\u00c2\u00c3\u0003\u0002\u0002\u0002\u00c3\u0015\u0003",
    "\u0002\u0002\u0002\u00c4\u00c5\u0005\u0018\r\u0002\u00c5\u00c6\u0005",
    "4\u001b\u0002\u00c6\u00c8\u0003\u0002\u0002\u0002\u00c7\u00c4\u0003",
    "\u0002\u0002\u0002\u00c8\u00c9\u0003\u0002\u0002\u0002\u00c9\u00c7\u0003",
    "\u0002\u0002\u0002\u00c9\u00ca\u0003\u0002\u0002\u0002\u00ca\u0017\u0003",
    "\u0002\u0002\u0002\u00cb\u00cc\u0007\u0010\u0002\u0002\u00cc\u00cd\u0005",
    " \u0011\u0002\u00cd\u00d1\u0007\b\u0002\u0002\u00ce\u00cf\u00054\u001b",
    "\u0002\u00cf\u00d0\u0005\"\u0012\u0002\u00d0\u00d2\u0003\u0002\u0002",
    "\u0002\u00d1\u00ce\u0003\u0002\u0002\u0002\u00d1\u00d2\u0003\u0002\u0002",
    "\u0002\u00d2\u00d6\u0003\u0002\u0002\u0002\u00d3\u00d4\u00054\u001b",
    "\u0002\u00d4\u00d5\u0005$\u0013\u0002\u00d5\u00d7\u0003\u0002\u0002",
    "\u0002\u00d6\u00d3\u0003\u0002\u0002\u0002\u00d6\u00d7\u0003\u0002\u0002",
    "\u0002\u00d7\u00db\u0003\u0002\u0002\u0002\u00d8\u00d9\u00054\u001b",
    "\u0002\u00d9\u00da\u0005&\u0014\u0002\u00da\u00dc\u0003\u0002\u0002",
    "\u0002\u00db\u00d8\u0003\u0002\u0002\u0002\u00db\u00dc\u0003\u0002\u0002",
    "\u0002\u00dc\u0019\u0003\u0002\u0002\u0002\u00dd\u00de\u0005.\u0018",
    "\u0002\u00de\u001b\u0003\u0002\u0002\u0002\u00df\u00e0\u0005*\u0016",
    "\u0002\u00e0\u001d\u0003\u0002\u0002\u0002\u00e1\u00e2\u0005*\u0016",
    "\u0002\u00e2\u001f\u0003\u0002\u0002\u0002\u00e3\u00e4\u0005,\u0017",
    "\u0002\u00e4!\u0003\u0002\u0002\u0002\u00e5\u00e6\u0005.\u0018\u0002",
    "\u00e6#\u0003\u0002\u0002\u0002\u00e7\u00e8\u00054\u001b\u0002\u00e8",
    "\u00e9\u0007\t\u0002\u0002\u00e9\u00ea\u0007\u0003\u0002\u0002\u00ea",
    "\u00eb\u0005,\u0017\u0002\u00eb\u00ed\u0003\u0002\u0002\u0002\u00ec",
    "\u00e7\u0003\u0002\u0002\u0002\u00ed\u00ee\u0003\u0002\u0002\u0002\u00ee",
    "\u00ec\u0003\u0002\u0002\u0002\u00ee\u00ef\u0003\u0002\u0002\u0002\u00ef",
    "%\u0003\u0002\u0002\u0002\u00f0\u00f1\u00054\u001b\u0002\u00f1\u00f2",
    "\u0007\t\u0002\u0002\u00f2\u00f3\u0007\u0004\u0002\u0002\u00f3\u00f4",
    "\u0005,\u0017\u0002\u00f4\u00f6\u0003\u0002\u0002\u0002\u00f5\u00f0",
    "\u0003\u0002\u0002\u0002\u00f6\u00f7\u0003\u0002\u0002\u0002\u00f7\u00f5",
    "\u0003\u0002\u0002\u0002\u00f7\u00f8\u0003\u0002\u0002\u0002\u00f8\'",
    "\u0003\u0002\u0002\u0002\u00f9\u00fa\u0005*\u0016\u0002\u00fa\u00fb",
    "\u00054\u001b\u0002\u00fb)\u0003\u0002\u0002\u0002\u00fc\u00fd\u0005",
    "4\u001b\u0002\u00fd\u00ff\u0007\t\u0002\u0002\u00fe\u0100\u0005,\u0017",
    "\u0002\u00ff\u00fe\u0003\u0002\u0002\u0002\u00ff\u0100\u0003\u0002\u0002",
    "\u0002\u0100\u0102\u0003\u0002\u0002\u0002\u0101\u00fc\u0003\u0002\u0002",
    "\u0002\u0102\u0103\u0003\u0002\u0002\u0002\u0103\u0101\u0003\u0002\u0002",
    "\u0002\u0103\u0104\u0003\u0002\u0002\u0002\u0104+\u0003\u0002\u0002",
    "\u0002\u0105\u0108\u00050\u0019\u0002\u0106\u0108\u0007\u0007\u0002",
    "\u0002\u0107\u0105\u0003\u0002\u0002\u0002\u0107\u0106\u0003\u0002\u0002",
    "\u0002\u0108\u0109\u0003\u0002\u0002\u0002\u0109\u010a\u0003\u0002\u0002",
    "\u0002\u0109\u0107\u0003\u0002\u0002\u0002\u010a-\u0003\u0002\u0002",
    "\u0002\u010b\u010e\u00050\u0019\u0002\u010c\u010e\u00052\u001a\u0002",
    "\u010d\u010b\u0003\u0002\u0002\u0002\u010d\u010c\u0003\u0002\u0002\u0002",
    "\u010e\u010f\u0003\u0002\u0002\u0002\u010f\u0110\u0003\u0002\u0002\u0002",
    "\u010f\u010d\u0003\u0002\u0002\u0002\u0110/\u0003\u0002\u0002\u0002",
    "\u0111\u0112\t\u0002\u0002\u0002\u01121\u0003\u0002\u0002\u0002\u0113",
    "\u0114\t\u0003\u0002\u0002\u01143\u0003\u0002\u0002\u0002\u0115\u0117",
    "\u00052\u001a\u0002\u0116\u0115\u0003\u0002\u0002\u0002\u0117\u011a",
    "\u0003\u0002\u0002\u0002\u0118\u0116\u0003\u0002\u0002\u0002\u0118\u0119",
    "\u0003\u0002\u0002\u0002\u01195\u0003\u0002\u0002\u0002\u011a\u0118",
    "\u0003\u0002\u0002\u0002%>BHLRW]aekpv}\u0084\u0089\u008f\u0094\u009a",
    "\u00b4\u00b8\u00be\u00c2\u00c9\u00d1\u00d6\u00db\u00ee\u00f7\u00ff\u0103",
    "\u0107\u0109\u010d\u010f\u0118"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class MADRParser extends antlr4.Parser {

    static grammarFileName = "MADR.g4";
    static literalNames = [ null, "'Good, because '", "'Bad, because '", 
                            null, null, null, null, null, null, null, null, 
                            "'<!-- optional -->'", null, "'# '" ];
    static symbolicNames = [ null, null, null, "WORD", "CHARACTER", "WS", 
                             "NEWLINE", "LIST_MARKER", "STATUS_MARKER", 
                             "DATE_MARKER", "DECIDERS_MARKER", "OPTIONAL_MAKER", 
                             "TECHNICAL_STORY_MARKER", "HEADING_PREFIX", 
                             "SUBSUBHEADING_PREFIX", "SUBSUBSUBHEADING_PREFIX", 
                             "CONTEXT_AND_PROBLEM_STATEMENT", "DECISION_DRIVERS_HEADING", 
                             "CONSIDERED_OPTIONS_HEADING", "DECISION_OUTCOME_HEADING", 
                             "POSITIVE_CONSEQUENCES_HEADING", "NEGATIVE_CONSEQUENCES_HEADING", 
                             "PROS_AND_CONS_OF_THE_OPTIONS_HEADING", "LINKS_HEADING" ];
    static ruleNames = [ "start", "title", "status", "deciders", "date", 
                         "technicalStory", "contextAndProblemStatement", 
                         "decisionDrivers", "consideredOptions", "decisionOutcome", 
                         "prosAndConsOfOptions", "optionSection", "chosenOptionAndExplanation", 
                         "positiveConsequences", "negativeConsequences", 
                         "optionTitle", "optionDescription", "prolist", 
                         "conlist", "links", "list", "textLine", "multilineText", 
                         "any", "wslb", "wslbs" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = MADRParser.ruleNames;
        this.literalNames = MADRParser.literalNames;
        this.symbolicNames = MADRParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	start() {
	    let localctx = new StartContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, MADRParser.RULE_start);
	    var _la = 0; // Token type
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
	        if(_la===MADRParser.STATUS_MARKER) {
	            this.state = 56;
	            this.match(MADRParser.STATUS_MARKER);
	            this.state = 57;
	            this.status();
	            this.state = 60;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	            if(la_===1) {
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
	        if(_la===MADRParser.DECIDERS_MARKER) {
	            this.state = 66;
	            this.match(MADRParser.DECIDERS_MARKER);
	            this.state = 67;
	            this.deciders();
	            this.state = 70;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	            if(la_===1) {
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
	        if(_la===MADRParser.DATE_MARKER) {
	            this.state = 76;
	            this.match(MADRParser.DATE_MARKER);
	            this.state = 77;
	            this.date();
	            this.state = 80;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===MADRParser.WS) {
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
	        if(_la===MADRParser.TECHNICAL_STORY_MARKER) {
	            this.state = 87;
	            this.match(MADRParser.TECHNICAL_STORY_MARKER);
	            this.state = 88;
	            this.technicalStory();
	            this.state = 91;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	            if(la_===1) {
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
	        if(_la===MADRParser.CONTEXT_AND_PROBLEM_STATEMENT) {
	            this.state = 97;
	            this.match(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT);
	            this.state = 98;
	            this.wslbs();
	        }

	        this.state = 105;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===MADRParser.NEWLINE) {
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
	        if(_la===MADRParser.DECISION_DRIVERS_HEADING) {
	            this.state = 107;
	            this.match(MADRParser.DECISION_DRIVERS_HEADING);
	            this.state = 110;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	            if(la_===1) {
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
	        if(_la===MADRParser.CONSIDERED_OPTIONS_HEADING) {
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
	        if(_la===MADRParser.DECISION_OUTCOME_HEADING) {
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
	        if(_la===MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING) {
	            this.state = 132;
	            this.match(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING);
	            this.state = 135;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,14,this._ctx);
	            if(la_===1) {
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
	        if(_la===MADRParser.LINKS_HEADING) {
	            this.state = 143;
	            this.match(MADRParser.LINKS_HEADING);
	            this.state = 146;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	            if(la_===1) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	        if(la_===1) {
	            this.state = 174;
	            this.wslbs();
	            this.state = 175;
	            this.match(MADRParser.POSITIVE_CONSEQUENCES_HEADING);
	            this.state = 178;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	            if(la_===1) {
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
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        if(la_===1) {
	            this.state = 184;
	            this.wslbs();
	            this.state = 185;
	            this.match(MADRParser.NEGATIVE_CONSEQUENCES_HEADING);
	            this.state = 188;
	            this._errHandler.sync(this);
	            var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	            if(la_===1) {
	                this.state = 186;
	                this.match(MADRParser.WS);
	                this.state = 187;
	                this.match(MADRParser.OPTIONAL_MAKER);

	            }
	            this.state = 190;
	            this.negativeConsequences();

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    var _la = 0; // Token type
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
	        } while(_la===MADRParser.SUBSUBHEADING_PREFIX);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        var la_ = this._interp.adaptivePredict(this._input,23,this._ctx);
	        if(la_===1) {
	            this.state = 204;
	            this.wslbs();
	            this.state = 205;
	            this.optionDescription();

	        }
	        this.state = 212;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,24,this._ctx);
	        if(la_===1) {
	            this.state = 209;
	            this.wslbs();
	            this.state = 210;
	            this.prolist();

	        }
	        this.state = 217;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,25,this._ctx);
	        if(la_===1) {
	            this.state = 214;
	            this.wslbs();
	            this.state = 215;
	            this.conlist();

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        	_alt = this._interp.adaptivePredict(this._input,26, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        	_alt = this._interp.adaptivePredict(this._input,27, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        		var la_ = this._interp.adaptivePredict(this._input,28,this._ctx);
	        		if(la_===1) {
	        		    this.state = 252;
	        		    this.textLine();

	        		}
	        		break;
	        	default:
	        		throw new antlr4.error.NoViableAltException(this);
	        	}
	        	this.state = 257; 
	        	this._errHandler.sync(this);
	        	_alt = this._interp.adaptivePredict(this._input,29, this._ctx);
	        } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 261;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 259;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
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
	        	_alt = this._interp.adaptivePredict(this._input,31, this._ctx);
	        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        var _alt = 1+1;
	        do {
	        	switch (_alt) {
	        	case 1+1:
	        		this.state = 267;
	        		this._errHandler.sync(this);
	        		switch(this._input.LA(1)) {
	        		case MADRParser.WORD:
	        		case MADRParser.CHARACTER:
	        		case MADRParser.LIST_MARKER:
	        		case MADRParser.HEADING_PREFIX:
	        		case MADRParser.SUBSUBSUBHEADING_PREFIX:
	        		    this.state = 265;
	        		    this.any();
	        		    break;
	        		case MADRParser.WS:
	        		case MADRParser.NEWLINE:
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
	        	_alt = this._interp.adaptivePredict(this._input,33, this._ctx);
	        } while ( _alt!=1 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER );
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 271;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << MADRParser.WORD) | (1 << MADRParser.CHARACTER) | (1 << MADRParser.LIST_MARKER) | (1 << MADRParser.HEADING_PREFIX) | (1 << MADRParser.SUBSUBSUBHEADING_PREFIX))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 273;
	        _la = this._input.LA(1);
	        if(!(_la===MADRParser.WS || _la===MADRParser.NEWLINE)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
	        var _alt = this._interp.adaptivePredict(this._input,34,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 275;
	                this.wslb(); 
	            }
	            this.state = 280;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,34,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
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
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_start;
    }

	HEADING_PREFIX() {
	    return this.getToken(MADRParser.HEADING_PREFIX, 0);
	};

	title() {
	    return this.getTypedRuleContext(TitleContext,0);
	};

	NEWLINE = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.NEWLINE);
	    } else {
	        return this.getToken(MADRParser.NEWLINE, i);
	    }
	};


	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	EOF() {
	    return this.getToken(MADRParser.EOF, 0);
	};

	STATUS_MARKER() {
	    return this.getToken(MADRParser.STATUS_MARKER, 0);
	};

	status() {
	    return this.getTypedRuleContext(StatusContext,0);
	};

	DECIDERS_MARKER() {
	    return this.getToken(MADRParser.DECIDERS_MARKER, 0);
	};

	deciders() {
	    return this.getTypedRuleContext(DecidersContext,0);
	};

	DATE_MARKER() {
	    return this.getToken(MADRParser.DATE_MARKER, 0);
	};

	date() {
	    return this.getTypedRuleContext(DateContext,0);
	};

	TECHNICAL_STORY_MARKER() {
	    return this.getToken(MADRParser.TECHNICAL_STORY_MARKER, 0);
	};

	technicalStory() {
	    return this.getTypedRuleContext(TechnicalStoryContext,0);
	};

	CONTEXT_AND_PROBLEM_STATEMENT() {
	    return this.getToken(MADRParser.CONTEXT_AND_PROBLEM_STATEMENT, 0);
	};

	contextAndProblemStatement() {
	    return this.getTypedRuleContext(ContextAndProblemStatementContext,0);
	};

	DECISION_DRIVERS_HEADING() {
	    return this.getToken(MADRParser.DECISION_DRIVERS_HEADING, 0);
	};

	decisionDrivers() {
	    return this.getTypedRuleContext(DecisionDriversContext,0);
	};

	CONSIDERED_OPTIONS_HEADING() {
	    return this.getToken(MADRParser.CONSIDERED_OPTIONS_HEADING, 0);
	};

	consideredOptions() {
	    return this.getTypedRuleContext(ConsideredOptionsContext,0);
	};

	DECISION_OUTCOME_HEADING() {
	    return this.getToken(MADRParser.DECISION_OUTCOME_HEADING, 0);
	};

	decisionOutcome() {
	    return this.getTypedRuleContext(DecisionOutcomeContext,0);
	};

	PROS_AND_CONS_OF_THE_OPTIONS_HEADING() {
	    return this.getToken(MADRParser.PROS_AND_CONS_OF_THE_OPTIONS_HEADING, 0);
	};

	prosAndConsOfOptions() {
	    return this.getTypedRuleContext(ProsAndConsOfOptionsContext,0);
	};

	LINKS_HEADING() {
	    return this.getToken(MADRParser.LINKS_HEADING, 0);
	};

	links() {
	    return this.getTypedRuleContext(LinksContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	OPTIONAL_MAKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.OPTIONAL_MAKER);
	    } else {
	        return this.getToken(MADRParser.OPTIONAL_MAKER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterStart(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitStart(this);
		}
	}


}



class TitleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_title;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTitle(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTitle(this);
		}
	}


}



class StatusContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_status;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterStatus(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitStatus(this);
		}
	}


}



class DecidersContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_deciders;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDeciders(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDeciders(this);
		}
	}


}



class DateContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_date;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDate(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDate(this);
		}
	}


}



class TechnicalStoryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_technicalStory;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTechnicalStory(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTechnicalStory(this);
		}
	}


}



class ContextAndProblemStatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_contextAndProblemStatement;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterContextAndProblemStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitContextAndProblemStatement(this);
		}
	}


}



class DecisionDriversContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionDrivers;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDecisionDrivers(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDecisionDrivers(this);
		}
	}


}



class ConsideredOptionsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_consideredOptions;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterConsideredOptions(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConsideredOptions(this);
		}
	}


}



class DecisionOutcomeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_decisionOutcome;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	chosenOptionAndExplanation() {
	    return this.getTypedRuleContext(ChosenOptionAndExplanationContext,0);
	};

	POSITIVE_CONSEQUENCES_HEADING() {
	    return this.getToken(MADRParser.POSITIVE_CONSEQUENCES_HEADING, 0);
	};

	positiveConsequences() {
	    return this.getTypedRuleContext(PositiveConsequencesContext,0);
	};

	NEGATIVE_CONSEQUENCES_HEADING() {
	    return this.getToken(MADRParser.NEGATIVE_CONSEQUENCES_HEADING, 0);
	};

	negativeConsequences() {
	    return this.getTypedRuleContext(NegativeConsequencesContext,0);
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	OPTIONAL_MAKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.OPTIONAL_MAKER);
	    } else {
	        return this.getToken(MADRParser.OPTIONAL_MAKER, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterDecisionOutcome(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitDecisionOutcome(this);
		}
	}


}



class ProsAndConsOfOptionsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prosAndConsOfOptions;
    }

	optionSection = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(OptionSectionContext);
	    } else {
	        return this.getTypedRuleContext(OptionSectionContext,i);
	    }
	};

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterProsAndConsOfOptions(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitProsAndConsOfOptions(this);
		}
	}


}



class OptionSectionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionSection;
    }

	SUBSUBHEADING_PREFIX() {
	    return this.getToken(MADRParser.SUBSUBHEADING_PREFIX, 0);
	};

	optionTitle() {
	    return this.getTypedRuleContext(OptionTitleContext,0);
	};

	NEWLINE() {
	    return this.getToken(MADRParser.NEWLINE, 0);
	};

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	optionDescription() {
	    return this.getTypedRuleContext(OptionDescriptionContext,0);
	};

	prolist() {
	    return this.getTypedRuleContext(ProlistContext,0);
	};

	conlist() {
	    return this.getTypedRuleContext(ConlistContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionSection(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionSection(this);
		}
	}


}



class ChosenOptionAndExplanationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_chosenOptionAndExplanation;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterChosenOptionAndExplanation(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitChosenOptionAndExplanation(this);
		}
	}


}



class PositiveConsequencesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_positiveConsequences;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterPositiveConsequences(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitPositiveConsequences(this);
		}
	}


}



class NegativeConsequencesContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_negativeConsequences;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterNegativeConsequences(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitNegativeConsequences(this);
		}
	}


}



class OptionTitleContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionTitle;
    }

	textLine() {
	    return this.getTypedRuleContext(TextLineContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionTitle(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionTitle(this);
		}
	}


}



class OptionDescriptionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_optionDescription;
    }

	multilineText() {
	    return this.getTypedRuleContext(MultilineTextContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterOptionDescription(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitOptionDescription(this);
		}
	}


}



class ProlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_prolist;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	LIST_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.LIST_MARKER);
	    } else {
	        return this.getToken(MADRParser.LIST_MARKER, i);
	    }
	};


	textLine = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextLineContext);
	    } else {
	        return this.getTypedRuleContext(TextLineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterProlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitProlist(this);
		}
	}


}



class ConlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_conlist;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	LIST_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.LIST_MARKER);
	    } else {
	        return this.getToken(MADRParser.LIST_MARKER, i);
	    }
	};


	textLine = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextLineContext);
	    } else {
	        return this.getTypedRuleContext(TextLineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterConlist(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitConlist(this);
		}
	}


}



class LinksContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_links;
    }

	list() {
	    return this.getTypedRuleContext(ListContext,0);
	};

	wslbs() {
	    return this.getTypedRuleContext(WslbsContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterLinks(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitLinks(this);
		}
	}


}



class ListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_list;
    }

	wslbs = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbsContext);
	    } else {
	        return this.getTypedRuleContext(WslbsContext,i);
	    }
	};

	LIST_MARKER = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.LIST_MARKER);
	    } else {
	        return this.getToken(MADRParser.LIST_MARKER, i);
	    }
	};


	textLine = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TextLineContext);
	    } else {
	        return this.getTypedRuleContext(TextLineContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitList(this);
		}
	}


}



class TextLineContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_textLine;
    }

	any = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AnyContext);
	    } else {
	        return this.getTypedRuleContext(AnyContext,i);
	    }
	};

	WS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(MADRParser.WS);
	    } else {
	        return this.getToken(MADRParser.WS, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterTextLine(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitTextLine(this);
		}
	}


}



class MultilineTextContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_multilineText;
    }

	any = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AnyContext);
	    } else {
	        return this.getTypedRuleContext(AnyContext,i);
	    }
	};

	wslb = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbContext);
	    } else {
	        return this.getTypedRuleContext(WslbContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterMultilineText(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitMultilineText(this);
		}
	}


}



class AnyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_any;
    }

	WORD() {
	    return this.getToken(MADRParser.WORD, 0);
	};

	CHARACTER() {
	    return this.getToken(MADRParser.CHARACTER, 0);
	};

	LIST_MARKER() {
	    return this.getToken(MADRParser.LIST_MARKER, 0);
	};

	HEADING_PREFIX() {
	    return this.getToken(MADRParser.HEADING_PREFIX, 0);
	};

	SUBSUBSUBHEADING_PREFIX() {
	    return this.getToken(MADRParser.SUBSUBSUBHEADING_PREFIX, 0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterAny(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitAny(this);
		}
	}


}



class WslbContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslb;
    }

	WS() {
	    return this.getToken(MADRParser.WS, 0);
	};

	NEWLINE() {
	    return this.getToken(MADRParser.NEWLINE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterWslb(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.exitWslb(this);
		}
	}


}



class WslbsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = MADRParser.RULE_wslbs;
    }

	wslb = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(WslbContext);
	    } else {
	        return this.getTypedRuleContext(WslbContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof MADRListener ) {
	        listener.enterWslbs(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof MADRListener ) {
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
