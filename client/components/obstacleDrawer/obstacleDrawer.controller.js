angular.module('myApp').controller('obstacleDrawerController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {

  YardService.getObstacles()
    .then(function(obs) {
      $scope.obstacles = obs.obstacles;
    }).catch(function(err) {
      console.log('e:',err);
    })

  $scope.createObstacle = function() {
    console.log('opening the createObstacle window');
    console.log('$sco:',$scope.obstacles);
  };

  $scope.deleteObstacle = function(obstacle) {
    YardService.deleteObstacle({
      obst: obstacle
    }).then(function(ob) {
      YardService.getObstacles()
        .then(function(obs) {
          $scope.obstacles = obs.obstacles;
        }).catch(function(err) {
          console.log('e:',err);
        });
    });
  };

  $scope.placeInYard = function(obstacle) {
    console.log('obstacle to place: ',obstacle.name);
  };

  $scope.noObstaclesFound = function() {
    if($scope.obstacles && $scope.obstacles.length > 0) {
      return false;
    } else {
      return true;
    }
  }

}]);
