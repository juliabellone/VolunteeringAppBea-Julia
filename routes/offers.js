
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');



const User = require('../models/user');
const Offer = require('../models/offer');
const Ong = require('../models/ong');

const ensureLogin = require('connect-ensure-login');

/* GET offers page */

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
      
// router.get('/:offerId/edit',ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   const offerId = req.params.offerId;
//   if (offer._ong._id == userId) {
//     Offer.findById(offerId).exec(function (err, offer) {
//       if (err) {
//         return next(err); 
//       } else {
//         res.render('offers/edit', {offer})   
//       }
//     }

//   } else {
//     res.redirect('/:offerId')
//   }
// });  

router.get('/:offerId/edit',ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const offerId = req.params.offerId;
  const userId = req.user.id;

    Offer.findById(offerId).populate('_ong').exec(function (err, offer) {
      if (err) {return next(err)}; 
      if (offer._ong._id == userId) {
        res.render('offers/edit', {offer})
        } else {
        res.redirect('/:offerId')
        }   
    });
});  

router.post('/:offerId/delete',ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const offerId = req.params.offerId;
  const userId = req.user.id;
  console.log('dentro');

    Offer.findById(offerId).populate('_ong').exec(function (err, offer) {
      if (err) {return next(err)}; 
      if (offer._ong._id == userId) {
        console.log('hola')
        offer.remove();
        res.redirect('/ong/profile')
        } else {
          res.redirect('/:offerId')  
        }   
    });
}); 

router.get('/:offerId',ensureLogin.ensureLoggedIn(), (req, res, next) => {

  const userId = req.user.id;
  const offerId = req.params.offerId;
  let userStatus = false;
  let ongOwner = false;
  role = req.user.role;
  console.log(`rol: ${role}, userid, ${userId}`)

  Offer.findById(offerId).populate('_ong', 'name').exec(function (err, offer) {
    if (err) { return next(err); }
    else {
      let myDate = moment(offer.when).format("MMMM Do YYYY, h:mm a");
      User.find({ _offersRegistered: offerId }).exec(function (err, usersSubscribed) {
        if (err) { return next(err) }
        else {
          if (role == 'user') {
            for(i=0; i < req.user._offersRegistered.length; i++) {
              if(req.user._offersRegistered[i] == offerId) {
                userStatus = true;
              }
            }
            res.render('offers/offer_public', { myDate, offer, role, userStatus, ongOwner, usersSubscribed });
            return;
          }  
          if (role == 'ong') {
            if (offer._ong._id == userId) {
              ongOwner = true;
            }

            res.render('offers/offer_public', { myDate, offer, role, userStatus, ongOwner, usersSubscribed, layout: 'layouts/ongLayout' });
            console.log(usersSubscribed)
            return;
          }
        }
      });    
    }  
  })
});
      
module.exports = router;
