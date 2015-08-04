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
        if(!scope.newReview.rating) scope.newReview.Rating = 0;
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
      scope.starTrue = [false, false, false, false, false];
      scope.starPermTrue = [false, false, false, false, false];

      scope.applyHoverClass = function(star){
        for(var i = 0; i < star; i++){
          scope.starTrue[i]=true;
        }
      };

      scope.removeHoverClass = function(){
        for(var i = 0; i < scope.stars.length; i++){
          scope.starTrue[i] = false;
        }
      };

      scope.saveReview = function(star){
        for(var i = 0; i < scope.stars.length; i++){
          scope.starPermTrue[i] = false;
        }
        for(var i = 0; i <= star; i++){
          scope.starPermTrue[i] = true;
        }

        scope.newReview.rating = star+1;
      };
    },
    controller: function($scope){

    }
  };
});
