const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/offers_pics' });

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
  res.render('ong/newoffer', {layout: 'layouts/ongLayout' });
});

router.post('/newoffer', upload.single('offerpic'), (req, res, next) => {
  console.log(req.body);
  const ongId = req.user.id;
  console.log(ongId);
  const { title, category, about, when, where, requirements } = req.body;
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
});


module.exports = router;