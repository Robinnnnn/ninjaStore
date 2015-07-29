app.factory('Order', function($http) {
  function Order(props) {
    angular.extend(this, props)
    return this
  }

  Order.url = '/api/orders/'

  Object.defineProperty(Order.prototype, 'url', {
    get: () => Order.url + this._id
  })

  Order.isNew = () => !this._id

  Order.fetchAll = () => {
    return $http.get(Order.url)
      .then(res => {
        return res.data.map(obj => {
          return new Order(obj)
        })
      })
  }

  Order.fetchCurrent = () => {
    return $http.get(Order.url + 'current')
      .then(res => {
        let order = new Order(res.data)
        order.items.map(obj => {
          return new Item(obj)
        })
        return order
      })
  }

  Order.prototype.fetch = () => {
    return $http.get(this.url)
      .then(res => {
        let order = new Order(res.data)
        order.items.map(obj => {
          return new Item(obj)
        })
        return order
      })
  }

  Order.prototype.save = () => {
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

  Order.prototype.destroy = () => $http.delete(this.url)

  return Order
})
