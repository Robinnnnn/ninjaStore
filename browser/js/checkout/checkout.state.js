app.config(function($stateProvider) {
    $stateProvider.state('checkOut', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        resolve: {
            order: (Order) => Order.fetchCurrent()
        },
        controller: "checkoutCtrl"
    })
})