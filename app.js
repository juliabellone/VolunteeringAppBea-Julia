
require('dotenv').config();

const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const offers = require('./routes/offers');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const configurePassport = require('./helpers/passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
}, (err) => {
  if (!err) {
    console.log(`connected to ${process.env.MONGODB_URI}`);
  }
  console.error(`💣 ${err.name}: ${err.message}`);
  process.exit(-1);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view engine', 'ejs');

app.set('layout extractScripts', true); // see Documentation
app.set('layout extractStyles', true); // see Documentation
app.set('layout extractMetas', true); // see Documentation
app.set('layout', 'layouts/main'); // custom layout


const User = require('./models/user');
const Ong = require('./models/ong');
const Offer = require('./models/offer');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);

app.use(session({
  secret: 'volunteering',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

configurePassport();

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
})

app.use('/', index);
app.use('/user', users);
app.use('/', auth);
//app.use('/', offers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
}));


module.exports = app;
