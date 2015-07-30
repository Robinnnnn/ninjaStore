// app.controller('starCtrl', function($scope) {
//     $scope.rating = 4;
//     $scope.max = 5
// })

// app.directive('starRating', function() {
//     return {
//         restrict: 'A',
//         template: '<ul class="rating">' + '<li ng-repeat="star in stars" ng-class="star">' + '\u2605' + '</li>' + '</ul>',
//         scope: {
//             rating: '=',
//             max: '='
//         },
//         link: function(scope, elem, attrs) {
//             scope.stars = [];
//             // scope.stars.push
//             for (var i = 0; i < scope.max; i++) {
//                 scope.stars.push({
//                     filled: i < scope.rating
//                 });
//             }
//         },
//         controller: 'starCtrl'
//     }

// })

// app.controller('StarCtrl', function($scope) {
//     $scope.rating = $scope.item.rating
// });
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