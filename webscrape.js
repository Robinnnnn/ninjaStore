var request = require('request-promise');
var cheerio = require('cheerio');
var Promise = require('bluebird');

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

// var urlPrac = 'http://allninjagear.com/'+ categories[0] +'#/pageSize=20&viewMode=list&orderBy=0&pageNumber=1';

/*var links = [];
var linksFollow = [];*/


var newLinks = {};
var newLinksToFollow = {};


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
/*	console.log('links', newLinks);
	console.log('linkstoFollow', newLinksToFollow);*/
	var productLinksDone = [];

	for(var key in newLinksToFollow){
		console.log(key, newLinksToFollow[key]);
		var arr = newLinksToFollow[key].map(function (link){
			console.log("url(link): ", url(link));
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
	console.log(newLinks);
}).catch(console.log.bind(console));




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










// request(urlPrac)
// 	.then(function(response){
// 		// console.log("loading the response", response);
// 		$ = cheerio.load(response);
// 		return $;
// 	})
// 	.then(function($){
// 		$('.product-item').children('.picture').each(function(i, elem){
// 			// console.log('element:', $(this).children('a').attr('href'));
// 			links.push($(this).children('a').attr('href'));
// 		});

// 		console.log($('.pager').children('ul').html())
// 		$('.individual-page').each(function(i, elem){
// 			console.log("in here");
// 			linksFollow.push($(this).children('a').attr('href'));
// 		});
// 		// console.log($('.product-item').children());
// 		console.log('links:', links);
// 		console.log('linkstofollow:', linksFollow);
// 	})
// 	.catch(console.error);