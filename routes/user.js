const router = require("express").Router();

// controllers
const { addUserController,getSingleUserController } = require("../controllers/user.controller");

// create user
router.post("/", addUserController);

// get a single user
router.get("/:uid", getSingleUserController);

// update user

module.exports = router;
