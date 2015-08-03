app.controller("checkoutCtrl", function($scope, order, AuthService, Order, $state) {
    $scope.order = order;
    $scope.customer = {};
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
        if (user) {
            $scope.order.userId = user._id;
            console.log(user)
                // $scope.customer.name = user.name;
                // $scope.customer.email = user.email;
                // $scope.customer.addressStreet = user.addresses[0].address
                // $scope.customer.state = user.addresses[0].state
                // $scope.customer.zipcode = user.addresses[0].zipcode
                // $scope.customer.city = user.addresses[0].city

        }
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

    $scope.saveInformation = function(customer) {
        $scope.order.userInfo = customer;
        $scope.user = customer;
    }

    $scope.editInformation = function(customer) {
        $scope.customer = $scope.user;
        $scope.user = null;
    }

    $scope.placeOrder = function() {
        if ($scope.order.userInfo || $scope.order.userId) {
            $scope.order.save().then(function(order) {
                $state.go('manage')
            })
        }
    }
})