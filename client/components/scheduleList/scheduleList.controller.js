angular.module('myApp').controller('scheduleListController',
['$scope', '$location', 'AuthService', 'ScheduleService',
function($scope, $location, AuthService, ScheduleService) {

  ScheduleService.getSchedules()
    .then(function(sch) {
    for(s in sch.schedules) {
      actualDays = [];
      for(day in sch.schedules[s].days) {
        for(d in sch.schedules[s].days[day]) {
          if(sch.schedules[s].days[day][d] == true) {
            actualDays.push(d);
          }
        }
      }
      sch.schedules[s].days = actualDays;
    }
    $scope.schedules = sch.schedules;
  }).catch(function(err) {
    console.log('e:',err);
  })

  $scope.editSchedule = function(schedule) {
    console.log('editing the schedule');
  };

  $scope.deleteSchedule = function(schedule) {
    ScheduleService.deleteSchedule({
      sched: schedule
    }).then(function(sch) {
      ScheduleService.getSchedules()
        .then(function(sch) {
          for(s in sch.schedules) {
            actualDays = [];
            for(day in sch.schedules[s].days) {
              for(d in sch.schedules[s].days[day]) {
                if(sch.schedules[s].days[day][d] == true) {
                  actualDays.push(d);
                }
              }
            }
            sch.schedules[s].days = actualDays;
          }
          $scope.schedules = sch.schedules;
        }).catch(function(err) {
          console.log('e:',err);
        });
    })
  };

  $scope.noSchedulesFound = function() {
    if($scope.schedules && $scope.schedules.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}]);
