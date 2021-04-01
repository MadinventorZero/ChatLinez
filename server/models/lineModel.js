const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineSchema = new Schema({
  lineLength: {type: Number, required: true, default: 0},
  lineLinkz: {type: Map, required: true, default: {}}
});

module.exports = mongoose.model('Linez', lineSchema);
