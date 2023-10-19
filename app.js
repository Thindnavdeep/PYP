var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/db');
const cors = require("cors");
const session = require('express-session');

var indexRouter = require('./routes/index');
var deptRouter = require('./routes/department');
var CSERouter = require('./routes/CSE');
var MECHRouter = require('./routes/MECH');
var CIVILRouter = require('./routes/CIVIL');
var ECERouter = require('./routes/ECE');
var UploadRouter = require('./routes/fileupload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(
  session({
  secret: 'abcd44',
  resave: false,
  saveUninitialized: true,
}));


app.use('/', indexRouter);
app.use('/', deptRouter);
app.use('/', CSERouter);
app.use('/', CIVILRouter);
app.use('/', ECERouter);
app.use('/', MECHRouter);
app.use('/', UploadRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
