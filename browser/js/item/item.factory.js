app.factory('ItemFactory',function($http){
	return {
		getAll: function(){
			return $http.get('/api/items')
						.then(function(res){
							return res.data;
						})
		}
	}
})