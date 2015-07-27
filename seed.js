/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password'
    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    return User.createAsync(users);

};

var seedItems = function() {
    var items = [{
        name: "Flying Dragon Throwing Star",
        description: {
            short: "Razor sharp edges!",
            long: "Razor sharp edges and constructed from high quality AUS-6 steel. This throwing star features a dragon in which the wings are the silver lined blade edges. Includes pouch. Measures 3 3/4″ diameter."
        },
        price: 9.99,
        quantity: 20,
        photo: "http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg",
        categories: ["Throwing Stars"]
    }, {
        name: "Triple Action Bat Throwing Stars Set of 3",
        description: {
            short: "Looks just like the real thing!",
            long: "This set includes three stainless steel bat-shaped knives.  Each black thrower measures 6 inches across and features touches of silver on the knife blades.  The throwers fit perfectly into a three-slot carrying case that was designed specifically to accommodate their unique shape."
        },
        price: 15.99,
        quantity: 30,
        photo: "http://allninjagear.com/content/images/thumbs/0000149_triple-action-bat-throwing-stars-set-of-3_360.jpeg",
        categories: ["Throwing Stars"]
    }, {
        name: "Ninja's Deadliest Royal Flush Throwing Cards - Spades",
        description: {
            short: "Multi-functional: Play poker or fight ninjas",
            long: "Play poker ninja style!  Royal flush in Spades Thwoers (set of 5) with nylon sheath."
        },
        price: 18.99,
        quantity: 50,
        photo: "http://allninjagear.com/content/images/thumbs/0000253_ninjas-deadliest-royal-flush-throwing-cards-spades_360.jpeg",
        categories: ["Throwing Stars"]
    }]
}



connectToDb.then(function() {
    User.findAsync({}).then(function(users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function() {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function(err) {
        console.error(err);
        process.kill(1);
    });
});