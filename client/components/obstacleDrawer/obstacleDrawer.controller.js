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
  };

  var currentlyEditing = null;
  $scope.editObstacle = function(obstacle){
    currentlyEditing = obstacle;
    $scope.obsForm.name = obstacle.name;
    $scope.obsForm.description = obstacle.description;
    $scope.obsForm.length = obstacle.length;
    $scope.obsForm.width = obstacle.width;
    console.log('edit the obstacle');
  };

  $scope.isEditing = function(obstacle) {
    console.log('o:',obstacle);
    console.log('ce:',currentlyEditing);
    var editing = (currentlyEditing == obstacle);
    console.log('currently editing: ', editing);
    return editing;
  };

  $scope.isNotEditing = function(obstacle) {
    var editing = (currentlyEditing != obstacle);
    console.log('currently not editing: ', editing);
    return editing;
  };

  $scope.updateObstacle = function() {
    console.log('updated obstacle: ',$scope.obsForm.name);
    var obstacle = currentlyEditing;
    currentlyEditing.name = $scope.obsForm.name;
    currentlyEditing.description = $scope.obsForm.description;
    currentlyEditing.length = $scope.obsForm.length;
    currentlyEditing.width = $scope.obsForm.width;
    currentlyEditing = null;
  };

}]);
