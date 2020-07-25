import React, { useState } from "react";
import { signout, isAuthenticated } from "../auth/index";
import { Row, Col } from "antd";
import "./TodoScreen.css";
import { Menu, Dropdown, Button, message, Tooltip } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import TodoRender from "./TodoRender";
import { NewTodo } from "./NewTodo";

const TodoScreen = () => {
  const { user } = isAuthenticated();
  const menu = (
    <Menu onClick={signout}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="TodoWrapper">
      <Row>
        <Col className="todoHeader" span={24}>
          <p className="introPara">
            SCIZERS TASK MANAGER
            <span className="nameIconWrapper">
              <Dropdown.Button
                className="userName"
                overlay={menu}
                placement="bottomCenter"
                icon={<UserOutlined />}
              >
                {user.name}{" "}
              </Dropdown.Button>
            </span>
          </p>
        </Col>
      </Row>
      <TodoRender />
      <NewTodo />
    </div>
  );
};

export default TodoScreen;
