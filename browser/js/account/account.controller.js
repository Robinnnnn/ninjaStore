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
		})
	}

	$scope.displayUsers = function() {
		User.fetchAll().then(function(users) {
			$scope.displayObject = 'users'
			$scope.usersDisplay = users;
		})
	}

	$scope.toggleSelection = function(category) {
    var idx = $scope.newPromo.validCategories.indexOf(category);

    // is currently selected
    if (idx > -1) {
      $scope.newPromo.validCategories.splice(idx, 1);
    }
    else {
      $scope.newPromo.validCategories.push(category);
    }
  };

	$scope.displayOrders = function() {
		$scope.displayObject = 'orders'
	}

	$scope.displayReviews = function() {
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
  	new Promo($scope.newPromo).save().then(function(promo){
  		$scope.promos.push(promo);
  	})
  }
  
  $scope.valuationDatePickerOpen = function ($event) {
    
      if ($event) {
          $event.preventDefault();
          $event.stopPropagation(); // This is the magic
      }
      this.valuationDatePickerIsOpen = true;
  };



})