app.controller('navbarCtrl', function($rootScope, $scope, searchFactory, $state, Item, Order, $timeout) {
	$scope.query;
	$scope.items;
	Order.fetchCurrent();
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

	$rootScope.$on('cartItemAdded', function (event, data){
		$scope.shakeBool = true;
		$timeout(function(){
			$scope.shakeBool = false;
		}, 400);
	});

})
