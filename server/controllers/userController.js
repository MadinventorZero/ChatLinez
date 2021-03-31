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
  const { username, password } = req.body;
  User
    .find({username: username})
    .then(users => {
      users.forEach(currObj => {
        if (currObj.password === password) {
          res.locals.userId = currObj._id.toString();
          return next();
        }
      });
    })
    .catch(err => next(err));
}