app.directive('addReview', function(Review) {
  return {
    restrict: 'E',
    templateUrl: 'js/common/directives/addReview/addReview.html',
    scope: {
      item: '='
    },
    link: (scope, elem, attr) => {
      // scope.newReview = {}
      scope.submitReview = () => {
        let toSave = new Review(scope.newReview)
        toSave.itemId = scope.item._id
        toSave.save()
          .then(review => {
            scope.item.reviews.push(review)
            return scope.item.save()
          })
          .then(() => {
            console.log('review saved and item updated');
          })
      }
    }
  }
})
