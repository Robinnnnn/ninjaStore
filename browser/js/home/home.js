app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve: {
            items: function(Item) {
                return Item.fetchAll();
            }
        },
        controller: function($scope, items) {
            $scope.items = items;

            // makes sure the name of the item doesn't expand its div height
            function shortenTitle(title, length) {
                if (title.length > length) {
                    return title.slice(0, length) + '...';
                }
                return title;
            }

            $scope.items = $scope.items.map(function(item) {
                item.shortTitle = shortenTitle(item.name, 35);
                return item;
            })
            console.log(items);
        }
    });
});
