app.directive('itemDetail', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/item.detail.html',
		scope: {
			item: '='
		}
	};
});