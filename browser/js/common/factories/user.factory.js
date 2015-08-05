app.factory('User', function($http, Order, Review) {
	function User(props) {
		angular.extend(this, props)
		return this
	}

	User.url = '/api/users/'

	Object.defineProperty(User.prototype, 'url', {
		get: function() {
			return User.url + this._id
		}
	})

	User.prototype.isNew = function() {
		return !this._id
	}

	User.fetchAll = function() {
		return $http.get(User.url)
			.then(res => {
				return res.data.map(obj => {
					return new User(obj)
				})
			})
	}

	User.prototype.fetch = function() {
		return $http.get(this.url)
			.then(res => new User(res.data))
	}

	User.prototype.fetchUserOrders = function() {
		return $http.get(this.url + '/getOrders')
			.then(res => {
				return res.data.map(obj => new Order(obj))
			})
			.then(orders => {
				return orders
			})
	}

	User.prototype.fetchUserReviews = function() {
		return $http.get(this.url + '/getReviews')
			.then(res => {
				return res.data.map(obj => new Review(obj))
			})
			.then(reviews => {
				return reviews
			})
	}

	User.prototype.save = function() {
		let verb
		let url
		if (this.isNew()) {
			verb = 'post'
			url = User.url
		} else {
			verb = 'put'
			url = this.url
		}
		return $http[verb](url, this)
			.then(res => new User(res.data))
	}

	User.prototype.destroy = function() {
		return $http.delete(this.url)
	}

	return User
})
