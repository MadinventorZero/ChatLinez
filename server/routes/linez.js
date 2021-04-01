const express = require('express');
const path = require('path');
const lineController = require('../controllers/lineController');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to create a new line
router.post('/createNewLinez', lineController.createNewLinez, (req, res) => {
  return res.status(200).json("Congratulations and you made it to createNewLinez")
})

// Route to add a user to an existing line
router.post('/addLinezUser', (req, res) => {
  console.log("You made it to this point!!!!")
  return res.status(200).json("Congratulations and you made it to addLinezUser")
})

// Route to verify that a line exists
router.get('/verifyLinez', lineController.verifyLinez, (req, res) => {
  return res.status(200).json({Exists: res.locals.lineExists, Verified: res.locals.lineVerified, Message: res.locals.lineMessage})
})

// Route to delete an existing line
router.get('/deleteLinez', (req, res) => {
  console.log("You made it to this point!!!!")
  return res.status(200).json("Congratulations and you made it to deleteLinez")
})

// Route to add a new message to the line
router.post('/addLinezMessage', (req, res) => {
  console.log("You made it to this point!!!!")
  return res.status(200).json("Congratulations and you made it to addLinezMessage")
})

// Route to get the existing message on the line
router.get('/getLinezMessages', (req, res) => {
  console.log("You made it to this point!!!!")
  return res.status(200).json("Congratulations and you made it to getLinezMessages")
})

module.exports = router;