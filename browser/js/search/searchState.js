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
		controller: ($scope, items) => {
			$scope.items = items.map(item => {
				item.shortTitle = shortenTitle(item.name, 35)
				return item
			})

			// makes sure the name of the item doesn't expand its div height
			function shortenTitle(title, length) {
					if (title.length > length) {
							return title.slice(0, length) + '...';
					}
					return title;
			}

			console.log(items);
		}
	})
})
