app.directive('recommendations', function(){
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/recommendations/recommendation.html',
		scope:{
			recommendations: '=',
			item: '='
		},
		link: (scope) => {
		    function shortenTitle(title, length) {
		        if (title.length > length) {
		            return title.slice(0, length) + '...';
		        }
		        return title;
		    }
		    
		    scope.recommendations.forEach(function(elem){
		    	elem.shortTitle = shortenTitle(elem.name, 35);
		    });

		}
	};
});