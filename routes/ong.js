const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/offers_pics' });

const Ong = require('../models/ong');
const Offer = require('../models/offer');
const User = require('../models/user');


const ensureLogin = require('connect-ensure-login');


// NEW
router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const ongId = req.user.id;
  Ong.findById(ongId).populate('_offersPublished').exec((err, ong) => {
    if (err) { return next(err); }
    res.render('ong/profile', { ong, layout: 'layouts/ongLayout' });
  });
});


// Private ONG New offer GET
router.get('/newoffer', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('ong/newoffer', { layout: 'layouts/ongLayout' });
});


// Private ONG New offer POST
router.post('/newoffer', ensureLogin.ensureLoggedIn(), upload.single('offerpic'), (req, res, next) => {
  const ongId = req.user.id;
  const { title, category, about, when, where, requirements } = req.body;
  Ong.findById(ongId, (err, ong) => {
    if (ong !== null) {
      //guardar la oferta
      const newOffer = new Offer({
        _ong: ongId,
        picture: {
          pic_path: `../uploads/offers_pics/${req.file.filename}`,
          pic_name: `${req.file.originalname}.jpg`,
        },
        title,
        category,
        about,
        when,
        where,
        requirements,
      });
      newOffer.save((err, offer) => {
        if (err) {
          res.render('ong/newoffer', { message: req.flash('alert', 'Something went wrong') });
        } else {
          ong._offersPublished.push(offer._id);
          ong.save((err) => {
            if (err) {
              next(err);
            } else {
              res.redirect('/ong/profile');
            }
          });
        }
      });
    } else {
      req.flash('info', 'You are not an NGO');
      res.redirect('/ong/newoffer');
    }
  });
});

// Public ONG profile page
router.get('/:ongId', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const ongId = req.params.ongId;
  const role = req.user.role;

  Ong.findById(ongId).populate('_offersPublished').exec((err, ong) => {
    if (err) { return next(err); }
    if (role == 'user') {
      res.render('ong/ong', { ong });
    }
    if (role == 'ong') {
      if (ong._id == req.user.id) {
        res.redirect('/ong/profile');
        return;
      }
      res.render('ong/ong', { ong, layout: 'layouts/ongLayout' });
    }
  });
});

module.exports = router;

// router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
//   const ongId = req.user.id;
//   Ong.findById(ongId).populate('_offersPublished').exec((err, ong) => {
//     console.log(ong._offersPublished[0].title);
//     if (err) { return next(err); }
//     res.render('ong/profile', { ong, layout: 'layouts/ongLayout' });
//   });
// });