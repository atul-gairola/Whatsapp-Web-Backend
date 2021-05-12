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
      return res.status(200).json({
        message: "User saved",
        user: {
          name: userExists.displayName,
          email: userExists.email,
          googleUID: userExists.googleUID,
          id: userExists._id,
          img: userExists.imageURL,
        },
      });
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
    const { user: authUser } = req;

    if (uid !== authUser.uid) {
      logger.error(`Authenticated user not allowed access`);
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await UserModel.findOne({ googleUID: uid });

    if (user) {
      res.status(200).json({
        user: {
          name: user.displayName,
          email: user.email,
          googleUID: user.googleUID,
          id: user._id,
          img: user.imageURL,
        },
        message: "User retrieved",
      });
    } else {
      res.status(404).json({ message: "No user found" });
    }
  } catch (e) {
    logger.error(`Error in retrieving a user : ${e}`);
  }
};

exports.updateUserController = async (req, res) => {
  const {
    user,
    params: { uid },
    body,
  } = req;

  if (uid !== user.uid) {
    logger.error(`Authenticated user not allowed access`);
    return res.status(403).json({ message: "Forbidden" });
  }

  const keys = Object.keys(body);

  if (keys.length === 0) {
    return res.status(422).json({ message: "Empty data recieved" });
  }

  const item = keys[0];
  const value = body[item];

  const updatedUser = await UserModel.findOneAndUpdate(
    { googleUID: uid },
    {
      [item]: value,
    },
    {
      new: true,
      upsert: true,
    }
  );

  console.log(updatedUser);
  // console.log(Object.keys(body));

  res.status(200).json({
    message: "Updated Successfully",
    update: { [item]: updatedUser[item] },
  });
};
