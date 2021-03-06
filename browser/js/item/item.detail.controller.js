app.controller('itemDetailCtrl', function($scope, item, recommendations, user, Item, $state) {
	$scope.item = item;
	$scope.recommendations = recommendations
	if (user) {
		$scope.user = user;
		$scope.admin = user.isAdmin
	}

	$scope.deleteItem = function() {
		item.destroy().then(function() {
			$state.go('home')
		})
	}

	$scope.editOrSave = "Edit"

	$scope.editOrSaveToggle = function(item) {
		if ($scope.editOrSave === "Edit") {
			$scope.editOrSave = "Save"
		} else {
			$scope.item.name = $scope.item.name.trim()
			$scope.item.quantity = Number($scope.item.quantity)
			$scope.item.save().then(function(item) {
				console.log(item)
				$scope.editOrSave = "Edit"
			})
		}
	}
})