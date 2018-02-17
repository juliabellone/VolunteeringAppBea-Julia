const express = require('express');
const router = express.Router();

const Ong = require('../models/ong');


router.get('/profile', (req, res, next) => {
  const userId = req.user.id;
  Ong.findById(userId)
    .then((user) => {
      res.render('ong/profile', { username: user.username, layout: 'layouts/ongLayout' });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;