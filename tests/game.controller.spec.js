'use strict';

describe('Controller: gameCtrl', function() {

  // load controller's module
  beforeEach(module('drink'));

  var gameCtrl,
      scope

  // initialize controller and mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    gameCtrl = $controller('gameCtrl', {
      $scope: scope
    });
  }));

  it('gets two users', function() {
    scope.play();
    expect(scope.game.players.length).toBe(2);
  });

  it('gets an activity', function() {
    scope.play();
    expect(scope.game.activity).toBeDefined();
  });

  it('loads videos', function() {
    scope.play();
    expect(scope.game.activity.videos.length).toBeGreaterThan(0);
  });

  it('gets a drink', function() {
    scope.play();
    expect(scope.game.drink).toBeDefined();
  })

  it('attaches qty to drink', function() {
    scope.play();
    expect(scope.game.drink.qty).toBeGreaterThan(0);
  });

});