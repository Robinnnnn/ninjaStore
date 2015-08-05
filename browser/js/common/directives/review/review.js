app.directive('reviewDetail', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            review: '='
        },
        templateUrl: 'js/common/directives/review/review.html',
    };

});
