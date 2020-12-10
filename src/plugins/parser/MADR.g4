// Define a grammar called Hello
grammar MADR;

start : 
	HEADING_PREFIX title NEWLINE wslbs 
	( STATUS_MARKER status wslbs )?
	( DECIDERS_MARKER deciders wslbs )?
	( DATE_MARKER date NEWLINE wslbs )?
	( TECHNICAL_STORY_MARKER technicalStory wslbs )?
	( CONTEXT_AND_PROBLEM_STATEMENT wslbs )?
	( NEWLINE contextAndProblemStatement wslbs )? // Text without a heading is interpreted as context and problem statement
	( DECISION_DRIVERS_HEADING wslbs decisionDrivers wslbs )?
	( CONSIDERED_OPTIONS_HEADING wslbs consideredOptions wslbs )?
	( DECISION_OUTCOME_HEADING wslbs decisionOutcome wslbs )?
	( PROS_AND_CONS_OF_THE_OPTIONS_HEADING wslbs prosAndConsOfOptions wslbs )?
	( LINKS_HEADING wslbs links wslbs )?
	EOF
	;


title : textLine ;

status: textLine ;

deciders : textLine ;

date : textLine ;

technicalStory : textLine ;

contextAndProblemStatement : multilineText ;

decisionDrivers : list ;

consideredOptions : list ;

decisionOutcome : wslbs chosenOptionAndExplanation 
	(wslbs POSITIVE_CONSEQUENCES_HEADING positiveConsequences)?
	(wslbs NEGATIVE_CONSEQUENCES_HEADING negativeConsequences)? ;

prosAndConsOfOptions : (optionSection wslbs)+ ;

optionSection : 
	SUBSUBHEADING_PREFIX optionTitle NEWLINE 
	(wslbs optionDescription)?
	(wslbs prolist)?
	(wslbs conlist)?
	;

chosenOptionAndExplanation : multilineText ;
positiveConsequences : list ;
negativeConsequences : list ;

optionTitle : textLine ;
optionDescription : multilineText ;
prolist : (wslbs LIST_MARKER 'Good, because ' textLine) + ;
conlist : (wslbs LIST_MARKER 'Bad, because ' textLine) + ;

links : list wslbs ;

list : (wslbs LIST_MARKER textLine?) + ;

textLine : (any | WS) +? ;

multilineText : (any | wslb) +? ; // Any (possibly multi-line) text

any : ( WORD | CHARACTER | LIST_MARKER | HEADING_PREFIX | SUBSUBSUBHEADING_PREFIX) ;

wslb : ( WS | NEWLINE ) ;
wslbs : wslb *;

/// Tokenization / Lexer rules

WORD : CHARACTER+;
CHARACTER : (~[\n\t\r\f ] ) ;

WS : [\f\t ] ; // White Space
NEWLINE : [\r\n] ; // Line Breaks

LIST_MARKER : NEWLINE '* '; 
STATUS_MARKER : LIST_MARKER 'Status: ';
DATE_MARKER : LIST_MARKER 'Date: ';
DECIDERS_MARKER : LIST_MARKER 'Deciders: ';
TECHNICAL_STORY_MARKER : NEWLINE 'Technical Story: ';

HEADING_PREFIX : '# ' ; // Start of a Heading
SUBSUBHEADING_PREFIX : NEWLINE '### ' ; // Start of a Sub sub heading (e. g. an option section)
SUBSUBSUBHEADING_PREFIX : '###' '#'+  ' ' ; // Start of a sub sub sub heading (no special meaning, should be accepted in multiline text)

// Headings
CONTEXT_AND_PROBLEM_STATEMENT : NEWLINE ( '## Context and Problem Statement' | '## Context and problem statement' );
DECISION_DRIVERS_HEADING : NEWLINE ( '## Decision Drivers' | '## Decision drivers' ) ;
CONSIDERED_OPTIONS_HEADING : NEWLINE ( '## Considered Options' | '## Considered options' ) ;
DECISION_OUTCOME_HEADING : NEWLINE ( '## Decision Outcome' | '## Decision outcome' ) ;
POSITIVE_CONSEQUENCES_HEADING : NEWLINE ( '### Positive Consequences' | '### Positive consequences') ;
NEGATIVE_CONSEQUENCES_HEADING : NEWLINE ( '### Negative Consequences' | '### Negative consequences') ;
PROS_AND_CONS_OF_THE_OPTIONS_HEADING : NEWLINE ( '## Pros and Cons of the Options' | '## Pros and cons of the options') ;
LINKS_HEADING : NEWLINE '## Links' ;