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

    const userExists = await UserModel.findOne({ uid: uid });

    if (userExists) {
      logger.info(`User already saved in the DB : userID - ${userExists._id}`);
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

    logger.info(`Add user to DB : userID - ${savedUser._id}`);
    res.status(201).json({ user: savedUser._id });
  } catch (e) {
    logger.error("Error while saving a user");
  }
};
