'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var User = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  addresses: [{
    address: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: Number
    },
    country: {
      type: String
    },
    phone: {
      type: String
    }
  }],
  password: {
    type: String
  },
  passwordReset: {
    type: Boolean,
    default: false
  },
  salt: {
    type: String
  },
  twitter: {
    id: String,
    username: String,
    token: String,
    tokenSecret: String
  },
  facebook: {
    id: String
  },
  google: {
    id: String
  },
  reviews: {
    type: Array,
    ref: 'Review',
    default: []
  },
  orders: {
    type: Array,
    ref: 'Order',
    default: []
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  paymentInformation: {
    type: Array,
    default: []
  },
  cart: {
    type: Object,
    default: {}
  }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function(plainText, salt) {
  var hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

User.pre('save', function(next) {

  if (this.isModified('password')) {
    this.salt = this.constructor.generateSalt();
    this.password = this.constructor.encryptPassword(this.password, this.salt);
  }

  next();

});

User.statics.generateSalt = generateSalt;
User.statics.encryptPassword = encryptPassword;

User.method('correctPassword', function(candidatePassword) {
  return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', User);