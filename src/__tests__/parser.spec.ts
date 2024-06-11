import { it, expect } from 'vitest'
import {
  md2adr,
  adr2md
} from '../infrastructure/service/parser'

const randomStrings = [
  // Really just some random nonsense
  '',
  '# ABC',
  `# This is a title

Hey my name is Peter Parker.

# Pros and Cons of Options
`,
  `## This one has no title.
`,
  `# Title
1. Ein Punkt in einer geordneten Liste
2. Ein weiterer Punkt; bei der Eingabe muss nicht auf irgendeine Reihenfolge geachtet werden, sondern nur darauf, dass es beliebige Ziffern sind
1. Noch ein Punkt, der zeigt, dass auch die mehrfache Angabe derselben Ziffer möglich ist



`,
  // An actual ADR
  `# Heading

* Status: proposed
* Deciders: Peter Parker
* Date: 2021-01-05

Technical Story: Long story

## Context and Problem Statement

context

## Decision Drivers

* driver

## Considered Options

* Test Option

## Decision Outcome

Chosen option: "undefined", because comes out best (see below).

### Positive Consequences

* abc

### Negative Consequences

* :)

## Pros and Cons of the Options

### Test Option

Test argument

* Good, because yay
* Bad, because nay

## Links

* ~~
`
]
for (let i = 0; i < randomStrings.length; i++) {
  it('Test parser convergence of random strings.', (): void => {
    const result1 = adr2md(md2adr(randomStrings[i]))
    const result2 = adr2md(md2adr(result1))
    expect(result2).toBe(result1)
  })
}
