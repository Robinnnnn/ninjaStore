app.controller("checkoutCtrl", function($scope, order, AuthService, Order, $state) {
    $scope.order = order;
    $scope.customer = {};
    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
        if (user) {
            $scope.order.userId = user._id;
            $scope.fieldCompleted = true;
        }
    });

    $scope.removeItem = function(item) {
        Order.removeItem(item)
            .then(() => {
                console.log('inside controller')
                $state.go('home');
            })
    };

    $scope.checkOut = function() {
        $scope.order.items.length ? $state.go('checkOut') :
            alert('You don\'t have any items though')
    }

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

    if ($scope.order.items) $scope.summary();

    $scope.saveInformation = function(customer) {
        $scope.order.userInfo = customer;
        $scope.user = customer;
        $scope.fieldCompleted = true;
    }

    $scope.editInformation = function(customer) {
        $scope.customer = $scope.user;
        $scope.user = null;
    }

    $scope.clearCart = () => {
        Order.clearCart()
            .then(() => {
                $scope.order = null;
            })
    }

    $scope.placeOrder = function() {
        if ($scope.fieldCompleted) {
            $scope.order.save().then(function(order) {
                $scope.clearCart();
                if ($scope.order.userInfo) {
                    $state.go('home')
                } else {
                    $state.go('manage')
                }
            })
        } else {
            alert('fill in your address tho')
        }
    }
})