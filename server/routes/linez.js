const express = require('express');
const path = require('path');
const lineController = require('../controllers/lineController');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to create a new line
router.post('/createNewLinez', lineController.createNewLinez, (req, res) => {
  return res.status(200).json(`Congratulations you created a New Linez, here is your LinezId: ${res.locals.linezId}`)
})

// Route to add a user to an existing line
router.post('/addLinezUser', userController.verifyUser, lineController.verifyLinez, userController.addLinezUser, (req, res) => {
  return res.status(200).json(res.locals.updatedLinez)
})

// Route to verify that a line exists
router.get('/verifyLinez', lineController.verifyLinez, (req, res) => {
  return res.status(200).json({Exists: res.locals.lineExists, Verified: res.locals.lineVerified, Message: res.locals.lineMessage})
})

// Route to delete an existing line
router.get('/deleteLinez', lineController.verifyLinez, lineController.deleteLinez, (req, res) => {
  return res.status(200).json(res.locals.lineDeletion)
})

// Route to add a new message to the line
router.post('/addLinezMessage', lineController.verifyLinez, lineController.addLinezMessage, (req, res) => {
  return res.status(200).json(res.locals.updatedLinezMessages)
})

// Route to get the existing message on the line
router.get('/getLinezMessages', lineController.verifyLinez, lineController.getLinezMessages, (req, res) => {
  return res.status(200).json(res.locals.linezMessages)
})

module.exports = router;