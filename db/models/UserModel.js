const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayName: String,
    uid: String,
    provider: String,
    email: String,
    emailVerified: Boolean,
    imageURL: String,
    phoneNumber: Number,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
