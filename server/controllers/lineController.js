const { find } = require('../models/lineModel');
const Linez = require('../models/lineModel');

const lineController = {};

// const lineSchema = new Schema({
//   lineName: {type: String, required: true, default: 'New Chat Linez'},
//   lineKey: {type: String, required: true, default: 'basic'}, 
//   lineLength: {type: Number, required: true, default: 0},
//   lineLinkz: {type: Map, required: true, default: {}}
// });

// Method function to create a new line
lineController.createNewLinez = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, createNewLinez");
  const newLinez = new Linez(req.body);
  try{
    newLinez
    .save()
    .then(items => {
      console.log('New Linez succesfully saved!!!', items);
      return next();
    })
  } catch(err) { return next(err)};
}

// Method function to add Linez to a User
lineController.addLinezUser = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, addLinezUser")
}

// Method function to verify that a line exists
lineController.verifyLinez = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, verifyLinez");
  const { lineName, lineKey } = req.body;
  try {
    Linez
    .find({lineName: lineName}, (err, linez) => {
      console.log(linez);
      // Initialize locals variables
      res.locals.lineExists = false;
      res.locals.lineVerified = false;
      res.locals.lineMessage = 'Linez does not exist'
      // Progressive conditional check to both see if the line exists and if the key is valid
      for (const line of linez) {
        if (line.lineName === lineName) {
          res.locals.lineExists = true;
          res.locals.lineMessage = 'Linez does exist, but is not validated'
        }
        if (line.lineKey === lineKey) {
          res.locals.lineVerified = true;
          res.locals.lineMessage = 'Linez Validated'
          return next ();
        }
      }
      return next();
    })
  } catch (err) {return next(err)}
}
// Method function to delete an existing line
lineController.deleteLinez = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, deleteLinez")
}
// Method function to add a new message to the line
lineController.addLinezMessage = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, addLinezMessage")
}
// Method function to get the existing message on the line
lineController.getLinezMessages = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, getLinezMessages")
}

module.exports = lineController;