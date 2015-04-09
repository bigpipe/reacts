'use strict';

var React = require('react')
  , stub;

/**
 * Extract the global variables and components that a given compiled .jsx
 * template requires.
 *
 * @param {String|Function} jsx The template that needs to be extracted.
 * @returns {Object}
 * @api public
 */
function parse(jsx) {
  if ('function' === typeof jsx) jsx = jsx.toString();

  var results = {};

  //
  // Either my brain froze, or this was the only way to easily parse multiple
  // lines with the same regexp and store the result.
  //
  jsx.replace(parse.regexp, function parsed(match, component) {
    results[component] = {};
  });

  return results;
}

/**
 * The regular expression that parses out the Component and global information.
 *
 * - Components start with UpperCase letter.
 * - Are wrapped in React.createElement.
 *
 * @type {RegExp}
 * @private
 */
parse.regexp = /React\.createElement\(([A-Z][^,]+),/gm;

/**
 * Merge in data for a given template.
 *
 * @param {String|Function} jsx The template that needs to be extracted.
 * @param {Object} data Default dataset that we be introduced as globals.
 * @api public
 */
function merge(jsx, data) {
  data = data || {};

  var required = parse(jsx);

  Object.keys(required).forEach(function check(key) {
    if (key in data) return;

    data[key] = stub;
  });

  return data;
}

/**
 * Small stub Component that will be used to force a render of a JSX template
 * when components are still missing or being loaded.
 *
 * @type {React.Component}
 * @private
 */
stub = React.createClass({
  render: function () {
    return React.createElement('i');
  }
});

//
// Expose the various of components.
//
exports.stub = stub;
exports.merge = merge;
exports.parse = parse;

//
// Testing purposes only.
//
var read = require('fs').readFileSync
  , template = read(__dirname +'/bootstrap.js', 'utf-8');

var render = require('react-jsx').server(template)
  , data = merge(template);

console.log('attempting to render', template);
console.log('using data', data);

console.log(render(data, { html: true }));
