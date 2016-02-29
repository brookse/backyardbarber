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
          schedules = data.schedules;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function getSchedules() {
      var deferred = $q.defer();
      this.loadSchedules().then(deferred.resolve).catch(deferred.reject);
      return deferred.promise;
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

    function deleteSchedule(sched) {
      var deferred = $q.defer();
      $http.delete('/schedules/'+sched.sched._id)
        .success(function(data, status) {
          if(status == 200) {
            schedules = data.schedules;
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
