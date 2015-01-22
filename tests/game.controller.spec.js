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

  it('should attach thngs to the scope', function() {
    expect(scope.drinks.length).toBe(3);
  });

});