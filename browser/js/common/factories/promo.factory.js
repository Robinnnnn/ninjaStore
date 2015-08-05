app.factory('Promo', function($http) {
  function Promo(props) {
    angular.extend(this, props)
    return this
  }

  Promo.url = '/api/Promo/'

  Object.defineProperty(Promo.prototype, 'url', {
    get: function() { return Promo.url + this._id }
  })

  Promo.prototype.isNew = function() { return !this._id }

  Promo.fetchAll = () => {
    return $http.get(Promo.url)
      .then(res => {
        return res.data.map(obj => {
          return new Promo(obj)
        })
      })
  }

  Promo.fetchCurrent = () => {
    return $http.get(Promo.url + 'current')
      .then(res => new Promo(res.data))
  }

  Promo.prototype.fetch = function() {
    return $http.get(this.url)
      .then(res => new Promo(res.data))
  }

  Promo.prototype.save = function() {
    let verb
    let url
    console.log(this);
    if (this.isNew()) {
      verb = 'post'
      url = Promo.url
    } else {
      verb = 'put'
      url = this.url
    }
    return $http[verb](url, this)
      .then(res => new Promo(res.data))
  }

  Promo.prototype.destroy = function() { return $http.delete(this.url) }

  return Promo
})
