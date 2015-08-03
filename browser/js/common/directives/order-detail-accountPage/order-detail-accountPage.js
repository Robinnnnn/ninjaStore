app.directive('orderdetailAccountPage', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            order: '=',
            statuses:'='
        },
        templateUrl: 'js/common/directives/order-detail-accountPage/order-detail-accountPage.html',
        controller: 'orderdetailAccountPageCtrl'

    };

});
