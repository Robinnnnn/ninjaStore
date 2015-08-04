app.directive('itemThumbnail', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/item.thumbnail.html',
		scope: {
			item: '=',
			admin: '='
		},
		link: function(scope, $rootScope) {
			scope.item.price /= 100;
		}
	};
});