angular.module('myApp').controller('interactiveYardMapController',
['$scope', '$location', 'AuthService', 'YardService',
function($scope, $location, AuthService, YardService) {

  YardService.getYard()
    .then(function(yard) {
      $scope.yard = yard.yards[0];

      if($scope.yard.units == "inches") {
        $scope.yard.dimensions = {
          length: $scope.yard.length / 12,
          width: $scope.yard.width / 12,
          units: "feet"
        };
      } else if($scope.yard.units == "centimeters"){
        $scope.yard.dimensions = {
          length: $scope.yard.length / 100,
          width: $scope.yard.width / 100,
          units: "meters"
        };
      }

      // create the map data structure if yard is blank
      if($scope.yard.map == null || typeof $scope.yard.map == 'undefined' || $scope.yard.map.length <= 0) {
        $scope.yard.map = [];
        for(var w=0; w<$scope.yard.dimensions.width; w++) {
          row = [];
          for(var l=0; l<$scope.yard.dimensions.length; l++) {
            // default values
            var isCovered = false, isBlocked = false, isEdge = false;
            var cellColor = "#e5e5e5";

            // check for edges
            if(w==0 || l==0 || w==Math.round($scope.yard.dimensions.width)-1 || l==Math.round($scope.yard.dimensions.length)-1) {
              isEdge = true;
              cellColor = "#8a0000";
            }

            row.push({
              covered: isCovered,
              blocked: isBlocked,
              edge: isEdge,
              originalColor: cellColor,
              color: cellColor,
              inX: w,
              inY: l
            });
          }
          $scope.yard.map[w] = row;
        }
      }

    }).catch(function(err) {
      console.log('e:', err);
    });

    $scope.cellClicked = function(cell) {
      console.log('cell clicked:',cell);
      if(cell.color == "#1bbeca") {   // deselecting an obstacle
        cell.blocked = false;
        cell.color = cell.originalColor;
      } else {    // selecting an obstacle
        cell.color = "#1bbeca";
        cell.blocked = true;
      }
    };

    $scope.saveMap = function() {
      YardService.saveYardUpdates($scope.yard);
    }

}]);
