app.directive('orderdetail', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'js/common/directives/order-detail/order-detail.html',
        controller: function($scope, Order, $state) {
            $scope.order.items.forEach(function(item) {
                item.price /= 100;
            })

            $scope.removeItem = function(item) {
                Order.removeItem(item)
                    .then(function() {
                        $rootScope.cartContent--;
                        $scope.order.items.splice($scope.order.items.indexOf(item), 1);
                        if (!$scope.order.items.length) {
                            $state.go('home')
                        }
                    })
            };

        }

    };

});