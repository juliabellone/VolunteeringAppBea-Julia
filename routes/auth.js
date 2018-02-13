var express = require('express');
var router = express.Router();

router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
    console.log(req.body);
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
