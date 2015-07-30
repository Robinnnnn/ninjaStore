app.config(function($stateProvider) {
	$stateProvider.state('item', {
		url: 'api/items/:id',
		// templateUrl: 'js/item/item.detail.html',
		resolve: {
			item: function(Item, $stateParams) {
				return Item.getOne($stateParams.id);
			}
		},
		controller: function($scope, item) {
			$scope.items = item;

			$scope.items = $scope.items.map(function(item) {
				item.shortTitle = shortenTitle(item.name, 35);
				return item;
			})
		}
	});
});