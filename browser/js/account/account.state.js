app.config(function($stateProvider) {
	$stateProvider.state('manage', {
		url: '/account/:id',
		templateUrl: 'js/account/account.html',
		resolve: {
			account: function(User, $stateParams) {
				return new User({_id:$stateParams.id}).fetch();
			}
		},
		controller: "accountCtrl"
	});
});