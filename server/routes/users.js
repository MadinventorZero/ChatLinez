const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

// Route handler to create a new User
router.post('/createUser', userController.createUser, )

router.get('/verifyUser', userController.verifyUser, (req, res) => {
  return res.status(200).json({UserExists: res.locals.exists, UserVerified: res.locals.verified, Message: res.locals.message})
})

router.get('/getUserDetail', userController.verifyUser, userController.getUserDetail, (req, res) => {
  return res.status(200).json(res.locals.userDataDetail)
})

router.get('/updateUserPassword', (req, res) => {
  console.log('Congratulations You made it to this point - updateUser!!!!');
  return res.status(200).json('Congratulations You made it to this point!!!!')
})

router.get('/getAllUsers', userController.getAllUsers, (req, res) => {
  console.log('Congratulations You made it to this point - getAllUsers!!!!');
  return res.status(200).json(res.locals.userData)
})

module.exports = router;