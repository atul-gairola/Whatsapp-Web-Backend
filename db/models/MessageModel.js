const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    chatID: {
      type: Schema.Types.ObjectId,
      ref: "chat",
    },
    to: [{ type: Schema.Types.ObjectId, ref: "user" }],
    content: String,
    status: { type: String, enum: ["SENT", "DELIVERED", "SEEN"] },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("message", messageSchema);

module.exports = MessageModel;
