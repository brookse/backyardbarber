angular.module('myApp').controller('scheduleController',
['$scope', '$location', 'AuthService',
function($scope, $location, $modal, AuthService) {
  $scope.message = "schedule message";

  $scope.scheduledMowings = [
    {
      days: ["Monday", "Wednesday"],
      time: "1pm"
    },
    {
      days: ["Saturday"],
      time: "10am"
    }
  ];

  $scope.editSchedule = function() {
    console.log('editing the schedule');
  };

  $scope.deleteSchedule = function() {
    console.log('deleting the schedule');
  };

  $scope.openCreateNewSchedule = function(event) {
    console.log('opening up the new schedule creator')
    console.log('event:',event)
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
