const ChatModel = require("../db/models/ChatModel");
const MessageModel = require("../db/models/MessageModel");
const UserModel = require("../db/models/UserModel");

exports.sendMessageController = async (req, res) => {
  const { currentUser, params, body } = req;

  const { chatId } = params;

  // const { uid } = params;

  // if (uid !== currentUser.uid) {
  //   logger.error(`Authenticated user not allowed access`);
  //   return res.status(403).json({ message: "Forbidden" });
  // }

  console.log(params);

  // get the chat
  const currentChat = await ChatModel.findById(chatId);

  // check if chat exists
  if (!currentChat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  // check to ensure message is not empty
  if (!body.message || body.message.trim() === "") {
    return res.status(201).json({ message: "No message recieved" });
  }

  const recieverList = currentChat.members.filter(
    (cur) => String(cur) !== String(currentUser._id)
  );

  console.log(recieverList, typeof String(currentUser._id));

  // save the new message
  const savedMessage = await MessageModel.create({
    from: currentUser._id,
    chatID: chatId,
    to: recieverList,
    content: body.message,
    status: "SENT",
  });

  // reflect the message on the users
  const updatedChat = await ChatModel.findByIdAndUpdate(
    chatId,
    {
      $push: { messages: savedMessage._id },
      lastMessage: savedMessage._id,
    },
    { new: true }
  );

  return res.json({ savedMessage, updatedChat, recieverList });
};
