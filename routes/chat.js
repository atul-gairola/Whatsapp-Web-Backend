const router = require("express").Router();

const authCheck = require("../middlewears/AuthCheck");
const { createNewChatController } = require("../controllers/chat.controller");

// create chat
router.post("/create/:uid", authCheck, createNewChatController);

module.exports = router;
