angular.module('myApp').factory('ScheduleService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {
    var schedules = null;

    return({
      loadSchedules: loadSchedules,
      getSchedules: getSchedules,
      saveSchedule: saveSchedule,
      deleteSchedule: deleteSchedule
    });

    function loadSchedules() {
      var deferred = $q.defer();
      $http.get('/schedules')
        .success(function(data, status) {
          if(status == 200 && data.status) {
        //    console.log('load obstacles: ',data)
            schedules = data.schedules;
            deferred.resolve();
          } else {
            schedules = false;
            deferred.reject();
          }
        }).error(function(data) {
          schedules = false;
          deferred.reject();
        });

        return deferred.promise;
    };

    function getSchedules() {
      this.loadSchedules();
      console.log('sch:',schedules);
      return schedules;
    };

    function saveSchedule(schedule) {
      var deferred = $q.defer();
      $http.post('/schedules', schedule)
        .success(function(data, status) {
          if(status == 200) {
            schedules.push(data.schedule);
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).error(function(data) {
          deferred.reject();
        });
      return deferred.promise;
    };

    function deleteSchedule(schedule) {
      var deferred = $q.defer();
      $http.delete('/schedules', schedule)
        .success(function(data, status) {
          if(status == 200) {
            schedules.pop(schedule);
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).error(function(data) {
          deferred.reject();
        });

        return deferred.promise;
    };
}]);
