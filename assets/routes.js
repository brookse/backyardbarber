app.config(['$routeProvider', function($routeProvider) {
  var routes = {
    loginRoute: {
      templateUrl: 'templates/login.template.html',
      controller: 'LoginCtrl',
    },
    logoutRoute: {
      templateUrl: 'template/login.template.html',
      controller: 'LogoutCtrl',
    }
    homepageRoute: {
      templateUrl: 'template/home.template.html',
      controller: 'homeCtrl',
    }
  };

  $routeProvider
    .when('/', routes.loginRoute)
    .when('/home', routes.homepageRoute),
    .when('/login', routes.loginRoute),
    .when('/logout', routes.logoutRoute),
    .otherwise({
      redirectTo: '/login'
    });

}]);
