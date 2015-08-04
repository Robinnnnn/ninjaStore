app.controller("signupCtrl", function($scope, $state, User, AuthService) {
    $scope.customer = {};

    // fix the way address is saved
    $scope.saveInformation = function(customer) {
        $scope.error = null;
        $scope.user = new User(customer);
        $scope.password = customer.password
        $scope.user.save().then(function(user) {
            AuthService.login({
                email: customer.email,
                password: customer.password
            }).then(function() {
                $state.go('home')
            }).catch(function() {
                $scope.error = 'Invalid login credentials.';
            })
        })
    }
})