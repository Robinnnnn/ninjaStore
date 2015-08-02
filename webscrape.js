var request = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = require('fs');

var categories = [
'blowguns',
'ninja-stars',
'ninja-gear',
'nunchucks',
'swords',
'throwing-knives',
'throwing-axe',
'sai',
'other-ninja-weapons',
'books',
'ninja-gift-sets'
];

var url = function(category){
	if(category[0] === '/') return 'http://allninjagear.com' + category;
	else return 'http://allninjagear.com/'+ category +'#/pageSize=100&viewMode=list&orderBy=0&pageNumber=1';
};


var newLinks = {};
var newLinksToFollow = {};
var items = [];

var loadCategoryLinks = categories.map(function (category){
	return request(url(category)).then(function(response){
		var productLinks = [];
		var linksFollow = [];

		$ = cheerio.load(response);

		$('.product-item').children('.picture').each(function(i, elem){
			productLinks.push($(this).children('a').attr('href'));
		});

		newLinks[category] = productLinks;

		$('.individual-page').each(function(i, elem){
			linksFollow.push($(this).children('a').attr('href'));
		});

		newLinksToFollow[category] = linksFollow;
	});
});

Promise.all(loadCategoryLinks)
.then(function(){
	var productLinksDone = [];

	for(var key in newLinksToFollow){
		var arr = newLinksToFollow[key].map(function (link){
			return request(url(link)).then(function(key){ return function(response){
				var links = [];

				$ = cheerio.load(response);

				$('.product-item').children('.picture').each(function(i, elem){
					links.push($(this).children('a').attr('href'));
				});
				// console.log(links);
				newLinks[key] = newLinks[key].concat(links);
			}; }(key));
		});

		productLinksDone = productLinksDone.concat(arr);
	}

	console.log('On to the promises:');
	return Promise.all(productLinksDone)
}).then(function(){
	// console.log(newLinks);
	console.log('Links are done, going to products');
	var products = [];
	for(var key in newLinks){
		console.log("Categories:", key);
		var arr = newLinks[key].map(function (link){
			return request(url(link)).then(function(key){ return function(response){
				$ = cheerio.load(response);

				var item = {
					name: '',
					description: {
						short: '',
						long: ''
					},
					price: 0,
					quantity: 0,
					photos: [],
					categories: []
				};

				item.name = ($('.product-name').children('h1').text()).toString().replace(/\r\n/g, " ").trim();
				item.description.short = ($('.short-description').text()).toString().replace(/\r\n/g, " ").trim();
				var priceDescrip = ".price-val-for-dyn-upd-" + $('#product-ribbon-info').attr('data-productid');
				item.price = Math.floor(Number($(priceDescrip).text())*100);
				item.photos.push($('.gallery').children('.picture-wrapper').children('.picture').children('a').children('img').attr('src'));
				item.description.long = $('.full-description').children('p').text();
				item.quantity = Math.floor(Math.random()*50);
				item.categories.push(key);

				items.push(item);
			}; }(key));
		});

		products = products.concat(arr);

	}
	console.log("Going to the product promises now, this could take a while...");
	return Promise.all(products)
}).then(function(){
	console.log(items);

	//note you have to pass items in as a string, so this does not work!
	promisifiedWriteFile('~/Fullstack/ninjaStore/webScrapeData.txt', items)
    .then(function(){
        console.log("it worked");
    });

	function promisifiedWriteFile (filename, str){
	return new Promise(function (resolve, reject){
		fs.writeFile(filename, str, function (err){
			if(err) reject(err);
			else resolve(str);
		});
	});
}
})
.catch(console.log.bind(console));




/*var newLinks = {};
var newLinksToFollow = {};

var promisesArray = categories.map(function (category){
	console.log(category);
	return request(url(category))
			.then(function(response){
				var links = [];
				var linksFollow = [];

				$ = cheerio.load(response);

				$('.product-item').children('.picture').each(function(i, elem){
					links.push($(this).children('a').attr('href'));
				});

				newLinks[category] = links;

				$('.individual-page').each(function(i, elem){
					linksFollow.push($(this).children('a').attr('href'));
				});

				newLinksToFollow[category] = linksFollow;
			})
			.catch(console.error);
});

Promise.all(promisesArray)
.then(function(){
	console.log('links', newLinks);
	console.log('linkstoFollow', newLinksToFollow);
});*/








// var items = [];

// request('http://allninjagear.com/8-point-ninja-soft-foam-rubber-throwing-star')
// 	.then(function(response){
// 		// console.log("loading the response", response);
// 		$ = cheerio.load(response);
// 		return $;
// 	})
// 	.then(function($){
// 		var item = {
// 			name: '',
// 			description: {
// 				short: '',
// 				long: ''
// 			},
// 			price: 0,
// 			quantity: 0,
// 			photos: [],
// 			categories: []
// 		};
// 		item.name = ($('.product-name').children('h1').text()).toString().replace(/\r\n/g, " ").trim();
// 		item.description.short = ($('.short-description').text()).toString().replace(/\r\n/g, " ").trim();
// 		var priceDescrip = ".price-val-for-dyn-upd-" + $('#product-ribbon-info').attr('data-productid');
// 		item.price = $(priceDescrip).text();
// 		item.photos.push($('.gallery').children('.picture-wrapper').children('.picture').children('a').children('img').attr('src'));
// 		item.description.long = $('.full-description').children('p').text();
// 		item.quantity = Math.floor(Math.random()*50);

// 		// $('.product-item').children('.picture').each(function(i, elem){
// 		// 	// console.log('element:', $(this).children('a').attr('href'));
// 		// 	links.push($(this).children('a').attr('href'));
// 		// });

// 		// console.log($('.pager').children('ul').html())
// 		// $('.individual-page').each(function(i, elem){
// 		// 	console.log("in here");
// 		// 	linksFollow.push($(this).children('a').attr('href'));
// 		// });
// 		// // console.log($('.product-item').children());
// 		// console.log('links:', links);
// 		// console.log('linkstofollow:', linksFollow);
// 		console.log(item);
// 	})
// 	.catch(console.error);