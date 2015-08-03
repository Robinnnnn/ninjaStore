app.config(function($stateProvider) {
	$stateProvider.state('manage', {
		url: '/account/:id',
		templateUrl: 'js/account/account.html',
		resolve: {
			account: function($http, $stateParams) {
				return $http.get('/api/users/'+$stateParams.id)
							.then(function(res){
								return res.data;
							});
			}
		},
		controller: "accountCtrl"
	});
});