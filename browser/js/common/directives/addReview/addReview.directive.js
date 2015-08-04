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

      scope.stars = [0, 1, 2, 3, 4];

      scope.applyHoverClass = function(item){
        alert(item);
        for(var i = 0; i < item; i++){
          scope.star[i].addClass('rotate');
        }
      };
    },
    controller: function($scope){

    }
  };
});
