angular.module('myApp').controller('statusController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  $scope.message = "status message";
}]);
