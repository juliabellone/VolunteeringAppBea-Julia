const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/offers_pics' });

const Ong = require('../models/ong');
const Offer = require('../models/offer');

const ensureLogin = require('connect-ensure-login');



router.get('/profile', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  const ongId = req.user.id;
  Ong.findById(ongId)
    .then((ong) => {
      res.render('ong/profile', { ong, layout: 'layouts/ongLayout' });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/newoffer', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  res.render('ong/newoffer', {layout: 'layouts/ongLayout' });
});



router.post('/newoffer', ensureLogin.ensureLoggedIn(), upload.single('offerpic'), (req, res, next) => {
  const ongId = req.user.id;
  const { title, category, about, when, where, requirements } = req.body;  
  Ong.findById(ongId, function(err, ong){
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
      newOffer.save((err) => {
        if (err) {
          res.render('ong/newoffer', { message: req.flash('alert', 'Something went wrong') });
        } else {
          res.redirect('/ong/profile');
        }
      });
    } else {
      req.flash('info', 'You are not an NGO')
      res.redirect('/ong/newoffer');  
    }
  });
});

module.exports = router;