app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            items: function(Item) {
                return Item.fetchAll();
            },
            user: (AuthService, User) => {
                return AuthService.getLoggedInUser()
                    .then(user => new User(user))
            }
        },
        controller: 'MainCtrl'
    });
});