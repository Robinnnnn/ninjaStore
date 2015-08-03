app.config(function($stateProvider) {
	$stateProvider.state('itemDetail', {
		url: '/items/:id',
		templateUrl: 'js/item/item.detail.state.html',
		resolve: {
			item: function(Item, $stateParams) {
				let item = new Item({
					_id: $stateParams.id
				})
				return item.fetch()
			}
		},
		controller: function($scope, item) {
			$scope.item = item;
		}
	});
});
