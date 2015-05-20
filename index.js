'use strict';

var Fittings = require('fittings')
  , path = require('path')
  , fs = require('fs');

/**
 * Read files out of our instructions directory.
 *
 * @param {String} file Filename that we should read.
 * @returns {String}
 * @api private
 */
function read(file) {
  return fs.readFileSync(path.join(__dirname, 'fittings', file), 'utf-8');
}

//
// Expose the React fittings.
//
Fittings.extend({
  //
  // Required name to identify the framework being pushed into Fittings.
  //
  name: 'reacts',
  fragment: read('arrive.html'),
  bootstrap: read('bootstrap.html'),
  template: read('template.js'),
  plugin: read('plugin.js'),
  library: [
    { path: require.resolve('react'), expose: 'react' },
    { path: require.resolve('./reacts'), expose: 'reacts' }
  ]
}).on(module);
