const router = require("express").Router();

// controllers
const { addUserController } = require("../controllers/user.controller");

// create user
router.post("/", addUserController);



module.exports = router;
