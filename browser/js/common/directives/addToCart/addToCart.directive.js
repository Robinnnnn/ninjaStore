app.directive('addToCart', function() {
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
            console.log('added to cart');
          })
      }
    },
    templateUrl: '/js/common/directives/addToCart/addToCart.html'
  }
})
