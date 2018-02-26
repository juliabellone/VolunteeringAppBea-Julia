const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');

const ensureLogin = require('connect-ensure-login');

/* GET offers page */



//if (offerId instanceof mongoose.Types.ObjectId)  --> no funciona ????

// // user subscribes to an offer
router.post('/:offerId/subscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log('offersubscribe peticion')
  const offerId = req.params.offerId;
  const userId = req.user.id;
  //agrega usuario al array de la oferta
  Offer.findById((offerId), (err, offer) => {
    if (err) {
      next(err);
    } else {
      offer._usersRegistered.push(userId);
      offer.save( (err) => {
        if (err) {
          next(err);
        } else {
          User.findById((userId), (err, user) => {
            if (err) {
              next(err);
            } else {
              user._offersRegistered.push(offerId);
              user.save( (err) => {
                if (err) { next(err); }
              });
            }
          });
        }
      }); 
    }
  });
});
//agrega oferta al array del usuario

// User.findOneAndUpdate( {_id: userId }, { $push: { _offersRegistered: offerId } }, (err, doc) => {
  //   if (err) { return next(err); console.log(err) }
  //   console.log(doc)
  //  })
  // // User.findOneAndUpdate({_id: userId }, { $push: { offerId } }, (err, next) => {
    // //   if (err) { return next(err); }
  // // })
  
  
  
  // user Usubscribes to an offer
  // router.post('/:offerId/unsubscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
    //   console.log('offer unsubscribe peticion')
    //   const offerId = req.params.offerId;
    //   const userId = req.user.id;
    //   User.findOneAndUpdate({_id: userId}, { $pullAll: {_offersRegistered: [offerId] } }, (err, next) => {
      //     if (err) {return next(err)}
      //     res.redirect('/:offerId');
      //   });
      // });
      
router.get('/:offerId',ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const userId = req.user.id;
  const offerId = req.params.offerId;
  let userStatus = false;
  let ongOwner = false;
  role = req.user.role;

  Offer.findById(offerId, (err, offer) => {
    console.log(req.user.role)
    if (err) { return next(err); }
    if (role == 'user') {
      for(i=0; i<offer._usersRegistered.length; i++) {
        if(offer._usersRegistered[i] == userId) {
          userStatus = true;
        }
      }
      res.render('offers/offer', { offer, role, userStatus, ongOwner });
      return;
    }  
    if (role == 'ong') {
      if (offer._ong == userId) {
        ongOwner = true;
      }
      res.render('offers/offer', { offer, role, userStatus, ongOwner, layout: 'layouts/ongLayout' });
      return;
    }
  }); 
});
      
module.exports = router;