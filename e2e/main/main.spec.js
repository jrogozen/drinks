'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po')
  });

  it('should include some info', function() {
    expect(page.h1El.getText()).toBe('main page!');
  });

});