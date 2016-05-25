angular.module('myApp').factory('CommService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {

    return({
      stopMower: stopMower,
      startMower: startMower,
      updateSchedules: updateSchedules,
      updateYard: updateYard
    });

    function stopMower() {
      var deferred = $q.defer();
      $http.get('/communication/'+AuthService.getUserStatus().username+'/stop')
        .success(function(data, status) {
          forecast = data;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function startMower() {
      var deferred = $q.defer();
      $http.get('/communication/'+AuthService.getUserStatus().username+'/start')
        .success(function(data, status) {
          forecast = data;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function updateSchedules() {
      var deferred = $q.defer();
      $http.get('/communication/'+AuthService.getUserStatus().username+'/updateSchedules')
        .success(function(data, status) {
          forecast = data;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function updateYard() {
      var deferred = $q.defer();
      $http.get('/communication/'+AuthService.getUserStatus().username+'/updateYard')
        .success(function(data, status) {
          forecast = data;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

}]);
