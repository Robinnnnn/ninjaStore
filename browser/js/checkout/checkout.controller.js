app.controller("checkoutCtrl", function($scope, order, AuthService) {
    $scope.order = order;
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
    });

    function updateSummary(summary) {
        summary.shipping = summary.itemPrice * 0.03;
        summary.tax = summary.itemPrice * 0.08;
        summary.totalBeforeTax = summary.itemPrice + summary.shipping;
        summary.total = summary.tax + summary.totalBeforeTax;
    }
    // console.log($scope.order);
    $scope.summary = function() {
        $scope.summary = {
            numItem: $scope.order.items.length,
            itemPrice: $scope.order.items.reduce(function(sum, item) {
                return sum + item.price;
            }, 0)
        }
        updateSummary($scope.summary);
    }
    $scope.summary();
})