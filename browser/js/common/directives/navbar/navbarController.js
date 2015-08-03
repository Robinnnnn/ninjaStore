app.controller('navbarCtrl', function($rootScope, $scope, searchFactory, $state, Item) {
	$scope.query;
	$scope.items;

	$scope.show = (category) => {
		$state.go('showResult', {
			category: category
		})
	}

	$scope.search = () => {
		$state.go('searchResult', {
			query: $scope.query
		})
	}

	Item.getCategories()
		.then(categories => {
			$scope.categories = categories
		})
})
