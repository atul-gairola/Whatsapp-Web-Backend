const ChatModel = require("../db/models/ChatModel");
const MessageModel = require("../db/models/MessageModel");
const UserModel = require("../db/models/UserModel");

exports.createNewChatController = async (req, res) => {
  const { currentUser, params, body } = req;

  const { uid } = params;

  // check if the current user is only the authenticated user
  if (uid !== currentUser.uid) {
    logger.error(`Authenticated user not allowed access`);
    return res.status(403).json({ message: "Forbidden" });
  }

  //   if no content was sent in the message return
  if (!body.message || body.message.trim() === "") {
    return res.status(201).json({ message: "No message recieved" });
  }

  // check if a chat exists between the two users
  const chatExists = await ChatModel.findOne({
    members: { $all: [currentUser._id, body.to] },
  });

  if (chatExists) {
    return res
      .status(422)
      .json({ message: "Chat already exists", chatId: chatExists._id });
  }

  const newMessage = new MessageModel({
    from: currentUser._id,
    to: [body.to],
    content: body.message,
  });

  const createdChat = await ChatModel.create({
    members: [currentUser._id, body.to],
    messages: [newMessage._id],
    lasMessage: newMessage._id,
    createdBy: body.from,
  });

  newMessage.chatID = createdChat._id;

  await newMessage.save();

  //   update both users
  const updatedUsers = await UserModel.updateMany(
    { _id: { $in: [currentUser._id, body.to] } },
    {
      $push: { chatIds: createdChat._id },
    },
    {
      new: true,
    }
  );

  res.json({
    newMessage,
    createdChat,
    updatedUsers,
  });
};
