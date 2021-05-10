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
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
