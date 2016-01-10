angular.module('myApp').controller('scheduleController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  $scope.message = "schedule message";
}]);
