app.controller('accountCtrl', function($scope, $state, $http, User, user, orders) {
	$scope.status = ["Created","Completed","Processing","Cancelled"];
	$scope.user = user
	$scope.orders = orders
	$scope.admin = user.isAdmin

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
