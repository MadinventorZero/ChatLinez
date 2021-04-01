const { find } = require('../models/userModel');
const User = require('../models/userModel');

const userController = {};

userController.getAllUsers = (req, res, next) => {
  console.log(req.body);
  try {
    User
    .find({}, (err, users) => {
      res.locals.userData = users;
      return next();
    })
  } catch (err) {return next(err)}
}

userController.verifyUser = (req, res, next) => {
  console.log(req.body);
  const { username, password } = req.body;
  try {
    User
    .find({username: username}, (err, users) => {
      console.log(users);
      // Initialize locals variables
      res.locals.exists = false;
      res.locals.verified = false;
      res.locals.message = 'User does not exist'
      for (const user of users) {
        if (user.username === username) {
          res.locals.exists = true;
          res.locals.message = 'User does exist, but is not validated'
        }
        if (user.password === password) {
          res.locals.verified = true;
          res.locals.message = 'User Validated'
          return next ();
        }
      }
      return next();
    })
  } catch (err) {return next(err)}
}

userController.createUser = (req, res, next) => {
  console.log(req.body);
  const newUser = new User(req.body);
  try{
    newUser
    .save()
    .then(items => {
      console.log('New User succesfully saved!!!', items);
      return next();
    })
  } catch(err) { return next(err)};
}

userController.getUserDetail = (req, res, next) => {
  console.log(req.body);
  try{
    User
    .find()
    .then(items => {
      console.log('New User succesfully saved!!!', items);
      return next();
    })
  } catch(err) { return next(err)};
}

module.exports = userController;