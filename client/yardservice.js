angular.module('myApp').factory('YardService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {
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
      $http.get('/obstacles')
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
      console.log('obsd:',obstacleData)
      $http.post('/obstacles', obstacleData)
        .success(function(data, status) {
          if(status == 200) {
            console.log('save obstacle: ',data)
            console.log('obs before:',obstacles);
            obstacles.push(data.obstacle);
            console.log('obs after:',obstacles);
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
      console.log('obsd:',obstacleData)
      $http.delete('/obstacles', obstacleData)
        .success(function(data, status) {
          if(status == 200) {
            obstacles.pop(obstacleData);
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

      $http.get('/yard')
        .success(function(data, status) {
          if(status == 200 && data.status) {
            console.log('load yard: ',data)
            yard = data.yard;
            deferred.resolve();
          } else {
            yard = false;
            deferred.reject();
          }
        }).error(function(data) {
          yard = false;
          deferred.reject();
        });

        return deferred.promise;
    };

    function getYard() {
      this.loadYard();
      return yard;
    };

    function saveYard(yardData) {
      var deferred = $q.defer();

      $http.post('/yard', {yardData})
        .success(function(data, status) {
          if(status == 200 && data.status) {
            console.log('save yard: ',data)
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
