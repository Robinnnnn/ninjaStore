app.config(function($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    })

});

app.controller('LoginCtrl', function($scope, AuthService,User, $state) {

    $scope.login = {};
    $scope.user = {};
    $scope.error = null;
    $scope.loginShow = true;
    $scope.toggleLogin = function(){
        $scope.loginShow = $scope.loginShow===true?false:true;
    }
    $scope.sendLogin = function(loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function() {
            $state.go('home');
        }).catch(function() {
            $scope.error = 'Invalid login credentials.';
        });

    };

    // fix the way address is saved
    $scope.signUp = function() {
        //combine street and apt address to get correct address
        console.log($scope.user);
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

});