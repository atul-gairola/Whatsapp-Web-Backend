const router = require("express").Router();
const authCheck = require("../middlewears/AuthCheck");

// controllers
const {
  addUserController,
  getSingleUserController,
} = require("../controllers/user.controller");

// create user
router.post("/", authCheck, addUserController);

// get a single user
router.get("/:uid", getSingleUserController);

// update user

module.exports = router;
