app.controller('navbarCtrl', function($rootScope, $scope, searchFactory, $state, Item, Order) {
	$scope.query;
	$scope.items;
	$rootScope.cartContent = $rootScope.cartContent||0;
	// console.log($rootScope.cartContent);
	// $scope.cartContent = $rootScope.cartContent;
	console.log($rootScope.cartContent)
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
