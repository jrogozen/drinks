app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('drinks', {
      url: '/drinks',
      abstract: true,
      templateUrl: 'app/drinks/drinks.html',
      controller: 'drinksCtrl'
    })
    .state('drinks.list', {
      url: '',
      templateUrl: 'app/drinks/drinks.list.html'
    })
    .state('drinks.new', {
      url: '/new',
      templateUrl: 'app/drinks/drinks.new.html',
      controller: 'drinkCtrl'
    })
    .state('drinks.edit', {
      url: '/:id',
      templateUrl: 'app/drinks/drinks.new.html',
      controller: 'drinkCtrl'
    })
    ;
}]);