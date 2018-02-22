const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');


/* GET users listing. */
// router.get('/:username', (req, res, next) => {
//   res.send('home page of a user');
// });

router.get('/profile', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      res.render('user/profile', { user });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/opportunities', (req, res, next) => {
  const userInterests = req.user.interests;
  Offer.find({ category: { $in: userInterests } })
    //.populate('_ong')
    .exec(function(err, offers) {
      if (err) { return next(err) }
      res.render('user/opportunities', { offers })
      console.log(offers[0]);
    });
});


module.exports = router;

