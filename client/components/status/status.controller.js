angular.module('myApp').controller('statusController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  $scope.serialnumber = "123456789";
  $scope.status = "charging";
  $scope.statusDetail = "The mower is in the charging dock"
  $scope.longitude = "43.0441100";
  $scope.latitude = "-87.9090520";
  $scope.elevation = "183.57 m";
  $scope.batterylevel = "25%";

  // off, charging, mowing, idle, error
  // The mower is depleted of battery and not in the charging dock. Move it to the dock to charge!
  // The mower is in the charging dock.
  // The mower is currently mowing the lawn.
  // The mower is idling with the engine off, but it is not in the charging dock. Move it to the dock to charge!
  // The mower is currently stuck or is in some sort of trouble. Move it to the charging dock to reset it!
}]);
