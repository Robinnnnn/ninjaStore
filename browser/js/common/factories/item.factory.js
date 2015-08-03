app.factory('Item', function($http) {
	function Item(props) {
		angular.extend(this, props)
		return this
	}

	Item.url = '/api/items/'

	Object.defineProperty(Item.prototype, 'url', {
		get: function() {
			return Item.url + this._id
		}
	})

	Item.prototype.isNew = function() {
		return !this._id
	}

	Item.fetchAll = function() {
		return $http.get(Item.url)
			.then(res => {
				return res.data.map(obj => new Item(obj))
			})
	}

	Item.getCategories = function() {
		return $http.get(Item.url + 'categories')
			.then(res => res.data)
	}

	Item.prototype.fetch = function() {
		return $http.get(this.url)
			.then(res => new Item(res.data))
	}

	Item.prototype.addToCart = function() {
		return $http.post('/api/cart', this)
			.then(res => new Item(res.data))
	}

	Item.prototype.save = function() {
		let verb
		let url
		if (this.isNew()) {
			verb = 'post'
			url = Item.url
		} else {
			verb = 'put'
			url = this.url
		}
		return $http[verb](url, this)
			.then(res => new Item(res.data))
	}

	Item.prototype.destroy = function() {
		return $http.delete(this.url)
	}

	return Item
})