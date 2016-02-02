angular.module('myApp').controller('createObstacleController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {

  $scope.createObstacle = function() {
    console.log('obstacle created - name: ',$scope.obstacleForm.name,' descr: ',$scope.obstacleForm.description, ' length: ', $scope.obstacleForm.length, ' width: ', $scope.obstacleForm.width);
    // send to back end
    YardService.saveObstacle({
      name: $scope.obstacleForm.name,
      description: $scope.obstacleForm.description,
      length: $scope.obstacleForm.length,
      width: $scope.obstacleForm.width
    }).then(function() {
      $scope.obstacleForm = {};

      // dismiss window, return to obstacle drawer
      //temp
    }).catch(function() {
      $scope.errorMessage = "Error with creating obstacle";
      $scope.obstacleForm = {};

      // dismiss window, return to obstacle drawer
    });

  };

}]);
