app.directive('itemHover',function($rootScope,Item){
	return {
		restrict:'A',
		// scope:{},
		link:function(scope,elem,attrs){
			// $rootScope.popOver = false;
			elem.bind('mouseenter',function(){
				elem.show();
			});
			elem.bind('mouseleave',function(){
				elem.hide();
			});

		}
		// ,
		// controller:'itemHoverCtrl'
	}
})