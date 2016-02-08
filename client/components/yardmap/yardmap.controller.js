angular.module('myApp').controller('yardmapController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {
  var pages = [
    'components/createYard/createYard.template.html',
    'components/obstacleDrawer/obstacleDrawer.template.html',
    'components/createObstacle/createObstacle.template.html',
    'components/interactiveYardMap/interactiveYardMap.template.html'
  ]
  var currentPage = 0;
  $scope.subpage = pages[currentPage];
  $scope.yard = YardService.getYard();
  console.log('sy:',$scope.yard);


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
