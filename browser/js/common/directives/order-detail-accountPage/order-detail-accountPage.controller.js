app.controller('orderdetailAccountPageCtrl', function($scope, Order, $state) {
    // $scope.statuses = ["Created","Completed","Processing","Cancelled"];
    // console.log('go here')
    $scope.changeStatus = function(status){
    	$scope.order.orderState = status;
    }
})