angular.module('myApp').controller('addScheduleModalController',
['$scope', '$location', 'ScheduleService',
function($scope, $location, ScheduleService) {
  $scope.schedule = {};
  $scope.days = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false
  };

  $scope.ok = function () {
    console.log("new one:",{
      days: $scope.days,
      time: $scope.hour +":"+ $scope.minute +" "+$scope.ampm
    });
    selectedDays = [];
    for(day in $scope.days) {
      if(day == true) {
        selectedDays.push(day);
      }
    }
    ScheduleService.saveSchedule({
      days: $scope.days,
      time: $scope.hour +":"+ $scope.minute +" "+$scope.ampm
    });
    $scope.addScheduleForm = {};
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
