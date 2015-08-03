app.factory('searchFactory', function($http, Item) {
    return {
        search: function(query) {
            return $http.get('/api/items/search/' + query)
                .then(function(items) {
                    return items.data;
                })
        },
        show: function(category) {
          return $http.get('/api/items/show/' + category)
            .then(items => {
              return items.data.map(item => new Item(item))
            })
        }
    }

});
