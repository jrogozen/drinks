'use strict';

describe('Game View', function() {
  var page;

  beforeEach(function() {
    browser.get('/game');
    page = require('./game.po')
  });

  it('should include activiy name', function() {
    page.button.click();
    expect(page.h1El.getText()).not.toBeNull();
  });

  it('should include activity description', function() {
    page.button.click();
    expect(page.blockquote.getText()).not.toBeNull();
  });

  it('should include rule', function() {
    page.button.click();
    expect(page.rule.getText()).toBeDefined();
  });

});