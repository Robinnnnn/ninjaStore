app.controller("signupCtrl", function($scope, $state, User, AuthService) {
    // $scope.customer = {};
        $scope.error = null;

    // fix the way address is saved
    $scope.signUp = function() {
        //combine street and apt address to get correct address
        $scope.user.addresses.address = $scope.user.addresses.street + ' ' + $scope.user.addresses.apt;
        var tempAddress = $scope.user.addresses;
        $scope.user.addresses = [];
        $scope.user.addresses.push(tempAddress);
        new User($scope.user).save().then(function(user) {
            AuthService.login({
                email: $scope.user.email,
                password: $scope.user.password
            }).then(function() {
                $state.go('home')
            }).catch(function(err) {
                $scope.error = err;
                // $scope.error = 'Invalid login credentials.';
            })
        })
    }
})