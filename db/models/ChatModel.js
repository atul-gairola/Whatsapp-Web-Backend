const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    isGroup: { type: Boolean, default: false },
    groupName: String,
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "message" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "message" },
    createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
