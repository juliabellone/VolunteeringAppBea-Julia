const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the model that we will use for login
const User = require('../models/user');
const Ong = require('../models/ong');



function configurePassport() {
  // What we save in session
  passport.serializeUser((user, cb) => {
    cb(null, { id: user._id, role: user.collection.collectionName } );
  });
  // Get what we got from session
  passport.deserializeUser((user, cb) => {
    if (user.role === 'users') {
      User.findOne({ '_id': user.id }, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
      });
    } else {
      Ong.findOne({ '_id': user.id }, (err, user) => {
        if (err) { return cb(err); }
        cb(null, user);
      });
    }
  });

  const localStrategyUser = new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect username or password' });
      }

      return next(null, user);
    });
  });

  passport.use('local', localStrategyUser);

  const localStrategyOng = new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Ong.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect username or password' });
      }

      return next(null, user);
    });
  });

  passport.use('local1', localStrategyOng)
}

module.exports = configurePassport;