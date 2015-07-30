app.directive('starRating', function() {
    return {
        restrict: 'A',
        template: '<div class="rating">' +
            '<span ng-repeat="star in stars" ng-class="star">' +
            '<img class="ratingStar" src="https://www.karatemart.com/images/products/large/black-ronin-throwing-star.jpg" />' +
            '</span>' +
            '</div><br>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function(scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i >= scope.ratingValue
                });
            }
        }
    }
});