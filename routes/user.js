const router = require("express").Router();
const authCheck = require("../middlewears/AuthCheck");

// controllers
const {
  addUserController,
  getSingleUserController,
  updateUserController,
} = require("../controllers/user.controller");

// create user
router.post("/", addUserController);

// get a single user
router.get("/:uid", authCheck, getSingleUserController);

// update user
router.patch("/:uid", authCheck, updateUserController);

module.exports = router;
