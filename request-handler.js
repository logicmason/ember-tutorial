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

		default:
			response.writeHead(200, headers);
			var uri = url.parse(request.url).pathname;
			var filename = path.join(process.cwd(), '', unescape(uri));
			var stats;

			try {
				stats = fs.lstatSync(filename); //throws if no file
			} catch (e) {
				response.writeHead(404, {'Content-Type': 'text/plain'});
				response.end('404 these are not the files ur looking for.');
				return;
			}

			if (stats.isFile()) {
				var mimeType = "text/html";
				headers['Content-Type'] = mimeType;
				response.writeHead(200, headers);

				var fileStream = fs.ReadStream(filename);
				fileStream.pipe(response);
			} else if (stats.isDirectory()) {
				headers['Content-Type'] = "text";
				response.writeHead(200, headers);
				response.end(uri + ' is a directory.');
			} else {
				console.log('weird... not a file or a directory or a 404...');
				response.end();
			}

		}
		return response;
};

exports.handleRequest = handleRequest;
