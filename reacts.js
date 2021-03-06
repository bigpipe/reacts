'use strict';

var EventEmitter = require('eventemitter3')
  , Component = require('./component')
  , React = require('react');

/**
 *
 * @constructor
 * @api public
 */
function Reacts() {
  //
  // Re-Introduce the methods that we added in our Mixin to the prototype of
  // this instance.
  //
  Object.keys(Reacts.Mixin).reduce(function merge(reacts, name) {
    reacts[name] = Reacts.Mixin[name];
    return reacts;
  }, this);
}

Reacts.prototype = new EventEmitter();
Reacts.prototype.constructor = Reacts;

Reacts.prototype.arrive = function arrive(name, data, state) {
  var reacts = this
    , component = new Component(reacts);

  component.configure(name, data || {}, state);
  reacts.emit('create', component);
};

/**
 * Extract all the names of the various of state that is required to render
 * a given template.
 *
 * @param {Function} view A `react-jsx` transformed view.
 * @returns {Array} Array with names of components that need to live the scope.
 * @api private
 */
Reacts.prototype.extract = function extract() {
  var currently, previously;

  while (true/* we haven't seen a given error message */) {
    try {

    } catch(e) {
      var wat = e.message.split(' ').shift()
        , internals;

      if (wat.charAt(0).toUpperCase() === wat.charAt(0)) {
        // Missing an actual component.
      } else if (/^this\.([^\.]+)\.?/.test(wat)) {
        // Missing `this.prop?` what ever in the view.
      } else if ('undefined' === wat) {
        // <wat> is not a function.
      } else {
        // <wat> is not defined.
      }

      continue;
    }

    //
    // No errors detected while attempting to render the view so we need to
    // break to prevent infinite loops.
    //
    break;
  }
};

/**
 * Register an helper mixing for easy access to all our stored data.
 *
 * @type {Object}
 * @public
 */
Reacts.Mixin = {};

//
// Expose our Reacts framework.
//
var reacts = module.exports = Reacts;
