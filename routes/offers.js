const express = require('express');
const router = express.Router();

/* GET offers listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource for offers');
});

router.get('/:offerid', (req, res, next) => {
  res.send('respond with offerid resource');
});

router.post('/:offerid', (req, res, next) => {
  res.send('respond with offerid resource2');
});

module.exports = router;