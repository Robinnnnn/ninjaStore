app.controller('accountCtrl', function($scope, $state, $http, User, user, orders, reviews, categories, $rootScope, Item, Promo) {
	$scope.status = ["Created", "Completed", "Processing", "Cancelled"];
	$scope.newItem = {
		description: {}
	}
	$scope.user = user
	$scope.orders = orders;
	$scope.reviews = reviews;
	$scope.categories = categories;
	$scope.toggleDisplay = "Display";
	$rootScope.admin = user.isAdmin
	$scope.displayObject;
	$scope.newPromo={};
	$scope.newPromo.validCategories=[];
	$scope.valuationDatePickerIsOpen = false;

	$scope.displayAccountInfo = function() {
		$scope.displayObject = 'account'
	}

	$scope.editInformation = function() {
		$scope.displayObject = 'editing'
	}

	$scope.saveInformation = function() {
		$scope.user.save().then(function(user) {
			$scope.displayObject = 'account'
		});
	}

	$scope.saveNewItem = function() {
		$scope.newItem.price *= 100;
		console.log('pre-save', $scope.newItem)
		var newItem = new Item($scope.newItem);
		newItem.save().then(function(item) {
			console.log('post-save', item)
			$scope.cancelCreation();
		})
	}

	$scope.createItem = function() {
		$scope.displayObject = 'newItem';
	}

	$scope.createCategory = function() {
		$scope.displayObject = 'newCategory';
	}
	$scope.managePromo = function() {
		Promo.fetchAll().then(function(promos){
			$scope.displayObject = 'promo';
			$scope.promos = promos;
			console.log($scope.promos);
		})
	}

	$scope.displayUsers = function() {
		User.fetchAll().then(function(users) {
			$scope.displayObject = 'users'
			$scope.usersDisplay = users;
		})
	}



	$scope.displayOrders = function() {
		// $scope.displayingOrders = true;
		$scope.displayObject = 'orders'
	}

	$scope.displayReviews = function() {
		// $scope.displayingReviews = true;
		$scope.displayObject = 'reviews'
	}

	$scope.switchUser = function(user) {
		$scope.user = user
		$scope.displayObject = null;
		$scope.user.fetchUserOrders($scope.user._id).then(function(orders) {
			$scope.orders = orders;
		})
		$scope.user.fetchUserReviews($scope.user._id).then(function(reviews) {
			$scope.reviews = reviews;
		})
	}

	$scope.setAdmin = function(user, isAdmin) {
		user.isAdmin = isAdmin;
		user.save();
	}

	$scope.deleteUser = function(user) {
		$scope.usersDisplay.splice($scope.usersDisplay.indexOf(user), 1);
		new User({
			_id: user._id
		}).destroy().then(function() {
			$state.go('manage')
		})
	}

	$scope.resetPassword = function(user) {
		user.password = 'hello';
		user.passwordReset = true;
		user.save().then(function() {
			$state.go('manage')
		})
	}


	//manage Promo code
  $scope.createNewPromoCode = function(){
  	$scope.newPromo.createdDate = new Date();
  	var newPromo = new Promo($scope.newPromo).save().then(function(promo){
  		console.log('go here')
  		console.log(promo);
  	})
  }
  
  $scope.valuationDatePickerOpen = function ($event) {
    
      if ($event) {
          $event.preventDefault();
          $event.stopPropagation(); // This is the magic
      }
      this.valuationDatePickerIsOpen = true;
  };

  // // $scope.today = function() {
    
  // // };
  // // $scope.today();

  // $scope.clear = function () {
  //   $scope.newPromo.createdDate = null;
  // };

  // // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };


  // $scope.open = function($event) {
  //   $scope.opened = true;
  // };

  // $scope.dateOptions = {
  //   formatYear: 'yy',
  //   startingDay: 1
  // };

  // $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  // $scope.format = $scope.formats[0];

  // var tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // var afterTomorrow = new Date();
  // afterTomorrow.setDate(tomorrow.getDate() + 2);
  // $scope.events =
  //   [
  //     {
  //       date: tomorrow,
  //       status: 'full'
  //     },
  //     {
  //       date: afterTomorrow,
  //       status: 'partially'
  //     }
  //   ];

  // $scope.getDayClass = function(date, mode) {
  //   if (mode === 'day') {
  //     var dayToCheck = new Date(date).setHours(0,0,0,0);

  //     for(var i=0; i<$scope.events.length; i++){
  //       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
  //       if (dayToCheck === currentDay) {
  //         return $scope.events[i].status;
  //       }
  //     }
  //   }

  //   return '';
  // };




})