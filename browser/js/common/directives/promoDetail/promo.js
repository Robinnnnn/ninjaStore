app.directive('promoDetail', function($rootScope) {

    return {
        restrict: 'E',
        scope: {
            promo: '='
        },
        templateUrl: 'js/common/directives/promoDetail/promo.html',
        controller: function($scope, Promo) {
            $scope.editing = 'edit';
            $scope.edit = function(){
                $scope.editing = $scope.editing=== 'edit'?'save':'edit';
            }
        }
    };

});