const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: String,
    timestamp: String,
    status: {type: String},
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
