app.factory('searchFactory', function($http, Item) {
    return {
        search(query) {
                return $http.get('/api/items/search/' + query)
                    .then(function(items) {
                        return items.data;
                    })
            },
            show(category) {
                return $http.get('/api/items/show/' + category)
                    .then(items => {
                        return items.data.map(item => new Item(item))
                    })
            }
    }

});