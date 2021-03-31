const { find } = require('../models/userModel');
const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  console.log(req.body);
  try {
    User.find({}, (err, users) => {
      res.locals.userData = users;
      return next();
    })
  } catch (err) {return next(err)}
}

userController.createUser = (req, res, next) => {
  console.log(req.body);
  const newUser = new User(req.body);
  newUser
    .save()
    .then(items => {
      console.log('New User succesfully saved!!!')
      next()
    })
    .catch(err => next(err));
}

module.exports = userController;