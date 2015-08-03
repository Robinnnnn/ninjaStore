app.controller('accountCtrl', function($scope, $state, $http, User, AuthService) {
	$scope.status= ["Created","Completed","Processing","Cancelled"];
	AuthService.getLoggedInUser().then(function(user) {
		if (user.isAdmin) {
			$scope.admin = true;
		}

		$scope.user = new User(user);

		$scope.user.fetchUserOrders($scope.user._id).then(function(orders) {
			$scope.orders = orders;
		})
	});

	// $scope.account.displayAddress = Object.keys($scope.account.addresses[0])
	// 	.map(function(key) {
	// 		return $scope.account.addresses[0][key]
	// 	}).join(', ');

	$scope.editInformation = function() {
		$scope.editing = true;
	}

	$scope.saveInformation = function() {
		$scope.user.save().then(function(user) {
			console.log(user);
			$scope.editing = false;
		});
	}

	$scope.displayUsers = function() {
		User.fetchAll().then(function(users) {
			$scope.usersDisplay = users
		})
	}

	$scope.switchUser = function(user) {
		$scope.user = user
		$scope.user.fetchUserOrders($scope.user._id).then(function(orders) {
			$scope.orders = orders;
		})
	}
})