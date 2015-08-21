'use strict';

var EventEmitter = require('eventemitter3')
  , AsyncAsset = require('async-asset')
  , React = require('react');


//
// Async Asset loader.
//
var assets = new AsyncAsset(document.body, {
  prefix: '_'
});

/**
 * Representation of a single component.
 *
 * @constructor
 * @param {BigPipe} bigpipe The BigPipe instance that was created.
 * @api public
 */
function Component(bigpipe) {
  if (!(this instanceof Component)) return new Component(bigpipe);

  this.bigpipe = bigpipe;
}

//
// Inherit from EventEmitter.
//
Component.prototype = new EventEmitter();
Component.prototype.constructor = Component;

/**
 * Configure the Component.
 *
 * @param {String} name The given name of the Component.
 * @param {Object} data The data of the Component.
 * @param {Object} state The state of the Component.
 * @param {Array} roots HTML root elements search for targets.
 * @api private
 */
Component.prototype.configure = function configure(name, data, state, roots) {
  var component = this;

  //
  // Component identification.
  //
  component.timeout = data.timeout || 25 * 1000;  // Resource loading timeout.
  component.css = data.css;     // CSS for the Page.
  component.js = data.js;       // Dependencies for the page.

  this.load();
};

Component.prototype.load = function load(next) {
  var component = this;

  component.js.forEach(function each(url) {
    assets.add(url, function () {
      console.log(arguments);
      component.render();
    });
  });
};

/**
 * Render a given React component in our supplied container.
 *
 * @param {React} component The Component that needs to be rendered.
 * @param {Object} spread What ever needs to be spread upon the component.
 * @api public
 */
Component.prototype.render = function render(component, spread) {
  try {
    return React.render(
      React.createElement(component, React.__spread(spread || {})),
      this.container
    );
  } catch (e) {
    this.emit('error', e);
    return this.render(this.react.error);
  }
};

module.exports = Component;