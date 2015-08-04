app.controller('MainCtrl', ($scope, items) => {
    $scope.activeCategory = '';


    var itemsPerPage = 12;
    $scope.numItems = items.length;
    $scope.numPages = Math.ceil($scope.numItems/itemsPerPage);
    $scope.pages = [];
    for(var i = 1; i<=$scope.numPages; i++){
        $scope.pages[i-1] = i;
    }

    var itemsArr = items.reduce(function(acc, elem, index){
        if(index%itemsPerPage === 0) acc.push([]);
        acc[acc.length-1].push(elem);
        return acc;
    }, []);

    $scope.itemsArr = itemsArr;


    $scope.activePage = 1;

    $scope.onPage = function(page){
        if(page === $scope.activePage) return true;
        else return false;
    };

    $scope.currentPage = function(page){
        console.log("Current page", page)
        $scope.activePage = page;
    };

    $scope.items = items.slice(0,itemsPerPage);

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


    // $scope.totalItems = items.length;
    // $scope.currentPage = 1;

    // $scope.setPage = function (pageNo) {
    //     $scope.currentPage = pageNo;
    // };

    // $scope.pageChanged = function() {
    //     $log.log('Page changed to: ' + $scope.currentPage);
    // };

    // $scope.maxSize = 8;
    // $scope.bigTotalItems = 175;
    // $scope.bigCurrentPage = 1;
})
