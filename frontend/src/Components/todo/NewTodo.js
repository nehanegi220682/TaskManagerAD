import React, { useState } from "react";
import { FcPlus } from "react-icons/fc";
import { Button, Modal, Form, Select, DatePicker, Input, Radio } from "antd";
import { createTodo } from "../auth/todoCalls";
import { isAuthenticated } from "../auth";
import "./TodoRender.css";
const { Option } = Select;
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Enter New Todod"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          name="task"
          label="Task"
          rules={[
            {
              required: true,
              message: "Enter the task"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="due_date" label="Due Date">
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true
            }
          ]}
        >
          <Select placeholder="Select status" allowClear>
            <Option value="pending">Pending</Option>
            <Option value="done">Done</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const NewTodo = () => {
  const { user, token } = isAuthenticated();
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log("Received values of form: ", values);
    values.due_date = values.due_date.format("YYYY-MM-DD");
    console.log(values);
    createTodo(user._id, token, values).then(data => {
      if (data.error) {
        values.error = data.error;
      } else {
        console.log("new todo added");
        window.location.reload();
        //   props.preload();
      }
    });
    setVisible(false);
  };

  return (
    <div className="addIconWrapper">
      <FcPlus
        className="add_icon"
        onClick={() => {
          setVisible(true);
        }}

      />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      {/* {modal ? <TodoPopup isOpen={modal} /> : ""} */}
    </div>
  );
};
