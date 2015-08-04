app.controller('MainCtrl', ($scope, items, $rootScope, user) => {
    $scope.activeCategory = ''
    $scope.items = items;
    $rootScope.admin = user.isAdmin;
    console.log($rootScope.admin)



    // makes sure the name of the item doesn't expand its div height
    function shortenTitle(title, length) {
        if (title.length > length) {
            return title.slice(0, length) + '...';
        }
        return title;
    }

    $scope.items = $scope.items.map(item => {
        item.shortTitle = shortenTitle(item.name, 35);
        return item;
    })
})