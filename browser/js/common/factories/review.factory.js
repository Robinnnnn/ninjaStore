app.factory('Review', function($http) {
  function Review(props) {
    angular.extend(this, props)
    return this
  }

  Review.url = '/api/reviews/'

  Object.defineProperty(Review.prototype, 'url', {
    get: function() { return Review.url + this._id }
  })

  Review.prototype.isNew = function() { return !this._id }

  Review.fetchAll = () => {
    return $http.get(Review.url)
      .then(res => {
        return res.data.map(obj => {
          return new Review(obj)
        })
      })
  }

  Review.fetchCurrent = () => {
    return $http.get(Review.url + 'current')
      .then(res => new Review(res.data))
  }

  Review.prototype.fetch = function() {
    return $http.get(this.url)
      .then(res => new Review(res.data))
  }

  Review.prototype.save = function() {
    let verb
    let url
    console.log(this);
    if (this.isNew()) {
      verb = 'post'
      url = Review.url
    } else {
      verb = 'put'
      url = this.url
    }
    return $http[verb](url, this)
      .then(res => new Review(res.data))
  }

  Review.prototype.destroy = function() { return $http.delete(this.url) }

  return Review
})
