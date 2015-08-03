/*app.directive('recommendations', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/recommendation/recommendation.html',
		scope:{
			recommendations: '=',
			item: '='
		},
		link: function($scope, Item){
			//pass in item category
			$scope.recommendations = Item.getRecommendations($scope.item.category[0]){
				
			}
		}
	};
});*/