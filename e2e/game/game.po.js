'use strict';

var MainPage = function() {
  this.h1El = element(by.binding('game.activity.name'));
  this.blockquote = element(by.binding('game.activity.description'));
  this.rule = element(by.css('.rule'));
  this.button = element(by.buttonText('Play'));
}

module.exports = new MainPage();

