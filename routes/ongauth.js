const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');


const Ong = require('../models/ong');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('ongauth/signup');
});


router.post('/signup', (req, res, next) => {
  // datos
  console.log(req.body)
  const { username, password, birthdate, name, telephone, category, street, city, state, zip } = req.body;

  // comprobar que los campos obligatorios no esten vacios
  if (username === '' || password === '') {
    req.flash('info', 'Indicate username and password')
    res.redirect('/ong/signup');
    return;
  }
  // comprobar que no exista el username
  Ong.findOne({ username }, 'username', (err, ong) => {
    if (ong !== null) {
      req.flash('info', 'The username already exists')
      res.redirect('/ong/signup');  
      return;
    }  
    // introducir datos en la bd
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newOng = new Ong({
      username,
      password: hashPass,
      birthdate,
      name,
      telephone,
      category,
      street,
      city,
      state,
      zip,
    });

    newOng.save((err) => {
      if (err) {
        res.render('ongauth/signup', { message: req.flash('alert', 'Something went wrong') });
      } else {
        res.redirect('/');
      }
    }); 
  });
});

router.post('/login', passport.authenticate('local1', {
  successRedirect: ('/ong/profile'),
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

module.exports = router;

// router.post('/signup', (req, res, next) => {
//   console.log(req.body);
//   const username = req.body.username;
//   const password = req.body.password;
//   if (username === '' || password === '') {
//     //   req.flash('Flash is back');
//     req.flash('info', 'Indicate username and password')
//     res.redirect('/signup');
//     return;
//   }

//   User.findOne({ username }, 'username', (err, user) => {
//     if (user !== null) {
//       req.flash('info', 'The username already exists')
//       res.redirect('/signup');  
//       return;
//   }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       password: hashPass,
//     });

//     newUser.save((err) => {
//       if (err) {
//         res.render('auth/signup', { message: req.flash('alert', 'Something went wrong') });
//       } else {
//         res.redirect('/preferences');
//       }
//     });
//   });
// // dar de alta un usuario en la base de datos. Reenviar a /profile/:username/modify
// });