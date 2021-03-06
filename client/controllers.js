angular.module('myApp').controller('loginController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {

  $scope.login = function() {
    $scope.error = false;
    $scope.disabled = true;

    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
    .then(function() {
      $location.path('/dashboard');
      $scope.disabled = false;
      $scope.loginForm = {};
    }).catch(function() {
      $scope.error = true;
      $scope.errorMessage = "Invalid username and/or password";
      $scope.disabled = false;
      $scope.loginForm = {};
    });
  };

  $scope.register = function() {
    $location.path('/register');
    $scope.loginForm = {};
  };
}]);

angular.module('myApp').controller('logoutController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {

  $scope.logout = function() {
    AuthService.logout()
      .then(function() {
        $location.path('/login');
      });
  };
}]);

angular.module('myApp').controller('registerController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {

  $scope.register = function() {
    $scope.error = false;
    $scope.disabled = true;

    AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.nickname, $scope.registerForm.zipcode)
    .then(function() {
      $location.path('/login');
      $scope.disabled = false;
      $scope.registerForm = {};
    }).catch(function() {
      $scope.error = true;
      $scope.errorMessage = "Could not register!";
      $scope.disabled = false;
      $scope.registerForm = {};
    });
  };
}]);

angular.module('myApp').controller('dashboardController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  if(!AuthService.isLoggedIn()){
    $location.path('/login');
  }

  var user = AuthService.getUserStatus();
  $scope.username = user.username;
  $scope.nickname = user.nickname;
  $scope.subpage='components/status/status.template.html';

}]);
