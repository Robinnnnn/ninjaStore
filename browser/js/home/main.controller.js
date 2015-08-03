app.controller('MainCtrl', ($scope, items) => {
    $scope.activeCategory = ''
    $scope.items = items;

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
