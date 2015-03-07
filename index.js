'use strict';

var Fittings = require('fittings');

//
//
//
Fittings.extend({
  library: [
    { path: require.resolve('react'), expose: 'react' },
    { path: require.resolve('./reacts'), expose: 'reacts' }
  ]
}).on(module);
