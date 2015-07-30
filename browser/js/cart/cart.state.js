app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: '/js/cart/cart.html',
    resolve: {
      order: (Order) => Order.fetchCurrent()
    },
    controller: ($scope, $state, order, Order) => {
      $scope.order = order

      $scope.clearCart = () => {
        Order.clearCart()
          .then(function(cart) {
            $state..go('cart')
          })
      }
    }
  })
})
