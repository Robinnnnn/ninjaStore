app.directive('addToCart', function() {
  return {
    restrict: 'E',
    scope: {
      item: '='
    },
    link: function(scope, elem, attr) {
      elem.bind('click', function() {
        scope.item.addToCart()
      })
    },
    template: `<button class='btn btn-default'>Add to Cart</button>`
  }
})
