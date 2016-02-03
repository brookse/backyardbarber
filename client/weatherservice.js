angular.module('myApp').factory('WeatherService',
  ['$q', '$timeout', '$http',
  function($q, $timeout, $http) {
    var forecast = null;

    return({
      getCurrentWeather: getCurrentWeather,
      accessWeather: accessWeather
    });

    function accessWeather(weatherData) {
      var deferred = $q.defer();
      $http.get('/forecast?longitude='+weatherData.longitude+'&latitude='+weatherData.latitude)
        .success(function(data, status) {
          forecast = data;
          deferred.resolve(data);
        }).error(function(data) {
          deferred.reject(data);
        });

        return deferred.promise;
    };

    function getCurrentWeather(weatherData) {
      var deferred = $q.defer();
      this.accessWeather(weatherData).then(deferred.resolve).catch(deferred.reject);
      return deferred.promise;
    };
}]);
