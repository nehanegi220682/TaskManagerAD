const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  getTodoById,
  createTodo,
  editTodo,
  deleteTodo,
  returnTodoById,
  getTodoByUserId
} = require("../controllers/todo");

const {
  isSignedIn,
  isAuthenticated
} = require("../controllers/authentication");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("todoId", getTodoById);

//all of actual routes

//create route
router.post(
  "/todo/create/:userId",
  isSignedIn,
  isAuthenticated,
  [
    check("task", "task should be atleast 3 character").isLength({ min: 3 }),
    check("due_date", " dueDate is required ").isDate(),
    check("status", "status is required")
  ],
  createTodo
);

//read route
router.get(
  "/todo/:todoId/:userId",
  isSignedIn,
  isAuthenticated,
  returnTodoById
);

//deleteroute
router.delete("/todo/:todoId/:userId", isSignedIn, isAuthenticated, deleteTodo);

//update route
router.put("/todo/:todoId/:userId", isSignedIn, isAuthenticated, editTodo);

//listing route
// router.get("/todos", getAlltodos);

router.get("/todos/:userId", isSignedIn, isAuthenticated, getTodoByUserId);
module.exports = router;
