var http = require("http");
var handler = require("./request-handler.js");
// var router = require("./router.js");  //todo make router

var requestListener = function (req, res) {
	console.log("Serving request type " + req.method + " for url " + req.url);
	handler.handleRequest(req, res);
};

var port = 8000;
var ip = "127.0.0.1";

var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);