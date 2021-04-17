import sayHello from './hello.js';

import('./hello.js').then(sayHello => {
  console.log(sayHello('WTM'))
})

// ES6
import sum from './es6S'
console.log('sum(1, 2) = ', sum(1, 2))

// CommonJs
var minus = require('./commonS')
console.log('minus(1, 2) = ', minus(1, 2))

// AMD
require(['./amdS'], function(multi) {
  console.log('multi(1, 2) = ', multi(1, 2))
})