var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
// var User = Promise.promisifyAll(mongoose.model('User'));
// var Item = Promise.promisifyAll(mongoose.model('Item'));
var Order = Promise.promisifyAll(mongoose.model('Order'));



// var seedOrder = function(){
//     var orders = [
//         userId:
//             '55b65bda8390fed919ab0c48'
//         }
//     ]
// }
