const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/profile_pics' });

// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  req.logout();
  res.render('userauth/signup', { layout: 'layouts/homeLayout' });
});

router.post('/signup', upload.single('profilepic'), (req, res, next) => {
  // recoger mas datos
  const { username, password, name, surname, telephone, email, birthdate, street, city, state, zip, interests, availability } = req.body;
  console.log(req.body);
  // comprobar que los campos obligatorios no esten vacios
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
    // introducir datos en la bd
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    // modificar con mas datos
    const newUser = new User({
      username,
      password: hashPass,
      name,
      surname,
      email,
      telephone,
      birthdate,
      picture: {
        pic_path: `/uploads/profile_pics/${req.file.filename}`,
        pic_name: `${req.file.originalname}`,
      },
      address: {
        street,
        city,
        state,
        zip,
      },
      interests,
      availability,
      role: 'user',
    });

    newUser.save((err) => {
      if (err) {
        res.render('userauth/signup', { message: req.flash('alert', 'Something went wrong') });
      } else {
        // reenviar a login
        res.redirect('/login');
      }
    });
  });
// // dar de alta un usuario en la base de datos. Reenviar a /profile/:username/modify
});

router.post('/login', passport.authenticate('local', {
  successRedirect: ('/opportunities'),
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

// router.get('/preferences', (req, res, next) => {
//   res.render('userauth/preferences');
// });

// router.post('/preferences', (req, res, next) => {
//   const user = req.query.id;
//   console.log(user);
//   //res.redirect('/profile');
// });



module.exports = router;
