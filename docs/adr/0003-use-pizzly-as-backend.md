# Use Pizzly as Backend

* Status: accepted

## Context and Problem Statement

Should the ADR Manager have a backend? If so, how should it look?

## Considered Options

* Use a Python back end
* Don't use a back end
* Use Pizzly as Backend

## Decision Outcome

Chosen option: "Use Pizzly as Backend", because comes out best (see below).

## Pros and Cons of the Options

### Use a Python back end

* Good, because GitHub interaction can be achieved.
* Bad, because hard to maintain.

### Don't use a back end

* Bad, because we can't authorize to GitHub without back end.

### Use Pizzly as Backend

[Pizzly](https://github.com/Bearer/Pizzly/) can handle the OAuth dance for us. It can be hosted on Heroku as the back end.

* Good, because less work than writing the back end from scratch.
* Good, because we don't have to handle the authorization process.
