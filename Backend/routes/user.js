const express = require("express");
const router = express.Router();

const { getUserById, getUser, userTodoList } = require("../controllers/user");
const {
  isSignedIn,
  isAuthenticated
} = require("../controllers/authentication");

//whenever there is a param in url named userId, getuserbyid  will be called to populate user profile
router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/todos/user/:userId", isSignedIn, isAuthenticated, userTodoList);

module.exports = router;
