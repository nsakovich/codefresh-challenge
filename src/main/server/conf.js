'use strict';

var config = require('./environment/dev');

if (process.env.NODE_ENV === 'production') {
  config = require('./environment/prod');
}

module.exports = config;
