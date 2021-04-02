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
      // Progressive conditional check to both see if the user exists and if the password is valid
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
  const { username, password } = req.body;
  try{
    if (res.locals.verified === true) {
      User
      .find({username: username, password: password})
      .then(dataLookup => {
        res.locals.userDataDetail = dataLookup;
        return next();
      })
    } else if (res.locals.verfied === false) return next ()
  } catch(err) { return next(err)};
}

userController.updateUserPassword = (req, res, next) => {
  console.log(req.body);
  const { username, password, newpassword } = req.body;
  try{
    if (res.locals.verified === true) {
      User
      .findOneAndUpdate({username: username, password: password}, {password: newpassword}, {new: true})
      .then(updatedUser => {
        res.locals.userUpdate = updatedUser;
        return next();
      })
    } else if (res.locals.verfied === false) return next ()
  } catch(err) { return next(err)};
}

userController.deleteUser = (req, res, next) => {
  console.log(req.body);
  const { username, password, deleteConfirmation} = req.body;
  try{
    if (res.locals.verified === true && deleteConfirmation === 'delete') {
      User
      .findOneAndDelete({username: username, password: password}, {select: {username: username}})
      .then(deletedUser => {
        res.locals.userDeletion = deletedUser;
        return next();
      })
    } else if (res.locals.verfied === false) return next ()
  } catch(err) { return next(err)};
}

// Method function to add Linez to a User
userController.addLinezUser = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, addLinezUser");
  const { username, password, lineId } = req.body;
  try{
    if (res.locals.lineVerified === true && res.locals.verified === true) {
      console.log('made it here!')
      User
      .findOneAndUpdate({username: username, password: password}, {$inc: {'linezCount': 1}, $push: {'linez': lineId}}, {new: true})
      .then(updatedUser => {
        const {linez} = updatedUser
        res.locals.updatedLinez = linez;
        return next();
      })
    } else if (res.locals.lineVerfied === false || res.locals.verified === false) return next ()
  } catch(err) { return next(err)};
}

module.exports = userController;