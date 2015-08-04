app.controller('MainCtrl', ($scope, items, $log) => {
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


    $scope.totalItems = items.length;
    $scope.currentPage = 1;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 8;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
})
