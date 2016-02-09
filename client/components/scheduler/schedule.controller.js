angular.module('myApp').controller('scheduleController',
['$scope', '$location', 'AuthService', 'ScheduleService',
function($scope, $location, AuthService, ScheduleService) {

  $scope.schedules = ScheduleService.getSchedules();

  $scope.editSchedule = function() {
    console.log('editing the schedule');
  };

  $scope.deleteSchedule = function() {
    console.log('deleting the schedule');
  };

  $scope.openCreateNewSchedule = function(event) {
    console.log('opening up the new schedule creator')
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      controller: 'addScheduleModalController',
      templateUrl: '/components/addScheduledMowing/addScheduledMowing.template.html',
      // resolve: {
      //   propertyId: function() {
      //     return $scope.properties.collection[$scope.propertyIndex].id
      //   }
      // }
    });

    modalInstance.result.then(function (schedule) {
      // $scope.properties.collection[$scope.propertyIndex].sensors.add(sensor);
      console.log('new schedule: ',schedule)
    });
  }
}]);
