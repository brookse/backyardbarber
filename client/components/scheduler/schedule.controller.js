angular.module('myApp').controller('scheduleController',
['$scope', '$location', 'AuthService', 'ScheduleService',
function($scope, $location, AuthService, ScheduleService) {

  $scope.blah = "components/scheduleList/scheduleList.template.html";
  console.log('first subpage:',$scope.blah);

  $scope.toggleSubpage = function(toggle) {
    console.log('before subpage:',$scope.blah);
    if(toggle.toElement.innerText == "Add a Scheduled Mowing") {
      console.log("heeey");
      $scope.blah = "components/addScheduledMowing/addScheduledMowing.template.html";
      toggle.toElement.innerText = "View All Schedules";
    } else {
      console.log("hoooo");
      $scope.blah = "components/scheduleList/scheduleList.template.html";
      toggle.toElement.innerText = "Add a Scheduled Mowing";
    }
    console.log('after subpage:',$scope.blah);
  }
}]);
