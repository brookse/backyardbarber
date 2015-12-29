app.controller('LogoutCtrl', function(Auth, $location) {
  Auth.logout();
  $location.path('/login');
});
