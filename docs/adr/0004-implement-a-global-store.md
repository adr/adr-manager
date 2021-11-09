# Implement a global store

* Status: accepted

Technical Story: Implement a simple global store

## Context and Problem Statement

The ADR-Manager has a state that needs to be stored.
Data that make sense storing globally:

* Edited ADRs until they're committed (maybe even all ADRs from all added repositories)
* Added Repositories
* The current mode (basic, advanced, professional)

How should the state be stored?

## Decision Drivers

* ADR-Manager should be lightweight and easy to implement.
* ADR-Manager should be easy to maintain.

## Considered Options

* Don't use any global store
* Only use local storage in combination with Events/Props
* Use the Vue-State-Manager Vuex
* Implement a state manager from scratch.

## Decision Outcome

Chosen option: "Implement a state manager from scratch.", because comes out best. The data can additionally be stored in Local Storage but this should be managed by the global store as well.

### Positive Consequences

* New functionality will be easier to add.

## Pros and Cons of the Options

### Don't use any global store

Just "cascade" updates between Vue-Components via Events and Props. E.g. each editor tab has a prop (v-model) for the displayed ADR. Whenever the ADR is changed the Sup-Component (currently TheEditor.vue) updates the ADR in each tab. When a new ADR is created via a toolbar menu, the event needs to cascade down to each related Editor-Component.

* Good, because it's easy to implement.
* Bad, because it's hard to debug.
* Bad, because GUI and functionality is more directly connected. Changes to the GUI often require bigger updates to functionality and vice versa.

### Only use local storage in combination with Events/Props

Use local storage (i.e. persistent storage) to store the state and use events (e. g. a global event bus) to communicate changes to the state.

* Good, because it's easy to implement.
* Good, because most data should be stored in persistent storage anyway.
* Bad, because cannot take advantage of Vue's reactivity.

### Use the Vue-State-Manager Vuex

Docs can be found at https://vuex.vuejs.org/.

* Good, because best long-term maintainability.
* Good, because prepares for extensions like 'Undo-Redo'.
* Good, because the development team can gather experience with Vuex.
* Bad, because of more concepts and boilerplate.
* Bad, because does not fit in our project. We assume that ADR-Manager is a small-to-medium project and not a medium-to-large project

### Implement a state manager from scratch.

Implement a state manager from scratch as described at https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch.

* Good, because GUI and functionality are split better. Debugging is easier.
* Good, because it's a compromise between using Vuex and using no global state.
