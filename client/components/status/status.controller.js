angular.module('myApp').controller('statusController',
['$scope', '$location', '$timeout', 'AuthService', 'WeatherService', 'CommService',
function($scope, $location, $timeout, AuthService, WeatherService, CommService) {
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
  $scope.longitude = AuthService.getUserStatus().longitude;
  $scope.latitude = AuthService.getUserStatus().latitude;
  $scope.elevation = AuthService.getUserStatus().elevation + " m";
  $scope.batterylevel = AuthService.getUserStatus().batteryLevel + "%";

  WeatherService.getCurrentWeather({
    latitude: $scope.latitude,
    longitude: $scope.longitude
  }).then(function(fVal) {
    for( day in fVal.forecast.daily.data ) {
      if(day == 0) {
        fVal.forecast.daily.data[day].time = "Today";
      } else if(day == 1) {
        fVal.forecast.daily.data[day].time = "Tomorrow";
      } else {
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var a = new Date(fVal.forecast.daily.data[day].time*1000);
        var stringDate = weekdays[a.getDay()];
        fVal.forecast.daily.data[day].time = stringDate;
      }
    }
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

  $scope.shouldShowBeginButton = function() {
    if(currentStatus == 0) {
      return true;
    } else {
      return false;
    }
  };

  /* Begin emergency stopping */
  $scope.stopping = false;
  $scope.stopImage = "loading";
  var stoppingStatuses = [
    "Stopping blade...",
    "Stopping movement...",
    "Shutting down power...",
    "Mower successfully shut down!"
  ];

  $scope.stopMower = function() {
    CommService.stopMower();

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
      $scope.stopImage = "loading";
    }, 9500);
  };

  $scope.isStopping = function() {
    return $scope.stopping;
  };

  /* Begin start of mower */
  $scope.beginning = false;
  $scope.beginImage = "loading";
  var beginningStatuses = [
    "Starting up...",
    "Calculating path...",
    "Movement and blade beginning...",
    "Mowing has begun!"
  ];

  $scope.beginMower = function() {
    CommService.startMower();
    
    $scope.beginning = true;
    $scope.beginStatus = beginningStatuses[0];
    $timeout(function(){
      $scope.beginStatus = beginningStatuses[1];
    }, 1500);
    $timeout(function(){
      $scope.beginStatus = beginningStatuses[2];
    }, 3500);
    $timeout(function(){
      $scope.beginStatus = beginningStatuses[3];
      $scope.beginImage = "checkmark";
    }, 5500);
    $timeout(function(){
      currentStatus = 3;
      $scope.status = statuses[currentStatus];
      $scope.statusDetail = statusDetails[currentStatus];
      $scope.beginImage = "loading";
    }, 9000);
  };

  $scope.isBeginning = function() {
    return $scope.beginning;
  };

}]);
