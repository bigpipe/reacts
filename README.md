# reacts

Reacts is our attempt to integrate the React library in to back-end bigpipe
pattern.

## Installation

```
npm install --save reacts
```

## Usage

```js
'use strict';

var Reacts = require('reacts')
  , BigPipe = require('bigpipe');

var bigpipe = BigPipe.createServer({
  framework: Reacts,
  port: 8080
});
```

## License

MIT
