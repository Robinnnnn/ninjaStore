app.directive('orderdetail', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'js/common/directives/order-detail/order-detail.html',
        link: function(scope, Order) {

        }

    };

});