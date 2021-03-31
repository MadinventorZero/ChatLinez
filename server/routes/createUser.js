const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

// Initial Data Request Route Handler
router.post('/', userController.createUser, (req, res) => {
  console.log('Congratulations You made it to this point!!!!');
  return res.status(200).json('Congratulations You made it to this point!!!!')
})

module.exports = router;