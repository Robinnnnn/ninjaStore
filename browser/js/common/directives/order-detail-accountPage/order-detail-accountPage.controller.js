app.controller('orderdetailAccountPageCtrl', function($scope, Order, $state) {
    $scope.changeStatus = function(status){
    	$scope.order.orderState = status;
    	$scope.order.save();
    }
})