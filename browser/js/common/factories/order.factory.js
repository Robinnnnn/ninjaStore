app.factory('Order', function($http, Item) {
  function Order(props) {
    angular.extend(this, props)
    return this
  }

  Order.url = '/api/orders/'

  Object.defineProperty(Order.prototype, 'url', {
    get: function() { return Order.url + this._id }
  })

  Order.prototype.isNew = function() { return !this._id }

  Order.fetchAll = () => {
    return $http.get(Order.url)
      .then(res => {
        return res.data.map(obj => {
          return new Order(obj)
        })
      })
  }

  Order.fetchCurrent = () => {
    return $http.get('/api/cart')
      .then(res => {
        let order = new Order(res.data)
        if (order.items) {
          order.items.map(obj => {
            return new Item(obj)
          })
        }
        return order
      })
  }

  Order.clearCart = () => {
    return $http.delete('/api/cart')
      .then(res => res.data)
  }

  Order.prototype.fetch = function() {
    return $http.get(this.url)
      .then(res => {
        let order = new Order(res.data)
        order.items.map(obj => {
          return new Item(obj)
        })
        return order
      })
  }

  Order.prototype.save = function() {
    let verb
    let url
    if (this.isNew()) {
      verb = 'post'
      url = Order.url
    } else {
      verb = 'put'
      url = this.url
    }
    return $http[verb](url, this)
      .then(res => new Order(res.data))
  }

  Order.prototype.destroy = function() { return $http.delete(this.url) }

  return Order
})
