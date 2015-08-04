app.controller('accountCtrl', function($scope, $state, $http, User, user, orders,$rootScope) {
	$scope.status = ["Created","Completed","Processing","Cancelled"];
	$scope.user = user
	$scope.orders = orders;
	$scope.toggleDisplay = "Display";
	$rootScope.admin = user.isAdmin

	$scope.editInformation = function() {
		$scope.editing = true;
	}

	$scope.saveInformation = function() {
		$scope.user.save().then(function(user) {
			$scope.editing = false;
		});
	}

	$scope.displayUsers = function() {
		if($scope.usersDisplay){
			$scope.usersDisplay=null;
			$scope.toggleDisplay = "Display";
		} else {
			$scope.toggleDisplay = "Hide";
			User.fetchAll().then(function(users) {
				$scope.usersDisplay = users
			})			
		}
	}

	$scope.switchUser = function(user) {
		$scope.user = user
		$scope.user.fetchUserOrders($scope.user._id).then(function(orders) {
			$scope.orders = orders;
		})
	}

	$scope.setAdmin = function(user,isAdmin){
		user.isAdmin = isAdmin;
		user.save();
	}

	$scope.deleteUser = function(user){
		$scope.usersDisplay.splice($scope.usersDisplay.indexOf(user),1);
		new User({_id:user._id}).destroy().then(function(){
			$state.go('manage')
		})		
	}


	$scope.resetPassword = function(user){
		user.password = 'hello';
		user.passwordReset = true;
		user.save().then(function(){
			$state.go('manage')
		})
	}

})
