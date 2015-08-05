app.controller('accountCtrl', function($scope, $state, $http, User, user, orders, reviews, $rootScope, Item) {
	$scope.status = ["Created", "Completed", "Processing", "Cancelled"];
	$scope.newItem = {
		description: {}
	}
	$scope.user = user
	$scope.orders = orders;
	$scope.reviews = reviews;
	console.log($scope.reviews[0]);
	$scope.toggleDisplay = "Display";
	$rootScope.admin = user.isAdmin
	$scope.displayObject;

	$scope.displayAccountInfo = function() {
		$scope.displayObject = 'account'
	}

	$scope.editInformation = function() {
		$scope.displayObject = 'editing'
	}

	$scope.saveInformation = function() {
		$scope.user.save().then(function(user) {
			$scope.displayObject = 'account'
		});
	}

	$scope.saveNewItem = function() {
		$scope.newItem.price *= 100;
		console.log('pre-save', $scope.newItem)
		var newItem = new Item($scope.newItem);
		newItem.save().then(function(item) {
			console.log('post-save', item)
			$scope.cancelCreation();
		})
	}

	$scope.createItem = function() {
		$scope.displayObject = 'newItem';
	}

	// $scope.cancelCreation = function() {
	// 	$scope.addingNewItem = $scope.addingCategory = false;
	// }

	$scope.createCategory = function() {
		$scope.displayObject = 'newCategory';
	}

	$scope.displayUsers = function() {
		// if ($scope.usersDisplay) {
		// 	$scope.usersDisplay = null;
		// 	$scope.toggleDisplay = "Display";
		// } else {
		// 	$scope.toggleDisplay = "Hide";
		// 	User.fetchAll().then(function(users) {
		// 		$scope.usersDisplay = users
		// 	})
		// }
		User.fetchAll().then(function(users) {
			$scope.displayObject = 'users'
			$scope.usersDisplay = users;
		})
	}



	$scope.displayOrders = function() {
		// $scope.displayingOrders = true;
		$scope.displayObject = 'orders'
	}

	$scope.displayReviews = function() {
		// $scope.displayingReviews = true;
		$scope.displayObject = 'reviews'
	}

	$scope.switchUser = function(user) {
		$scope.user = user
		$scope.user.fetchUserOrders($scope.user._id).then(function(orders) {
			$scope.orders = orders;
		})
		$scope.user.fetchUserReviews($scope.user._id).then(function(reviews) {
			$scope.reviews = reviews;
		})
	}

	$scope.setAdmin = function(user, isAdmin) {
		user.isAdmin = isAdmin;
		user.save();
	}

	$scope.deleteUser = function(user) {
		$scope.usersDisplay.splice($scope.usersDisplay.indexOf(user), 1);
		new User({
			_id: user._id
		}).destroy().then(function() {
			$state.go('manage')
		})
	}

	$scope.resetPassword = function(user) {
		user.password = 'hello';
		user.passwordReset = true;
		user.save().then(function() {
			$state.go('manage')
		})
	}

})