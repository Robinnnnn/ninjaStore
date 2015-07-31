app.directive('itemThumbnail', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/thumbnail/item.thumbnail.html',
		scope: {
			item: '='
		},
		link: function($scope) {
			$scope.item.price /= 100;
		}
	};
});