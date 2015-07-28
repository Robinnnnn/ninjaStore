app.config(function($stateProvider) {
	$stateProvider.state('searchResult', {
		url: '/search/:query',
		templateUrl: 'js/home/home.html',
		resolve: {
			items: function(searchFactory, $stateParams) {
				return searchFactory.search($stateParams.query);
			}
		},
		controller: 'searchCtrl'
	})
})