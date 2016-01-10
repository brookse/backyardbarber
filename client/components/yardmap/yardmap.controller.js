angular.module('myApp').controller('yardmapController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  $scope.message = "yard map controller";
}]);
