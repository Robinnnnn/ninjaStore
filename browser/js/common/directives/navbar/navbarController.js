app.controller('navbarCtrl', function($scope, searchFactory, $state) {
	$scope.query;
	$scope.items;
	$scope.search = function() {
		$state.go('searchResult', {
			query: $scope.query
		})
	}
})