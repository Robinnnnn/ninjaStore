app.directive('addToCart', function($state) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    link: function(scope, elem, attr) {

      scope.QUANTITY = scope.item.quantity

      scope.addToCart = () => {
        scope.item.addToCart()
          .then(item => {
            alert(`successfully added ${item.name} (${item.quantity}x) to your cart!`)
            $state.go('cart')
          })
      }
    },
    templateUrl: '/js/common/directives/addToCart/addToCart.html'
  }
})
