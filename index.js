'use strict';

var Fittings = require('fittings')
  , path = require('path')
  , fs = require('fs');

function read(file) {
  return fs.readFileSync(path.join(__dirname, 'fittings', file), 'utf-8');
}

//
// Expose the React fittings.
//
Fittings.extend({
  fragment: read('arrive.html'),
  template: read('template.js'),
  plugin: read('plugin.js'),
  library: [
    { path: require.resolve('react'), expose: 'react' },
    { path: require.resolve('./reacts'), expose: 'reacts' }
  ]
}).on(module);
