//http://localhost:3000/sleep?sleep=1000&type=gif&expires=1&last=-1&redir=0

var express = require('express');
var app = require('../app');
var router = express.Router();
//var appRoot = require('./lib/app-root-path');

function sendGif(res, params) {
	var options = {
		root: app.get('appRoot') + '/public/images/',
		dotfiles: 'deny',
		headers: {
			'Content-Type': 'image/gif',
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	setTimeout(function() {

		//res.sendFile('1.gif', options, function (err) {
		res.sendFile('1.gif', options, function (err) {
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
	var options = {
		root: app.get('appRoot') + '/public/javascripts/',
		dotfiles: 'deny',
		headers: {
			//'Content-Type': 'image/gif',
		    'x-timestamp': Date.now(),
		    'x-sent': true
		}
	};

	setTimeout(function() {
		res.sendFile('1.js', options, function (err) {
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
