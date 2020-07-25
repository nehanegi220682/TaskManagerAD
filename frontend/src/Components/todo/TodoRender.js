import React, { useState, useEffect } from "react";
import { TodoPopup } from "./TodoPopup";
import { isAuthenticated } from "../auth/index";
import { getTodoByUserId, deleteTodo } from "../auth/todoCalls";
//import icons
import { FaPen, FaSort } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Row, Col } from "antd";

import {
  FcGenericSortingAsc,
  FcGenericSortingDesc,
  FcList
} from "react-icons/fc";
import "./TodoRender.css";

const TodoRender = () => {
  const { user, token } = isAuthenticated();
  const [todos, setTodos] = useState([]);
  const [randomTodos, setRandomTodos] = useState([]);
  const [sort, setSort] = useState({
    type: "task",
    order: "none"
  });

  const sortByTask = type => {
    todos.sort(function(a, b) {
      switch (type) {
        case "asc":
          setSort({ type: "task", order: "ascending" });
          var taskA = a.task.toLowerCase(),
            taskB = b.task.toLowerCase();
          if (taskA < taskB)
            //sort string ascending
            return -1;
          if (taskA > taskB) return 1;
          return 0; //default return value (no sorting)
          break;

        case "desc":
          setSort({ type: "task", order: "descending" });
          var taskA = a.task.toLowerCase(),
            taskB = b.task.toLowerCase();
          if (taskA > taskB)
            //sort string ascending
            return -1;
          if (taskA < taskB) return 1;
          return 0; //default return value (no sorting)
          break;

        default:
          setSort({ type: "task", order: "none" });
          setTodos(randomTodos);
          return 0;
          break;
      }
    });
  };

  const sortByDate = type => {
    todos.sort(function(a, b) {
      switch (type) {
        case "asc":
          setSort({ type: "date", order: "ascending" });
          var dateA = new Date(a.due_date),
            dateB = new Date(b.due_date);
          return dateA - dateB; //sort by date ascending
          break;

        case "desc":
          setSort({ type: "date", order: "descending" });
          var dateA = new Date(a.due_date),
            dateB = new Date(b.due_date);
          return dateB - dateA; //sort by date ascending
          return 0; //default return value (no sorting)
          break;

        default:
          setSort({ type: "date", order: "none" });
          setTodos(randomTodos);
          return 0;
      }
    });
  };

  const sortByStatus = type => {
    todos.sort(function(a, b) {
      switch (type) {
        case "pending":
          setSort({ type: "status", order: "Pending" });
          var statusA = a.status.toLowerCase(),
            statusB = b.status.toLowerCase();
          if (statusA < statusB) return -1;
          if (statusA > statusB) return 1;
          return 0; //default return value (no sorting)
          break;

        case "done":
          setSort({ type: "status", order: "Done" });
          var statusA = a.status.toLowerCase(),
            statusB = b.status.toLowerCase();
          if (statusB < statusA) return -1;
          if (statusB > statusA) return 1;
          return 0; //default return value (no sorting)
          break;

        default:
          setSort({ type: "status", order: "none" });
          setTodos(randomTodos);
          return 0;
      }
    });
  };

  //PRELOAD ALL TODOS OF USER
  const preload = () => {
    getTodoByUserId(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTodos([...data]);
        setRandomTodos([...data]);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  //DELETE TODO
  const deleteThisTodo = todoId => {
    deleteTodo(todoId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  //ADDTODO POPUP
  const [editmodal, seteditModal] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState("");

  const toggleEditPopup = todoId => {
    setCurrentTodoId(todoId);
    seteditModal(!editmodal);
  };

  //for status dropdown
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div>
      <Row className="heavy">
        <Col span={2} className="heavy">
          #
        </Col>
        <Col span={10}>
          Task{" "}
          {sort.type == "task" && sort.order == "ascending" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingAsc onClick={() => sortByTask("desc")} />
            </div>
          ) : sort.type == "task" && sort.order == "descending" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingDesc onClick={() => sortByTask("random")} />
            </div>
          ) : (
            <div className="sortingDropdown" onClick={toggle}>
              <FcList onClick={() => sortByTask("asc")} />
            </div>
          )}
        </Col>
        <Col span={4}>
          Due Date{"  "}
          {sort.type == "date" && sort.order == "ascending" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingAsc onClick={() => sortByDate("desc")} />
            </div>
          ) : sort.type == "date" && sort.order == "descending" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingDesc onClick={() => sortByDate("random")} />
            </div>
          ) : (
            <div className="sortingDropdown" onClick={toggle}>
              <FcList onClick={() => sortByDate("asc")} />
            </div>
          )}
        </Col>
        <Col span={4}>
          Status{"  "}
          {sort.type == "status" && sort.order == "Done" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingAsc onClick={() => sortByStatus("pending")} />
            </div>
          ) : sort.type == "status" && sort.order == "Pending" ? (
            <div className="sortingDropdown" onClick={toggle}>
              <FcGenericSortingDesc onClick={() => sortByStatus("random")} />
            </div>
          ) : (
            <div className="sortingDropdown" onClick={toggle}>
              <FcList onClick={() => sortByStatus("done")} />
            </div>
          )}
        </Col>
        <Col span={2}>Edit</Col>
        <Col span={2}>Delete</Col>
      </Row>

      {todos.map((todo, index) => {
        return (
          <Row>
            <Col span={2}>#</Col>
            <Col span={10}>{todo.task}</Col>
            <Col span={4}>{todo.due_date}</Col>
            <Col span={4}>{todo.status}</Col>
            <Col span={2}>
              <FaPen
                color="#43BE31"
                className="pen"
                onClick={() => toggleEditPopup(todo._id)}
              />
            </Col>
            <Col span={2}>
              <MdDelete
                className="del"
                color="#B83227"
                onClick={() => {
                  deleteThisTodo(todo._id);
                }}
              />
            </Col>
          </Row>
        );
      })}
      {editmodal ? <TodoPopup isOpen={editmodal} todoId={currentTodoId} /> : ""}
    </div>
  );
};
export default TodoRender;
