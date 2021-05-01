const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema({
  name: String,
  message: String,
  timestamp: String,
  read: Boolean,
});

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
