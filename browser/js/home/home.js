app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        resolve:{
        	items: function(ItemFactory){
        		return ItemFactory.getAll();
        	}
        },
        controller:function($scope,items){
        	$scope.items = items;
        }
    });
});