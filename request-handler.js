var url = require("url");
var path = require("path");
var fs = require("fs");

var posts = [{
	id: 1,
	title: "Use hacks",
	author: "cheeseen",
	publishedAt: new Date('3-26-2013'),
	intro: "Sheeeeiiiit!",
	extended: "You just sit down and keep typing stuff until it works.  Use hacks!  [Sheeeeiiiit](http://www.youtube.com/watch?v=6ktvE2vfxSQ)"
}, {
	id: 2,
	title: "All N of my queens",
	author: "ruanp",
	publishedAt: new Date('4-03-2013'),
	intro: "What would you say if I said I could cut the search space and make it run 17 million times faster?",
	extended: "Would you be impressed?  And... what if I told you I could improve the speed by a factor of 1.4 *quintillion*?  Would you find that impressive?"
}];

var handleRequest = function(request, response) {
	var headers = {};
	headers['Content-Type'] = "application/json";

	switch (request.url) {
		case '/posts':
			if (request.method === "GET") {
				response.writeHead(200, headers);
				console.log(posts);
				response.end(JSON.stringify(posts));
			} else if (request.method === "POST") {
				response.writeHead(302, headers);
				response.end();
			} else { //http OPTIONS, etc...
				response.end();
			}
			break;
	}
	return response;
};

exports.handleRequest = handleRequest;
