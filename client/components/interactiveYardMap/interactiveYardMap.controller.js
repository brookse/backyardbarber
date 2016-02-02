angular.module('myApp').controller('interactiveYardMapController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {

  var determineYardStuff = function() {
    $scope.yard = YardService.getYard();
    
  };
  determineYardStuff();

}]);
