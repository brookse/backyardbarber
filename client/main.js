var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    }).when('/login', {
      templateUrl: '/partials/login.html',
      controller: 'loginController'
    }).when('/dashboard', {
      templateUrl: '/partials/dashboard.html',
      controller: 'dashboardController'
    }).when('/logout', {
      controller: 'logoutController'
    }).when('/register', {
      templateUrl: '/partials/register.html',
      controller: 'registerController'
    }).when('/dashboard/status', {
      templateUrl: '/components/status/status.template.html',
      controller: 'statusController'
    }).when('/dashboard/scheduler', {
      templateUrl: '/components/scheduler/schedule.template.html',
      controller: 'scheduleController'
    }).when('/dashboard/yardmap', {
      templateUrl: '/components/yardmap/yardmap.template.html',
      controller: 'yardmapController'
    }).otherwise({redirectTo: '/'});

  //  $locationProvider.html5mode(true);
});

myApp.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    if(AuthService.isLoggedIn() === false) {
      $location.path('/login');
    }
  })
})
