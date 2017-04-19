var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var mysql = require('mysql');
var myConnection = require('express-myconnection');

var home = require('./routes/home');
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var search_result = require('./routes/search_result');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  // sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// mysql db middleware
// mysql://b79cde1de40a72:2c000eb5@us-cdbr-iron-east-03.cleardb.net/heroku_16d34676adbb711?reconnect=true
app.use(myConnection(mysql, {
  host: 'us-cdbr-iron-east-03.cleardb.net',
  user: 'b79cde1de40a72',
  password: '2c000eb5',
  database: 'heroku_16d34676adbb711',
  port: '3306'
}, 'single'));

app.use('/', index);
app.use('/home', home);
app.use('/login', login);
app.use('/register', register);
app.use('/search', search_result);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
