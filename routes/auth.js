const express = require('express');
const router = express.Router();


// User model
const User = require('../models/user');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    //   req.flash('info', 'Flash is back');
      res.render("auth/signup", { message: "Indicate username and password" });
      return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
        username,
        password: hashPass
    });

    newUser.save((err) => {
        if (err) {
            res.render("auth/signup", { message: "Something went wrong" });
        } else {
            res.redirect("/");
        }
    });
});
  //dar de alta un usuario en la base de datos. Reenviar a perfil(?)
});

router.get('/login', (req, res, next) => {
    res.render('auth/login');
});

// router.post('/login', (req, res, next) => {
//     //coomprabr que el user existe y el pass es correcto, reenviar a su 'home' de ofertas
// });

// router.get('/signout', (req, res, next) => {
//     //eliminar sesion y enviar a '/'
// });


module.exports = router;
