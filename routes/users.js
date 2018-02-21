const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const User = require('../models/user');
const Offer = require('../models/offer');

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
  console.log(userInterests);
  const offers = [];
  Offer.find({ category: { $in: userInterests } })
    .populate('_ong', 'name')
    // <span><%= offer._ong.name %></span> el populate no funciona
    .then((offers) => {
      res.render('user/opportunities', { offers });
    })
    .catch((err) => {
      next(err);
    });
  console.log(offers);

});

module.exports = router;

