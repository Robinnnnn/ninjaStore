app.config(function($stateProvider) {
	$stateProvider.state('manage', {
		url: '/account/:id',
		templateUrl: 'js/account/account.html',
		resolve: {
			user: (AuthService, User) => {
				return AuthService.getLoggedInUser()
					.then(user => new User(user))
			},
			orders: (user) => {
				return user.fetchUserOrders()
			},
			reviews: (user) => {
				return user.fetchUserReviews()
			}
		},
		controller: "accountCtrl"
	})
});