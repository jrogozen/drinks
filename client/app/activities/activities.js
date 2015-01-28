app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('activities', {
      url: '/activities',
      abstract: true,
      templateUrl: 'app/activities/activities.html',
      controller: 'activitiesCtrl'
    })
    .state('activities.list', {
      url: '',
      templateUrl: 'app/activities/activities.list.html'
    })
    .state('activities.new', {
      url: '/new',
      templateUrl: 'app/activities/activities.new.html',
      controller: 'activityCtrl'
    })
    .state('activities.edit', {
      url: '/:id',
      templateUrl: 'app/activities/activities.new.html',
      controller: 'activityCtrl'
    })
    ;
}]);