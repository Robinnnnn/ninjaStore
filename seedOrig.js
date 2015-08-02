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
var Item = Promise.promisifyAll(mongoose.model('Item'));
var Order = Promise.promisifyAll(mongoose.model('Order'));
var Review = Promise.promisifyAll(mongoose.model('Review'));

var wipeDB = function () {

    var models = [User, Item, Order, Review];
    var promiseArr = [];
    models.forEach(function (model) {
        promiseArr.push(model.find({}).remove().exec());
    });

    return Promise.all(promiseArr);

};


var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password'
    }, {
        email: 'obama@gmail.com',
        password: 'potus',
        isAdmin: true
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
        price: 999,
        quantity: 20,
        photos: ["http://allninjagear.com/content/images/thumbs/0000256_flying-dragon-throwing-star_360.jpeg"],
        categories: ["Throwing Stars"]
    }, {
        name: "Triple Action Bat Throwing Stars Set of 3",
        description: {
            short: "Looks just like the real thing!",
            long: "This set includes three stainless steel bat-shaped knives.  Each black thrower measures 6 inches across and features touches of silver on the knife blades.  The throwers fit perfectly into a three-slot carrying case that was designed specifically to accommodate their unique shape."
        },
        price: 1599,
        quantity: 30,
        photos: ["http://allninjagear.com/content/images/thumbs/0000149_triple-action-bat-throwing-stars-set-of-3_360.jpeg"],
        categories: ["Throwing Stars"]
    }, {
        name: "Ninja's Deadliest Royal Flush Throwing Cards - Spades",
        description: {
            short: "Multi-functional: Play poker or fight ninjas",
            long: "Play poker ninja style!  Royal flush in Spades Thwoers (set of 5) with nylon sheath."
        },
        price: 1899,
        quantity: 50,
        photos: ["http://allninjagear.com/content/images/thumbs/0000253_ninjas-deadliest-royal-flush-throwing-cards-spades_360.jpeg"],
        categories: ["Throwing Stars"]
    }, {
        name: "Dragon's Pearl Wood Nunchucks",
        description: {
            short: "The flaming pearl of the dragon represents wealth, good luck, and prosperity.",
            long: "The flaming pearl of the dragon represents wealth, good luck, and prosperity."
        },
        price: 1599,
        quantity: 40,
        photos: ["http://allninjagear.com/content/images/thumbs/0002826_dragons-pearl-wood-nunchucks_360.jpeg"],
        categories: ["Nunchucks"]
    }, {
        name: "G-Force Swirl Chain Chucks Set",
        description: {
            short: "The real McCoy when it comes to competition nunchaku!",
            long: "Made of select light wood. Includes 2 pairs of nunchakus. 11.5\" long with 2.75\" 3 link ball bearing chain. Designed by weapons expert Joey Greenhalgh. Hand crafted in the USA."
        },
        price: 9999,
        quantity: 10,
        photos: ["http://allninjagear.com/content/images/thumbs/0002805_g-force-swirl-chain-chucks-set_360.jpeg"],
        categories: ["Nunchucks"]
    }, {
        name: "Red Guardian Ninja Sword",
        description: {
            short: "Sleek, dangerous, full-tang, and tactical! This sword comes in two distinct blade styles.",
            long: "This ninja sword is one solid piece of cold hard, stainless steel with a heat-treated black baked finish. The blade features fantasy cut outs, teeth like serrations, and a piercing point, and slides smoothly into the included nylon blade sheath. The red simulated leather wrapped handle adds a sure grip for easy maneuverability. If there is a sword that screams to be picked up, this one is it!"
        },
        price: 2299,
        quantity: 15,
        photos: ["http://allninjagear.com/content/images/thumbs/0001591_red-guardian-ninja-sword_360.jpeg"],
        categories: ["Swords"]
    }, {
        name: "Black Dragon Naginata",
        description: {
            short: "Due to its massive height, the naginata was the weapon of choice for battle against horseman and swords.",
            long: "Naginata is a Japanese martial art form that originated over 1,000 years ago. This piece stretches over 5 feet tall with a 21 1/4″ carbon steel blade. Includes custom blade cover with intricate dragon etching."
        },
        price: 7999,
        quantity: 5,
        photos: ["http://allninjagear.com/content/images/thumbs/0000136_black-dragon-naginata_360.jpeg"],
        categories: ["Swords"]
    }, {
        name: ".40 Caliber Broadhead Glow in the Dark Darts",
        description: {
            short: "Kill the wabbit! Kill the wabbit!",
            long: "Broadheads were used for war and are still used for hunting. Medieval broadheads could be made from steel, sometimes with hardened edges. These broadhead darts have two sharp blades that cause massive bleeding in the victim. Their function is to deliver a wide cutting edge so as to kill as quickly as possible."
        },
        price: 549,
        quantity: 7,
        photos: ["http://allninjagear.com/content/images/thumbs/0000287_40-caliber-broadhead-glow-in-the-dark-darts_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: ".40 Caliber Spike Darts",
        description: {
            short: "Short length .40 caliber darts",
            long: "Designed with stinger tips, these little puppies really pack a punch! Or, perhaps a pierce... Available in quantities of 25 or 100."
        },
        price: 499,
        quantity: 15,
        photos: ["http://allninjagear.com/content/images/thumbs/0000294_40-caliber-spike-darts_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: '12" Mini Ninja Stun Dart Blowgun',
        description: {
            short: "This blowgun may be small, but that just means it's more convenient!",
            long: "This Mini Ninja Cub Blowguns comes with blunt darts that won’t stick in anything but they pack a real punch. Very Popular! These blowguns are great for concerned parents that do not want their little ninja kids to have sharp needle darts. 12\" long. Comes only in black."
        },
        price: 799,
        quantity: 22,
        photos: ["http://allninjagear.com/content/images/thumbs/0000034_12-mini-ninja-stun-dart-blowgun_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: 'Foam Blowgun Target',
        description: {
            short: "Best target money can buy",
            long: "This square blowgun target is made from 2″ thick self-healing air foam. Target area is 12″ x 12″."
        },
        price: 1299,
        quantity: 12,
        photos: ["http://allninjagear.com/content/images/thumbs/0000311_foam-blowgun-target_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: 'Muzzle Guard with Peep Sight Glow in the Dark',
        description: {
            short: "Improve your accuracy at night with this sight",
            long: "Snipe out your target with a glow in the dark peep sight for the end of the blowgun."
        },
        price: 099,
        quantity: 100,
        photos: ["http://allninjagear.com/content/images/thumbs/0000313_muzzle-guard-with-peep-sight-glow-in-the-dark_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: 'Exploding Cap Darts',
        description: {
            short: "Add some pop to your blowgun",
            long: "Our cap darts are .40 caliber with a plastic body, and will fit in a standard stun dart quiver. Their tips are specially designed to hold a cap, which contains a small amount of gunpowder. When it impacts a target, the gunpowder explodes with a loud crack. In the hands of a stealthy warrior, these will provide a very effective distraction at a safe distance. This set includes 25 darts and 144 caps."
        },
        price: 599,
        quantity: 27,
        photos: ["http://allninjagear.com/content/images/thumbs/0000298_exploding-cap-darts_360.jpeg"],
        categories: ["Blowguns"]
    }, {
        name: 'Black Blow-Dart Ninja Sword',
        description: {
            short: "Sword with scabbard that doubles as a blowgun!",
            long: "All black ninja sword with blowgun attached to the scabbard.  40″ overall length."
        },
        price: 3799,
        quantity: 48,
        photos: ["http://allninjagear.com/content/images/thumbs/0000175_black-blow-dart-ninja-sword_360.jpeg"],
        categories: ["Blowguns", "Swords"]
    }, {
        name: "Black Ronin Triple Bolt Throwing Knives",
        description: {
            short: "Triple the excitement with this three-piece Black Ronin Triple Bolt throwing knife set.",
            long: "Each thrower is constructed of AUS-6 stainless steel. The 6 1/2\" throwers are great for everyday practice and really sail through the air. Includes nylon sheath to hold all three throwers."
        },
        price: 1599,
        quantity: 50,
        photos: ["http://allninjagear.com/content/images/thumbs/0000336_black-ronin-triple-bolt-throwing-knives.jpeg"],
        categories: ["Throwing Knives"]
    }, {
        name: "Bat Gear Gift Set",
        description: {
            short: "All the best Bat Gear in one tidy gift set! Includes bat throwers, throwing knives, and arm gauntlets.",
            long: "Triple Action Bat Throwing Stars Set of 3 - This set includes three stainless steel bat-shaped knives.  Each black thrower measures 6 inches across and features touches of silver on the knife blades.  The throwers fit perfectly into a three-slot carrying case that was designed specifically to accommodate their unique shape.\nDark Night Asylum Throwing Knife Set - With a unique design featuring bat-style wings that allow the knife to zip through the air, these dynamic throwing knives are sure to hit the spot. Approximately 7.5 inches long, each knife features a 3.5 inch double-edge blade that is very sharp and ends in a piercing, pin point tip. Very thick and sturdy and made from 440 stainless steel, a powder coated black finish strengthens the steel and gives the stars a notable look while also serving to prevent rust. Each blade offers a silver lining that makes for an attractive look while a distinctive batwing stamp on the blade lets you know exactly what this knife is made for! The package includes 3 individual knives plus a black nylon carrying sheath with individual compartments for each knife. 3 Knife set Overall Length: 7.5 Inches Blade Length: 3.5 Inches Blade Material: Stainless Steel, Black anodized finish, Silver edge Blade Thickness: 2.5mm Blade Width: 1 Inch Blade Type: Spear point, Double edge Handle Length: 4 Inches Handle Material: Steel Includes: 3 Compartment nylon sheath, Velcro enclosure, Belt loop, Lanyard holes, Batwing logo on blade.\nNinja Arm Gauntlets - This Ninja Arm Gauntlet comes as a set of 2 and features sharp stainless steel spikes. Gauntlets are constructed of faux leather and metal. Has adjustable elastic straps so 1 size fits all. 9.5 inches overall length. One of Batman's favorite offensive and defensive weapons on his batsuit."
        },
        price: 5999,
        quantity: 15,
        photos: ["http://allninjagear.com/content/images/thumbs/0002884_bat-gear-gift-set.jpeg"],
        categories: ["Throwing Knives", "Throwing Stars", "Accessories"]
    }];

    return Item.createAsync(items);
}

var review1 = {
    review: "Good items 123",
    rating:5
};

var review2 = {
    review: "It sucks so bad so bad",
    rating:1
}
connectToDb.then(function(){
    wipeDB()
})
.then(function() {
    User.findAsync({}).then(function(users) {
            if (users.length === 0) {
                return seedUsers();
            } else {
                console.log(chalk.magenta('Seems to already be user data, exiting!'));
                process.kill(0);
            }
        }).then(function() {
            return seedItems();
        }).then(function() {
            User.findAsync({})
                .then(function(users) {
                    // console.log('go here');
                    // console.log(users);
                    Item.findAsync({})
                        .then(function(items) {
                            // console.log(item);
                            return Order.createAsync({
                                userId: users[0]._id,
                                items: [{
                                    id: items[0]._id,
                                    price: items[0].price,
                                    quantity: items[0].quantity,

                                }, {
                                    id: items[1]._id,
                                    price: items[1].price,
                                    quantity: items[1].quantity,

                                }]

                            })
                        })
                })
        })
        .then(function() {
            return User.findAsync({})
                .then(function(user) {
                    review1.userId = user[0]._id;
                    review2.userId = user[1]._id;
                    return Item.findOneAsync({})
                })
                .then(function(item) {
                    review1.itemId = item._id;
                    review2.itemId = item._id;
                    return Review.createAsync(review1);
                })
        })
        .then(function(review){
            return Item.findOneAsync({_id:review.itemId})
                .then(function(item){
                    item.reviews.push(review._id);
                    return item.save();
                })
        })
        .then(function(){
            return Review.createAsync(review2);
        })
        .then(function(review){
            return Item.findOneAsync({_id:review.itemId})
                .then(function(item){
                    item.reviews.push(review._id);
                    return item.save();
                })
        })

        .then(function() {
            console.log(chalk.green('Seed successful!'));
            process.kill(0);
        }).catch(function(err) {
            console.error(err);
            process.kill(1);
        });
});
