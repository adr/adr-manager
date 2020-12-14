# Parser with Antlr4

* The required version of Antlr is 4.9.
* Installation guides of Antlr4: 
  * Windows: https://github.com/antlr/antlr4/blob/master/doc/getting-started.md
  * UNIX: https://github.com/antlr/antlr4/blob/master/doc/getting-started.md#unix 

* Explanation for using Antlr4 with JavaScript: https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md
  * The shell command to build the parser is ```antlr4 -Dlanguage=JavaScript``` MADR.g4. This should create the files MADRLexer.js, MADRListener.js and MADRParser.js.