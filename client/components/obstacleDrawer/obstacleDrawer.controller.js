angular.module('myApp').controller('obstacleDrawerController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {

  $scope.obstacles = YardService.getObstacles();

  $scope.createObstacle = function() {
    console.log('opening the createObstacle window');
    console.log('$sco:',$scope.obstacles);
  };

  $scope.placeInYard = function() {
    console.log('obstacle to place: ');
  };

}]);
