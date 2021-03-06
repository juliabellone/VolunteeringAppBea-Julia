const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');

const ensureLogin = require('connect-ensure-login');


/* GET users listing. */
// router.get('/:username', (req, res, next) => {
//   res.send('home page of a user');
// });

router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = req.user.id;
  if (req.user.role == 'ong') {
    res.redirect('/ong/profile');
    return;
  }
  User.findById(userId).populate('_offersRegistered').exec(function(err, user) {
    if(err) {return next(err)};
    res.render('user/profile', { user });
  });
});

router.get('/profile/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = req.user.id;
  if (req.user.role == 'ong') {
    res.redirect('/ong/profile/edit');
    return;
  }
  User.findById(userId)
    .then((user) => {
      res.render('user/editprofile', { user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/profile/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {

//find one and update
//redirigir al perfil


});


router.get('/opportunities', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userInterests = req.user.interests;
  const offersRegistered = req.user._offersRegistered
  Offer.find({ category: { $in: userInterests}, _id: { $nin: offersRegistered } } ).populate('_ong').exec(function (err, offers) {
    if (err) { return next(err) }
    res.render('user/opportunities', { offers })
    console.log(offers);
    });
});


router.get('/:userId', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userId = req.params.userId;
  role = req.user.role;

  User.findById(userId, (err, user) => {
    if (err) return next(err);
    if (role == 'user') {
      res.render('user/user_public', { user, role });
      return;
    }
    if (role == 'ong') {
      res.render('user/user_public', { user, role, layout: 'layouts/ongLayout' })
    }
  });
});

module.exports = router;

