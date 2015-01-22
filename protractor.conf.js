'use strict';

exports.config = {
  allScriptsTimeout: 110000,

  baseUrl: 'http://localhost:' + (process.env.PORT || '8000'),

  specs: [
    'e2e/**/*.spec.js'
  ],

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};