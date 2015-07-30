app.config(function($stateProvider) {
	$stateProvider.state('itemDetail', {
		url: '/items/:id',
		templateUrl: 'js/item/item.detail2.html',
		resolve: {
			item: function(Item, $stateParams) {
				let item = new Item({
					_id: $stateParams.id
				})
				return item.fetch()
			}
		},
		controller: function($scope, item) {
			console.log(item)
			$scope.item = item;
		}
	});
});