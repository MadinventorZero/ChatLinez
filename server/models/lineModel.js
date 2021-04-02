const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineSchema = new Schema({
  lineName: {type: String, required: true, default: 'New Chat Linez'},
  lineKey: {type: String, required: true, default: 'basic'}, 
  lineLength: {type: Number, required: true, default: 0},
  lineLinkz: {type: [String], required: true, default: []}
});

module.exports = mongoose.model('Linez', lineSchema);
