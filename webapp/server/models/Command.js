const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommandSchema = new Schema({
  command: { type: String, required: true },
  read: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model('Command', CommandSchema);
