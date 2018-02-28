const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Volunteer app', layout: 'layouts/homeLayout'});
});

router.get('/login', (req, res, next) => {
  console.log('login-prueba')
  res.render('userauth/login', { layout: 'layouts/homeLayout' });
});

router.get('/logout', (req, res, next) => {
  // eliminar sesion y enviar a '/'
    req.logout();
    res.redirect('/login');
});


module.exports = router;
