app.directive('itemThumbnail', function() {
	return {
		restrict: 'E',
		templateUrl: 'js/common/directives/item/item.thumbnail.html',
		scope: {
			item: '=',
			admin: '='
		},
		link: function(scope, $rootScope) {
			function shortenTitle(title, length) {
				if (title.length > length) {
					return title.slice(0, length) + '...';
				}
				return title;
			}

			scope.item.shortTitle = shortenTitle(scope.item.name, 35);

			scope.item.price /= 100;
		}
	};
});