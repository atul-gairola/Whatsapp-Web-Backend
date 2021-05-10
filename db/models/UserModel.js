const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    googleUID: { type: String, unique: true },
    provider: String,
    email: { type: String, unique: true },
    emailVerified: Boolean,
    imageURL: String,
    phoneNumber: Number,
    chatIds: [{
      type: Schema.Types.ObjectId,
      ref: "chat"
    }]
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
