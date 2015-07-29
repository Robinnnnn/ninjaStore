app.config(function($stateProvider) {
	$stateProvider.state('item.detail', {
		url: '/item/:id',
		templateUrl: 'js/item/item.detail.html',
		resolve: {
			item: function(ItemFactory, $stateParams) {
				return ItemFactory.getOne($stateParams.id);
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