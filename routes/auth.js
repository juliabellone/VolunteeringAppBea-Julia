const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');


// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  if (username === '' || password === '') {
    //   req.flash('Flash is back');
    req.flash('info', 'Indicate username and password')
    res.redirect('/signup');
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      req.flash('info', 'The username already exists')
      res.redirect('/signup');  
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', { message: req.flash('alert', 'Something went wrong') });
      } else {
        res.redirect('/');
      }
    });
  });
// dar de alta un usuario en la base de datos. Reenviar a /profile/:username/modify
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: ('/profile'),
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));
//no se ven los menssajes

// coomprabr que el user existe y el pass es correcto, reenviar a su /offers

router.get('/logout', (req, res, next) => {
// eliminar sesion y enviar a '/'
  req.logout();
  res.redirect('/login');
});


module.exports = router;
