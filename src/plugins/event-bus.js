/**
 * The event bus can be used by any object to emit events globally and listen to these events.
 * 
 * List of events: (Notation: event-name { parameters : Type } - description)
 * 
 * 
 * change-mode { mode : String } - Causes a change of the mode (emitted by ModeMenu)
 */

import Vue from 'vue';
export const EventBus = new Vue();