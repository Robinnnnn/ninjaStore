app.directive('addToCart', function($state, $rootScope, Item) {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    link: function(scope, elem, attr) {
      scope.itemToPurchase = new Item(scope.item)
      scope.itemToPurchase.quantity = null
      scope.QUANTITY = scope.item.quantity

      scope.placeholder = () => {
        return scope.QUANTITY > 0 ? `${scope.QUANTITY} items available` : 'OUT OF STOCK'
      }

      if (scope.QUANTITY == 0) {
        // if item is out of stock, disable ability to add to cart
        elem[0].children[0].children[0].children[0].disabled = true
      } else {
        // make sure in stock items can be added to cart
        elem[0].children[0].children[0].children[0].disabled = false
      }

      scope.addToCart = () => {
        if (!scope.itemToPurchase.quantity) scope.itemToPurchase.quantity = 1
        scope.itemToPurchase.addToCart()
          .then(item => {
            // $state.go('cart')
            $rootScope.$broadcast('cartItemAdded', {
            });
            $rootScope.cartContent++;
          })
      }
    },
    templateUrl: '/js/common/directives/addToCart/addToCart.html'
  }
})
