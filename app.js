var compression = require('compression');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
var contact = require('./routes/contact');
var infos = require('./routes/infos');
var payment_succes = require('./routes/payment_succes');
var payment_cancelled = require('./routes/payment_cancelled');
var tuto = require('./routes/tuto');
var plan = require('./routes/plan');


var app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard dog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', routes);
app.use('/users', users);
app.use('/About', about);
app.use('/Contact', contact);
app.use('/infos', infos);
app.use('/payment_succes', payment_succes);
app.use('/payment_cancelled', payment_cancelled);
app.use('/tuto', tuto);
app.use('/plan', plan);

app.get('/101', function (req, res) {res.render("101")})
app.get('/102', function (req, res) {res.render("102")})
app.get('/201', function (req, res) {res.render("201")})
app.get('/202', function (req, res) {res.render("202")})
app.get('/301', function (req, res) {res.render("301")})
app.get('/401', function (req, res) {res.render("401")})

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

module.exports = app;
