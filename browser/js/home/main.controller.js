app.controller('MainCtrl', ($scope, items) => {
    $scope.activeCategory = '';


    var itemsPerPage = 16;
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

    $scope.activePage = 1;
    $scope.items = itemsArr[0];

    $scope.onPage = function(page){
        if(page === $scope.activePage) return true;
        else return false;
    };

    $scope.currentPage = function(page){
        $scope.activePage = page;
        $scope.items = itemsArr[page-1];
    };

    $scope.previousPage = function(){
        $scope.activePage--;
        $scope.items = itemsArr[$scope.activePage-1];
    };

    $scope.nextPage = function(){
        $scope.activePage++;
        $scope.items = itemsArr[$scope.activePage-1];
    };


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
