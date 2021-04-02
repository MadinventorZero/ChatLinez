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
  const newLinez = new Linez(req.body);
  try{
    newLinez
    .save()
    .then(linezData => {
      const {_id} = linezData;
      res.locals.linezId = _id;
      return next();
    })
  } catch(err) { return next(err)};
}

// Method function to verify that a line exists
lineController.verifyLinez = (req, res, next) => {
  console.log(req.body);
  const { lineName, lineKey, lineId } = req.body;
  try {
    Linez
    .find({lineName: lineName}, (err, linez) => {
      console.log(linez);
      // Initialize locals variables
      res.locals.lineExists = false;
      res.locals.lineVerified = false;
      res.locals.lineMessage = 'Linez does not exist. Check your name, password, and id.'
      // Progressive conditional check to both see if the line exists and if the key is valid
      for (const line of linez) {
        //The _id is a string in mongoDB but it is in the wrong form. Json parse and Json stringify convert it into the form we are aiming to compare against
        const checkLine = JSON.parse(JSON.stringify(line._id))
        if (line.lineName === lineName && checkLine === lineId) {
          res.locals.lineExists = true;
          res.locals.lineMessage = 'Linez does exist, but is not validated'
        }
        if (res.locals.lineExists === true && line.lineKey === lineKey) {
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
  const { lineName, lineKey, lineId, deleteConfirmation} = req.body;
  try{
    if (res.locals.lineVerified === true && deleteConfirmation === 'delete') {
      Linez
      .findOneAndDelete({lineName: lineName, lineKey: lineKey, _id: lineId}, {select: {lineName: lineName}})
      .then(deletedLinez => {
        res.locals.lineDeletion = deletedLinez;
        return next();
      })
    } else if (res.locals.lineVerfied === false) return next ()
  } catch(err) { return next(err)};
}
// Method function to add a new message to the line
lineController.addLinezMessage = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, addLinezMessage");
  const { lineName, lineKey, lineId, message} = req.body;
  try{
    if (res.locals.lineVerified === true) {
      Linez
      .findOneAndUpdate({lineName: lineName, lineKey: lineKey, _id: lineId}, {$inc: {'linezLength': 1}, $push: {'lineLinkz': message}}, {new: true})
      .then(updatedLinkz => {
        const {lineLinkz} = updatedLinkz
        res.locals.updatedLinezMessages = lineLinkz;
        return next();
      })
    } else if (res.locals.lineVerfied === false || res.locals.verified === false) return next ()
  } catch(err) { return next(err)};
}
// Method function to get the existing message on the line
lineController.getLinezMessages = (req, res, next) => {
  console.log(req.body);
  console.log("Reached Controller, getLinezMessages");
  const { lineName, lineKey, lineId} = req.body;
  try{
    if (res.locals.lineVerified === true) {
      console.log('made it here!')
      Linez
      .findOne({lineName: lineName, lineKey: lineKey, _id: lineId})
      .then(linezDetail => {
        const {lineLinkz} = linezDetail;
        res.locals.linezMessages = lineLinkz;
        return next();
      })
    } else if (res.locals.lineVerfied === false || res.locals.verified === false) return next ()
  } catch(err) { return next(err)};
}

module.exports = lineController;