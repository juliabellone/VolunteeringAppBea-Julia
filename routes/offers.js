const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');

const ensureLogin = require('connect-ensure-login');

/* GET offers page */

router.get('/:offerId', (req, res, next) => {
  const offerId = req.params.offerId;
  // If offer id es un id valido...
  Offer.findById(offerId, (err, offer) => {
    if (err) { return next(err); }
    res.render('offers/offer', { offer });
  });
});


//if (offerId instanceof mongoose.Types.ObjectId)  --> no funciona ????

// // user subscribes to an offer
router.post('/:offerId/subscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log('offersubscribe')
  const offerId = req.params.offerId;
  const userId = req.user.id;

  User.findOneAndUpdate({_id: userId }, { $push: { offerId } }, (err, next) => {
    if (err) { return next(err); }
  })

});

module.exports = router;