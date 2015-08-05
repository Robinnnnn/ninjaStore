app.directive('reviewDetail', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {
            review: '='
        },
        templateUrl: 'js/common/directives/review/review.html',
        controller: function($scope, Order, $state){
        	$scope.removeItem = function(item){
        		Order.removeItem(item)
        		.then(function(){
                    $rootScope.cartContent--;
                    $scope.order.items.splice($scope.order.items.indexOf(item),1);
                    if(!$scope.order.items.length) {
                        $state.go('home')
                    }
                })
        	};

        }

    };

});
