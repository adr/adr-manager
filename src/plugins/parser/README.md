# Parser with Antlr4

- The required version of Antlr is 4.9.
- Installation guides of Antlr4:

  - Windows: <https://github.com/antlr/antlr4/blob/master/doc/getting-started.md>
  - UNIX: <https://github.com/antlr/antlr4/blob/master/doc/getting-started.md#unix>

- Explanation for using Antlr4 with JavaScript: <https://github.com/antlr/antlr4/blob/master/doc/javascript-target.md>
  - The shell command to build the parser is as follows: `antlr4 -Dlanguage=JavaScript MADR.g4`.
    This should create the files `MADRLexer.js`, `MADRListener.js`, and `MADRParser.js`.

## Windows

1. Install Java
2. Download the `jar` from <https://www.antlr.org/download.html>
3. `java -jar  c:\Users\{username}\Downloads\antlr-4.9.2-complete.jar -Dlanguage=JavaScript MADR.g4`
