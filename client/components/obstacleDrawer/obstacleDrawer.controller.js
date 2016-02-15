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

  $scope.placeInYard = function() {
    console.log('obstacle to place: ');
  };

}]);
