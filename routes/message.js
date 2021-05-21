const router = require("express").Router();

const authCheck = require("../middlewears/AuthCheck");
const { sendMessageController } = require("../controllers/message.controller");

// send message
router.post("/:chatId/message", authCheck, sendMessageController);

module.exports = router;
