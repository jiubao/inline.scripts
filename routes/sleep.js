//http://localhost:3000/sleep?sleep=1000&type=gif&expires=1&last=-1&redir=0

var express = require('express');
var app = require('../app');
var router = express.Router();
//var appRoot = require('./lib/app-root-path');

function getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
}

function sendGif(res, params) {
	var options = {
		root: app.get('appRoot') + '/public/images/',
		dotfiles: 'deny',
		headers: {
			//'Content-Type': 'image/gif',
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	var pngs = ['r1.png','g1.png','b1.png','y1.png','p1.png','c1.png'];

	setTimeout(function() {

		//res.sendFile('1.gif', options, function (err) {
		var i = getRandomInt(0, 5);
		res.sendFile(pngs[i], options, function (err) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			}
			else {
				console.log('Sent:', '1.gif');
			}
		});

	}, params.sleep);
	//}, parseInt(params.sleep, 10));

}

function sendJs(res, params) {
	setTimeout(function(){
		var js = ";console.log('dummy js executed');";
		if (params.run !== "0") {
			var js = ";!function (ms) { ms += new Date().getTime(); while(new Date() < ms) {} console.log('dummy script executed : " + params.run + " ms'); }(" + params.run + ");";
		}
		res.set('content-type', 'application/javascript');
		res.send(js);
	}, params.sleep);
}

function sendJs1(res, params) {
	res.set('content-type', 'application/javascript');

	var js = ";!function (ms) { ms += new Date().getTime(); while(new Date() < ms) {} console.log('executed for 1 ms'); }(1000);";

	res.send(js);
}

function sendJs0(res, params) {
	var options = {
		root: app.get('appRoot') + '/public/javascripts/',
		dotfiles: 'deny',
		headers: {
			//'Content-Type': 'image/gif',
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	var js = params.run === "1" ? '1s.js' : '1.js';

	setTimeout(function() {
		res.sendFile(js, options, function (err) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			}
			else {
				console.log('Sent:', '1.js');
			}
		});
	}, params.sleep);

}


function sendCss(res, params) {
	var options = {
		root: app.get('appRoot') + '/public/stylesheets/',
		dotfiles: 'deny',
		headers: {
			//'Content-Type': 'image/gif',
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};


	setTimeout(function() {
		res.sendFile('1.css', options, function (err) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			}
			else {
				console.log('Sent:', '1.css');
			}
		});
	}, params.sleep);

}
var sleepType = {
	'gif': sendGif,
	'js': sendJs,
	'css': sendCss,
	'html': ''
}

/* GET home page. */
router.get('/', function(req, res) {
	//console.log(req);
	//console.log(req.query);

	sleepType[req.query['type']](res, req.query);

	// res.set({
	//   'Content-Type': 'image/gif'
	//   //'Content-Length': '123',
	//   //'ETag': '12345'
	// });

  	//res.send('respond with a resource');
});

module.exports = router;
