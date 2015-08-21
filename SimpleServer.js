// var http = require('http');
// var fs = require('fs');
// http.createServer(function (req, res) 
// 	{
// 	  	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	  	fs.readFile('C:/Users/John/Desktop/nodeJS/JavaScript Challenges/index.html', function (err, data){
// 			if (err) throw err;
// 			console.log(data);
// 		});

// 	}).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337/');
// console.log('Server running');

var port = 3100;
var serverURL = "127.0.0.1";

var http = require("http");
var path = require("path");
var fs = require("fs");

http.createServer(function(req, res){
	var now = new Date();
	var filename = "\\index.html";
	var ext = path.extname(filename);
	var localPath = __dirname;

	var validExtensions = 
	{
		".html" : "text/html",			
		".js": "application/javascript", 
		".css": "text/css",
	}

	var isValidExt = validExtensions[ext];

	if (isValidExt)
	{
		localPath += filename;
		fs.exists(localPath, function(exists) 
		{
			if(exists) {
				console.log("server giving file : " + localPath);
				getFile(localPath, res, ext);
			} else {
				console.log("File path not found, path: " + localPath);
				res.writehead(404);
				res.end();
			}

		});
	} else 
	{
		console.log("Extension Invalid: " + ext);
	}

}).listen(port, serverURL);
                 
function getFile(localPath, res, mimeType)                     //callback example
{
	fs.readFile(localPath, function(err, contents)
	{
		if(!err)
		{	
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;                              //ok code
			res.end(contents);
		} else {
			res.writeHead(500);                                //server side error code
			res.end();
		}

	});
}