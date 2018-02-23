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
  User.findById(userId)
    .then((user) => {
      res.render('user/profile', { user });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/opportunities', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const userInterests = req.user.interests;
  Offer.find({ category: { $in: userInterests } }).populate('_ong', 'name').exec(function (err, offers) {
    if (err) { return next(err) }
    res.render('user/opportunities', { offers })
    console.log(offers);
    });
});


module.exports = router;

