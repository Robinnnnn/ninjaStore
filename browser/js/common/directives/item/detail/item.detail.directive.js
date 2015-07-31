app.directive('itemDetail', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/detail/item.detail.html',
		scope: {
			item: '='
		},
		link: function($scope) {
			$scope.item.price /= 100;
		}
	};
});