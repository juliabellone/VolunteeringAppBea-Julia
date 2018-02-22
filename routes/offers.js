const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');

/* GET offers page */

router.get('/:offerId', (req, res, next) => {
  const offerId  = req.params.offerId;
  // If offer id es un id valido...
  Offer.findById(offerId, (err, offer) => {
    console.log('hola');
    console.log(offer);

    if (err) { return next(err); }
    res.render('offers/offer', { offer });
  });
});


module.exports = router;