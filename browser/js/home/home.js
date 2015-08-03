app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            items: function(Item) {
                return Item.fetchAll();
            }
        },
        controller: 'MainCtrl'
    });
});
