const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const User = require('../models/user');

/* GET users listing. */
// router.get('/:username', (req, res, next) => {
//   res.send('home page of a user');
// });

router.get('/profile', (req, res, next) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      res.render('user/profile', { username: user.username });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;

