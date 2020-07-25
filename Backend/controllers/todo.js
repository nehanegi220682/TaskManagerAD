const Todo = require("../models/todo");
const { check, validationResult } = require("express-validator");

exports.getTodoById = (req, res, next, id) => {
  Todo.findById(id).exec((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "Todo not found"
      });
    }
    req.todo = todo;
    next();
  });
};

exports.returnTodoById = (req, res) => {
  return res.json(req.todo);
};

exports.createTodo = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const todo = new Todo(req.body);

  todo.userId = req.params.userId;
  todo.save((err, todo) => {
    if (err) {
      return res.status(400).json({
        error: "NOT able to save Todo in DB"
      });
    }
    res.json({ todo });
  });
};

exports.getTodoByUserId = (req, res) => {
  Todo.find({ userId: req.params.userId }).exec((err, todos) => {
    if (err) {
      return res.status(400).json({
        error: "todos not found in DB"
      });
    }
    res.send(todos);
  });
};

//delete controllers
exports.deleteTodo = (req, res) => {
  let todo = req.todo;
  todo.remove((err, deletedTodo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the Todo"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedTodo
    });
  });
};

exports.getTodo = (req, res) => {};

exports.editTodo = (req, res) => {
  const todo = req.todo;
  todo.task = req.body.task;
  todo.due_date = req.body.due_date;
  todo.status = req.body.status;

  todo.save((err, updatedTodo) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update Todo."
      });
    }
    res.json(updatedTodo);
  });
};
