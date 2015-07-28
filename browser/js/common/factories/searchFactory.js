app.factory('searchFactory', function($http) {
    return {
        search: function(query) {
            return $http.get('/api/items/search/' + query)
                .then(function(items) {
                    return items.data;
                })
        }
    }

});