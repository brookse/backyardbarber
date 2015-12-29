app.service('Session',function() {
  this.create = function(mower) {
    this.mower = mower;
  };
  this.destroy = function(mower) {
    this.mower = null;
  }
  return this;
})
