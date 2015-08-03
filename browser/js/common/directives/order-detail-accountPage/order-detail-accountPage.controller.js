app.controller('orderdetailAccountPageCtrl', function($scope, Order, $state, $rootScope) {
	$scope.admin = $rootScope.admin
    $scope.changeStatus = function(status){
    	$scope.order.orderState = status;
    	$scope.order.save();
    }
})