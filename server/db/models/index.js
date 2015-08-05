// Require our models -- these should register the model into mongoose
// so the rest of the application can simply call mongoose.model('User')
// anywhere the User model needs to be used.
require('./reviews/reviews')
require('./items/item')
require('./order/order')
require('./promo/promo')
require('./users/user')
