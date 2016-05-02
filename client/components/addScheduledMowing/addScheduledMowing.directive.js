angular.module('myApp').controller('addScheduleModalController',
['$scope', '$location', '$timeout', 'ScheduleService',
function($scope, $location, $timeout, ScheduleService) {
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
    selectedDays = [];
    for(day in $scope.days) {
      if(day == true) {
        selectedDays.push(day);
      }
    }
    var finalHour = $scope.hour;
    if ($scope.ampm == "pm") {
      finalHour = parseInt(finalHour) + 12;
    }

    ScheduleService.saveSchedule({
      days: $scope.days,
      time: {
        hour: finalHour,
        minute: $scope.minute,
        ampm: $scope.ampm
      }
    });
    $scope.addScheduleForm = {};
    // briefly show confirmation dialogue
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
