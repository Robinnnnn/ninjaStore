app.controller('itemDetailCtrl', function($scope, item, recommendations, user, Item) {
	$scope.item = item;
	$scope.recommendations = recommendations
	$scope.user = user;
	$scope.admin = user.isAdmin;
	$scope.editOrSave = "edit"

	$scope.editOrSaveToggle = function(item) {
		if ($scope.editOrSave === "edit") {
			$scope.editOrSave = "save"
		} else {
			$scope.item.name = $scope.item.name.trim()
			$scope.item.quantity = Number($scope.item.quantity)
			$scope.item.save().then(function(item) {
				console.log(item)
				$scope.editOrSave = "edit"
			})
		}
	}
})