angular.module('myApp').controller('statusController',
['$scope', '$location', 'AuthService',
function($scope, $location, AuthService) {
  var statuses = ["Charging", "Error", "Idle", "Mowing", "Dead", "On Fire"];
  var statusDetails = [
    "The mower is in the charging dock.",
    "The mower is currently stuck or is in some sort of trouble. Move it to the charging dock to reset it!",
    "The mower is idling with the engine off, but it is not in the charging dock. Move it to the dock to charge!",
    "The mower is currently mowing the lawn.",
    "The mower is depleted of battery and not in the charging dock. Move it to the dock to charge!",
    "The mower is currently on fire! You may want to put it out."
  ];
  var currentStatus = 0;

  $scope.serialnumber = AuthService.getUserStatus().username;
  $scope.nickname = AuthService.getUserStatus().nickname;
  $scope.status = statuses[currentStatus];
  $scope.statusDetail = statusDetails[currentStatus];
  $scope.longitude = "43.0441100";
  $scope.latitude = "-87.9090520";
  $scope.elevation = "183.57 m";
  $scope.batterylevel = "25%";

  $scope.nextStatus = function() {
    currentStatus = (currentStatus + 1) % statuses.length;
    $scope.status = statuses[currentStatus];
    $scope.statusDetail = statusDetails[currentStatus];
  };

  $scope.previousStatus = function() {
    if (currentStatus === 0) {
      currentStatus = statuses.length;
    } else {
      currentStatus = (currentStatus - 1);
    }
    $scope.status = statuses[currentStatus];
    $scope.statusDetail = statusDetails[currentStatus];
  };

}]);
