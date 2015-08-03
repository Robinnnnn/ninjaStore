app.directive('orderdetail', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            order: '='
        },
        templateUrl: 'js/common/directives/order-detail/order-detail.html',
        controller: function($scope, Order, $state){
        	$scope.removeItem = function(item){
        		Order.removeItem(item)
        		.then(() => {
        			$state.go('home');
        		})
        	};

        }

    };

});
