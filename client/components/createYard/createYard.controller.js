angular.module('myApp').controller('createYardController',
['$scope', '$location', 'AuthService', 'YardService', 'CommService',
function($scope, $location, AuthService, YardService, CommService) {

  $scope.createYard = function() {
    console.log('yard created - length: ',$scope.createForm.length,' width: ',$scope.createForm.width);
    // dismiss window
    YardService.saveYard({
      length: $scope.createForm.length,
      width: $scope.createForm.width,
      units: 'inches'
    }).then(function() {
      console.log('saving new yard');
    }).catch(function(error) {
      console.log('error saving new yard:', error);
    });
    CommService.updateYard();

    $scope.createForm = {};
  };

}]);
