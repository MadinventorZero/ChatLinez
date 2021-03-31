const express = require('express');
const path = require('path');

const router = express.Router();

// Initial Data Request Route Handler
router.get('/', (req, res) => {
  return res.status(200).send('Congratulations You made it to this point!!!!')
})

module.exports = router;