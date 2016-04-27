angular.module('myApp').controller('yardmapController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {
  var pages = [
    'components/createYard/createYard.template.html',
    'components/obstacleDrawer/obstacleDrawer.template.html',
    'components/createObstacle/createObstacle.template.html',
    'components/interactiveYardMap/interactiveYardMap.template.html'
  ]
  var currentPage;

  YardService.getYard()
  .then(function(yard) {
    $scope.yard = yard.yards[0];

    if($scope.yard && $scope.yard.length > 0) {
      currentPage = 3;
      $scope.subpage = pages[currentPage];
    } else {
      currentPage = 0;
      $scope.subpage = pages[currentPage];
    }

  }).catch(function(err) {
    console.log('e:',err);
  });

  $scope.subpage = pages[currentPage];

  $scope.nextStatus = function() {
    currentPage = (currentPage + 1) % pages.length;
    $scope.subpage = pages[currentPage];
  };

  $scope.previousStatus = function() {
    if (currentPage === 0) {
      currentPage = pages.length;
    } else {
      currentPage = (currentPage - 1);
    }
    $scope.subpage = pages[currentPage];
  };
}]);
