app.config(function($stateProvider) {
	$stateProvider.state('itemDetail', {
		url: '/items/:id',
		templateUrl: 'js/item/item.detail.state.html',
		resolve: {
			item: (Item, $stateParams) => {
				let item = new Item({
					_id: $stateParams.id
				})
				return item.fetch()
			},
			user: (AuthService) => AuthService.getLoggedInUser()
		},
		controller: function($scope, item, user) {
			$scope.item = item;
			$scope.user = user;
		}
	});
});
