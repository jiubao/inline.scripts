
//var express = module.exports = require('express');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var appRoot = require('app-root-path');

var app = module.exports = express();

//var routes = require(appRoot + '/routes/index.js');
var routes = require('./routes/index');
var users = require('./routes/users');
var inlines = require('./routes/inline');
var block = require('./routes/block');
var order = require('./routes/order');
var sleep = require('./routes/sleep');
var lazy = require('./routes/lazy');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('appRoot', __dirname); //console.log(app.get('appRoot'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/sleep', sleep);
app.use('/inline', inlines);
app.use('/block', block);
app.use('/order', order);
app.use('/users', users);
app.use('/lazy', lazy);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;
