app.controller('navbarCtrl', function($scope, searchFactory, $state, Item) {
	$scope.query;
	$scope.items;

	$scope.search = function() {
		$state.go('searchResult', {
			query: $scope.query
		})
	}

	Item.getCategories()
		.then(function(categories) {
			$scope.categories = categories
		})
})
