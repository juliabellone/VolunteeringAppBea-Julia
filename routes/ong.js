const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');


const Ong = require('../models/ong');
const Offer = require('../models/offer');

router.get('/profile', (req, res, next) => {
  const userId = req.user.id;
  Ong.findById(userId)
    .then((ong) => {
      res.render('ong/profile', { ong, layout: 'layouts/ongLayout' });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/newoffer', (req, res, next) => {
  const ongId = req.user.id;
  Ong.findById(ongId, (err, ong) => {
    if (err) { return next(err); }
    res.render('ong/newoffer', { username: user.username, layout: 'layouts/offerLayout' });
  });
  res.render('');
});

// redirect to the form for create a new offer
router.post('/profile', (req, res, next) => {
  console.log(req.body);
  const { title, category, about, when, where, requirements } = req.body;
  // introducir datos en la BD
  const newOffer = new Offer({
    title,
    category,
    about,
    when,
    where,
    requirements,
  });

  newOffer.save((err) => {
    if (err) {
      res.render('ong/newoffer', { message: req.flash('alert', 'Something went wrong') });
    } else {
      res.redirect('/ong/profile');
    }
  });
});

// redirect to a single offer

// router.post('/profile', (req, res, next) => {
//   console.log(req.body);
//   const { title, category, about, when, where, requirements } = req.body;
//   // introducir datos en la BD
//   const newOffer = new Offer({
//     title,
//     category,
//     about,
//     when,
//     where,
//     requirements,
//   });

//   newOffer.save((err) => {
//     if (err) {
//       res.render('ong/newoffer', { message: req.flash('alert', 'Something went wrong') });
//     } else {
//       res.redirect('/ong/profile');
//     }
//   });
// });

module.exports = router;