const { generateLogger } = require("../logger");
const logger = generateLogger(`Routes : ${__filename}`);

const UserModel = require("../db/models/UserModel");

exports.addUserController = async (req, res) => {
  try {
    const {
      displayName,
      uid,
      provider,
      email,
      emailVerified,
      imageURL,
      phoneNumber,
    } = req.body;

    const userExists = await UserModel.findOne({ uid: uid });

    if (userExists) {
      return res.status(200).json({ message: "User saved" });
    }

    const savedUser = await UserModel.create({
      displayName,
      uid,
      provider,
      email,
      emailVerified,
      imageURL,
      phoneNumber,
    });

    res.status(201).json({ user: savedUser._id });
  } catch (e) {
    logger.error("Error while saving a user");
  }
};
