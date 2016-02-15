angular.module('myApp').controller('statusController',
['$scope', '$location', '$timeout', 'AuthService', 'WeatherService',
function($scope, $location, $timeout, AuthService, WeatherService) {
  var statuses = ["Charging", "Error", "Idle", "Mowing", "Dead", "On Fire"];
  var statusDetails = [
    "The mower is in the charging dock.",
    "The mower is currently stuck or is in some sort of trouble. Move it to the charging dock to reset it!",
    "The mower is idling with the engine off, but it is not in the charging dock. Move it to the dock to charge!",
    "The mower is currently mowing the lawn.",
    "The mower is depleted of battery and not in the charging dock. Move it to the dock to charge!",
    "The mower is currently on fire! You may want to put it out."
  ];
  var currentStatus = 0;

  $scope.serialnumber = AuthService.getUserStatus().username;
  $scope.nickname = AuthService.getUserStatus().nickname;
  $scope.status = statuses[currentStatus];
  $scope.statusDetail = statusDetails[currentStatus];
  $scope.longitude = "-87.9090520";
  $scope.latitude = "43.0441100";
  $scope.elevation = "183.57 m";
  $scope.batterylevel = "25%";

  WeatherService.getCurrentWeather({
    latitude: $scope.latitude,
    longitude: $scope.longitude
  }).then(function(fVal) {
    $scope.forecast = fVal;
    console.log('f:',$scope.forecast);
  }).catch(function(err) {
    console.log('e:',err);
  });

  $scope.stopping = false;

  $scope.nextStatus = function() {
    currentStatus = (currentStatus + 1) % statuses.length;
    $scope.status = statuses[currentStatus];
    $scope.statusDetail = statusDetails[currentStatus];
  };

  $scope.previousStatus = function() {
    if (currentStatus === 0) {
      currentStatus = statuses.length;
    } else {
      currentStatus = (currentStatus - 1);
    }
    $scope.status = statuses[currentStatus];
    $scope.statusDetail = statusDetails[currentStatus];
  };

  // var map;
  // $scope.initMap = function() {
  //   map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: $scope.latitude, lng: $scope.longitude},
  //     zoom: 8
  //   });
  // };

  $scope.shouldShowDailyWeatherWarning = function() {
    if($scope.forecast.forecast.daily.data[0].precipProbability > .25) {
      return true;
    } else {
      return false;
    }
  };

  $scope.shouldShowAlertBox = function() {
    if($scope.forecast.forecast.alerts) {
      return true;
    } else {
      return false;
    }
  };

  $scope.shouldShowStopButton = function() {
    if(currentStatus == 3) {
      return true;
    } else {
      return false;
    }
  };

  $scope.stopping = false;
  $scope.stopImage = "loading";
  var stoppingStatuses = [
    "Stopping blade...",
    "Stopping movement...",
    "Shutting down power...",
    "Mower successfully shut down!"
  ];

  $scope.stopMower = function() {
    $scope.stopping = true;
    $scope.stopStatus = stoppingStatuses[0];
    $timeout(function(){
      $scope.stopStatus = stoppingStatuses[1];
    }, 2000);
    $timeout(function(){
      $scope.stopStatus = stoppingStatuses[2];
    }, 4500);
    $timeout(function(){
      $scope.stopStatus = stoppingStatuses[3];
      $scope.stopImage = "checkmark";
    }, 7500);
    $timeout(function(){
      currentStatus = 2;
      $scope.status = statuses[currentStatus];
      $scope.statusDetail = statusDetails[currentStatus];
    }, 9500);
  };

  $scope.isStopping = function() {
    return $scope.stopping;
  };

}]);
