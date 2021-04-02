const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  linez: {type: [String], required: true, default: []},
  linezCount: {type: Number, required: true, default: 0}
});

module.exports = mongoose.model('User', userSchema);
