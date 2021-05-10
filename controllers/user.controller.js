const { generateLogger, getCurrentFilename } = require("../logger");
const logger = generateLogger(`Routes : ${getCurrentFilename(__filename)}`);

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

    const userExists = await UserModel.findOne({ googleUID: uid });

    if (userExists) {
      logger.info(`User already saved in the DB : userID - ${userExists._id}`);
      return res.status(200).json({ message: "User saved" });
    }

    const savedUser = await UserModel.create({
      displayName,
      googleUID: uid,
      provider,
      email,
      emailVerified,
      imageURL,
      phoneNumber,
    });

    logger.info(`Add user to DB : userID - ${savedUser._id}`);
    res.status(201).json({ user: savedUser._id });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });

    logger.error("Error while saving a user");
    logger.error(e);
  }
};

exports.getSingleUserController = async (req, res) => {
  try {
    const { uid } = req.params;

    const user = await UserModel.findOne({ uid: uid });

    if (user) {
      res.status(200).json({ user, message: "User retrieved" });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (e) {
    logger.error("Error in retrieving a user");
    logger.error(e);
  }
};
