const express = require('express');
const router = express.Router();

router.get('/signup', (req, res, next) => {
  res.render('ong/signup');
});

router.post('/signup', (req, res, next) => {
  console.log('hola'+req.body);
  res.redirect('index');
});
  
module.exports = router;

// router.post('/signup', (req, res, next) => {
//   console.log(req.body);
//   const username = req.body.username;
//   const password = req.body.password;
//   if (username === '' || password === '') {
//     //   req.flash('Flash is back');
//     req.flash('info', 'Indicate username and password')
//     res.redirect('/signup');
//     return;
//   }

//   User.findOne({ username }, 'username', (err, user) => {
//     if (user !== null) {
//       req.flash('info', 'The username already exists')
//       res.redirect('/signup');  
//       return;
//     }

//     const salt = bcrypt.genSaltSync(bcryptSalt);
//     const hashPass = bcrypt.hashSync(password, salt);

//     const newUser = new User({
//       username,
//       password: hashPass,
//     });

//     newUser.save((err) => {
//       if (err) {
//         res.render('auth/signup', { message: req.flash('alert', 'Something went wrong') });
//       } else {
//         res.redirect('/preferences');
//       }
//     });
//   });
// // dar de alta un usuario en la base de datos. Reenviar a /profile/:username/modify
// });