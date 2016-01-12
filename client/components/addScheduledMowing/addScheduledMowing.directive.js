angular.module('myApp').directive('addScheduleModalController',
['$scope', '$modalInstance',
function($scope, $modalInstance) {
  $scope.schedule = {};
  // $scope.addSensorForm.$error.server = false;

  $scope.ok = function () {
    // var schedule = new Sensor($scope.schedule);
    //
    // schedule.create().then(function(results) {
    //   $modalInstance.close(results);
    // }).catch(function(results) {
    //   $scope.addScheduleForm.$error.server = true;
    //   $scope.error = ErrorService.parse(results);
    // });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
