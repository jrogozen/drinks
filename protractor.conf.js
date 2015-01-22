'use strict';

exports.config = {
  allScriptsTimeout: 110000,

  baseUrl: 'http://localhost:' + (process.env.PORT || '8080'),

  chromeOnly: true,

  specs: [
    'e2e/**/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};