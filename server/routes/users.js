const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

// Route handler to create a new User
router.post('/createUser', userController.createUser, (req, res) => {
  return res.status(200).json("Congratulations and welcome to ChatLinez")
})

router.get('/verifyUser', userController.verifyUser, (req, res) => {
  return res.status(200).json({UserExists: res.locals.exists, UserVerified: res.locals.verified, Message: res.locals.message})
})

router.get('/getUserDetail', userController.verifyUser, userController.getUserDetail, (req, res) => {
  return res.status(200).json(res.locals.userDataDetail)
})

router.get('/updateUserPassword', userController.verifyUser, userController.updateUserPassword, (req, res) => {
  return res.status(200).json(res.locals.updatedUser)
})

router.get('/deleteUser', userController.verifyUser, userController.deleteUser, (req, res) => {
  return res.status(200).json(res.locals.userDeletion)
})

router.get('/getAllUsers', userController.getAllUsers, (req, res) => {
  return res.status(200).json(res.locals.userData)
})

module.exports = router;