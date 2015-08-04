app.controller('cartCtrl', ($scope, $state, order, Order) => {
	$scope.order = order

	$scope.clearCart = () => {
		Order.clearCart()
			.then(() => {
				$scope.order = null;
			})
	}
})