app.controller('LoginCtrl', function($scopre, $location, Auth, User) {
  if(Auth.isAuthenticated()) {
    $location.path('/home');
  }
  $scope.login = function(data, form) {
    self = $scope;
    if(data.serialNumber && data.passcode) {
      self.loginForm.serialNumber.$error.required = false;
      var mower = new Mower({
        serialNumber: data.serialNumber,
        passcode: data.passcode
      });
      Auth.login(mower)
        .then(function(results) {
          $location.path('/home');
        }).catch(function(error) {
          self.loginForm.serialNumber.$error.invalid = true;
        })
    } else {
      self.loginForm.serialNumber.$error.required = true;
    }
  };
});
