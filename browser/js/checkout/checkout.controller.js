app.controller("checkoutCtrl", function($scope, order, AuthService, Order, Promo, $state) {
    $scope.order = order;
    $scope.editing=false;
    $scope.editingCard = true;
    $scope.appliedPromo = false;

    AuthService.getLoggedInUser().then(function(user) {
        $scope.user = user;
        if (user) {
            $scope.order.userId = user._id;
            $scope.user.addresses[0].addressStreet = $scope.user.addresses[0].address;
            $scope.fieldCompleted = true;
        }
    });

    // why can't this work with orderDetail.js?
    // $scope.removeItem = function(item) {
    //     Order.removeItem(item)
    //         .then(() => {
    //             console.log('inside controller')
    //             $state.go('home');
    //         })
    // };

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

    $scope.saveInformation = function(user) {
        $scope.order.userInfo = user;
        $scope.user = user;
        $scope.editing=false;
        // $scope.fieldCompleted = true;
    }

    $scope.editInformation = function() {
        console.log($scope.user);
        // $scope.customer = $scope.user;
        // $scope.user = null;
        $scope.editing=true;
    }

    $scope.clearCart = () => {
        Order.clearCart()
            .then(() => {
                $scope.order = null;
            })
    }
    $scope.stripeCallback = function (code, result) {
        if (result.error) {
            window.alert('it failed! error: ' + result.error.message);
        } else {
            window.alert('You has been charged' + $scope.summary.total);
            $scope.placeOrder();
        }
    };

    $scope.editCardInformation = function(edit){
        $scope.editingCard = edit;
    }

    $scope.applyPromocode = function(promoCode){
        console.log('go here')
        new Promo({promoCode:promoCode}).fetchPromo().then(function(promo){
            $scope.summary.total = $scope.summary.total*(1-promo.percentOff/100)
            // console.log(promo.percentOff)
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