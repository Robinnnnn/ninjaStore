app.config(function($stateProvider) {
  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: '/js/cart/cart.html',
    resolve: {
      order: (Order) => Order.fetchCurrent()
    },
    controller: ($scope, $state, order, Order, $rootScope) => {
      $scope.order = order

      $scope.clearCart = () => {
        Order.clearCart()
          .then(() => {
            $state.go('home')
          })
      }
      $scope.checkOut = () => {
        if ($rootScope.cartContent) {
          $state.go('checkOut')
        } else {
          window.alert('Your cart is empty, bitch!')
          $state.go('home')
        }
      }
    }
  })
})