app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: '/js/cart/cart.html',
    resolve: {
      order: (Order) => Order.fetchCurrent()
    },
    controller: 'checkoutCtrl'
  })
})