app.directive('navbar', function($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function(scope, elem) {

            scope.items = [{
                    label: 'Home',
                    state: 'home'
                },

                {
                    label: 'Members Only',
                    state: 'membersOnly',
                    auth: true
                }
            ];

            scope.user = null;

            scope.isLoggedIn = function() {
                return AuthService.isAuthenticated();
            };

            scope.logout = function() {
                AuthService.logout().then(function() {
                    $state.go('home', {}, {
                        reload: true
                    });
                });
            };

            scope.manageAccount = function() {
                $state.go('manage', {
                    id: scope.user._id
                }, {
                    reload: true
                })
            }

            var setUser = function() {
                AuthService.getLoggedInUser().then(function(user) {
                    scope.user = user;
                });
            };

            var removeUser = function() {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            elem.on('mouseenter', () => {
                document.getElementById('logo').classList.add('spin')
            })

            elem.on('mouseleave', () => {
                document.getElementById('logo').classList.remove('spin')
            })
        },
        controller: 'navbarCtrl'

    };

});