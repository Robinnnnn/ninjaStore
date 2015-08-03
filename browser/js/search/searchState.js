app.config(function($stateProvider) {
	$stateProvider
	.state('searchResult', {
		url: '/search/:query',
		templateUrl: 'js/home/home.html',
		resolve: {
			items: function(searchFactory, $stateParams) {
				return searchFactory.search($stateParams.query);
			}
		},
		controller: 'searchCtrl'
	})
	.state('showResult', {
		url: '/show/:category',
		templateUrl: '/js/home/home.html',
		resolve: {
			items: (searchFactory, $stateParams) => {
				return searchFactory.show($stateParams.category)
			}
		},
		controller: 'MainCtrl'
	})
})
