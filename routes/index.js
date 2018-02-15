const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile/', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      res.render('profile', { username: user.username });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
