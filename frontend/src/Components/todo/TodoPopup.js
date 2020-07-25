import React, { useState, useEffect } from "react";
import { editTodo, getTodoById } from "../auth/todoCalls";
import { isAuthenticated } from "../auth";
import { Button, Modal, Form, Select, DatePicker, Input, Radio } from "antd";

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

export const TodoPopup = ({ todoId }) => {
  const { user, token } = isAuthenticated();
  const [visible, setVisible] = useState(false);

  const onEdit = values => {
    console.log("Received values of form: ", values);
    values.due_date = values.due_date.format("YYYY-MM-DD");
    console.log(values);
    editTodo(user._id, todoId, token, values).then(data => {
      if (data.error) {
        values.error = data.error;
      } else {
        window.location.reload();
      }
    });
    setVisible(false);
  };

  return (
    <div>
      <CollectionCreateForm
        visible={visible}
        onCreate={onEdit}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
