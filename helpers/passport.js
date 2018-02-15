const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the model that we will use for login
const User = require('../models/user');

function configurePassport() {
  // What we save in session
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  // Get what we got from session
  passport.deserializeUser((id, cb) => {
    User.findOne({ '_id': id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  // Strategy that we follow locally
  passport.use(new LocalStrategy({
    passReqToCallback: true
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
  }));
}

module.exports = configurePassport;