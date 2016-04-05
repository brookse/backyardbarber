angular.module('myApp').factory('YardService',
  ['$q', '$timeout', '$http', 'AuthService',
  function($q, $timeout, $http, AuthService) {
    var obstacles = null;
    var yard = null;
    return({
      getObstacles: getObstacles,
      getYard: getYard,
      loadObstacles: loadObstacles,
      loadYard: loadYard,
      saveObstacle: saveObstacle,
      saveYard: saveYard,
      deleteObstacle: deleteObstacle
    });

    function loadObstacles() {
      var deferred = $q.defer();
      $http.get('/obstacles/'+AuthService.getUserStatus().username)
        .success(function(data, status) {
          obstacles = data.obstacles;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function getObstacles() {
      var deferred = $q.defer();
      this.loadObstacles().then(deferred.resolve).catch(deferred.reject);
      return deferred.promise;
    };

    function saveObstacle(obstacleData) {
      var deferred = $q.defer();
      var mowerSN = AuthService.getUserStatus().username;
      obstacleData.mowerSN = mowerSN;
      $http.post('/obstacles', obstacleData)
        .success(function(data, status) {
          if(status == 200) {
            obstacles.push(data.obstacle);
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).error(function(data) {
          deferred.reject();
        });

        return deferred.promise;
    };

    function deleteObstacle(obstacleData) {
      var deferred = $q.defer();
      console.log('obstacleeeee:',obstacleData);
      $http.delete('/obstacles/'+obstacleData.obst._id)
        .success(function(data, status) {
          if(status == 200) {
            obstacles = data.obstacles;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }).error(function(data) {
          deferred.reject();
        });

        return deferred.promise;
    };

    function loadYard() {
      var deferred = $q.defer();
      $http.get('/yard/'+AuthService.getUserStatus().username)
        .success(function(data, status) {
          yard = data.yard;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function getYard() {
      var deferred = $q.defer();
      this.loadYard().then(deferred.resolve).catch(deferred.reject);
      return deferred.promise;
    };

    function saveYard(yardData) {
      var deferred = $q.defer();
      var mowerSN = AuthService.getUserStatus().username;
      yardData.mowerSN = mowerSN;
      $http.post('/yard', {yardData})
        .success(function(data, status) {
          if(status == 200 && data.status) {
            yard = data.yard;
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
