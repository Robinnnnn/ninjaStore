app.controller('accountCtrl', function($rootScope, $scope, $state, $http, account) {
	$scope.account = account;
	$scope.account.displayAddress = Object.keys($scope.account.addresses[0])
		.map(function(key) {
			return $scope.account.addresses[0][key]
		}).join(', ');
	console.log($scope.account.displayAddress)
		// console.log($scope.account.addresses[0]);
	$scope.showOrder = function() {
		$http.get('/api/users/' + $scope.account._id + '/getOrders')
			.then(function(res) {
				console.log(res)
				$scope.orders = res.data;
			})
	}

})