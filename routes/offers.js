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
  User.findOneAndUpdate({ _id: userId }, { $push: { _offersRegistered: offerId } }, (err, next) => {
    if (err) { return next(err); }
  });
});

// User unsubscribes from an offer
router.post('/:offerId/unsubscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  console.log('offer unsubscribe peticion')
  const offerId = req.params.offerId;
  const userId = req.user.id; 
  User.findOneAndUpdate({ _id: userId }, { $pullAll: { _offersRegistered: [offerId] } }, (err, next) => {
      if (err) { return next(err); }
  });
});
  



// router.post('/:offerId/unsubscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   User.findOneAndUpdate( {_id: userId }, { $push: { _offersRegistered: offerId } }, (err, doc) => {
//     if (err) { return next(err); console.log(err) }
//     console.log(doc)
//    })
//   User.findOneAndUpdate({_id: userId }, { $push: { offerId } }, (err, next) => {
//       if (err) { return next(err); }
//   })
// }

//agrega oferta al array del usuario

// User.findOneAndUpdate( {_id: userId }, { $push: { _offersRegistered: offerId } }, (err, doc) => {
  //   if (err) { return next(err); console.log(err) }
  //   console.log(doc)
  //  })
  // // User.findOneAndUpdate({_id: userId }, { $push: { offerId } }, (err, next) => {
    // //   if (err) { return next(err); }
  // // })
  
  
  
  // // user Usubscribes to an offer
  // router.post('/:offerId/unsubscribe', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  //     console.log('offer unsubscribe peticion')
  //     const offerId = req.params.offerId;
  //     const userId = req.user.id;
  //     User.findOneAndUpdate({_id: userId}, { $pullAll: {_offersRegistered: [offerId] } }, (err, next) => {
  //         if (err) {return next(err)}
  //         res.redirect('/:offerId');
  //       });
  //     });
      
router.get('/:offerId',ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const userId = req.user.id;
  const offerId = req.params.offerId;
  let userStatus = false;
  let ongOwner = false;
  role = req.user.role;

  Offer.findById(offerId, (err, offer) => {
    console.log(req.user.role)
    if (err) { return next(err); }
    else {
      User.find({ _offersRegistered: offerId }).exec(function (err, usersSubscribed) {
        if (err) { return next(err) }
        else {
          if (role == 'user') {
            for(i=0; i < req.user._offersRegistered.length; i++) {
              if(req.user._offersRegistered[i] == offerId) {
                userStatus = true;
              }
            }
            res.render('offers/offer', { offer, role, userStatus, ongOwner, usersSubscribed });
            return;
          }  
          if (role == 'ong') {
            if (offer._ong == userId) {
              ongOwner = true;
            }
            res.render('offers/offer', { offer, role, userStatus, ongOwner, usersSubscribed, layout: 'layouts/ongLayout' });
            console.log(usersSubscribed)
            return;
          }
        }
      });    
    }  
  }); 
});
      
module.exports = router;
