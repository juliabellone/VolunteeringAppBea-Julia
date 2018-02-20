const express = require('express');
const router = express.Router();

/* GET offers listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource for offers');
  // res.render('respond with a resource for offers');
});


module.exports = router;