import React, { useState } from "react";
import { Link, Router } from "react-router-dom";

import { Row, Col } from "antd";
import { Typography } from "antd";
import { signup } from "../auth";
import { Alert } from "antd";

import { Form, Input, InputNUmber, Button, Checkbox } from "antd";
import "./Signup.css";
const { Title } = Typography;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not validate email!",
    number: "${label} is not a validate number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

const Signup = () => {
  const [signupValues, setSignupValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });
  const { name, email, password, error, success } = signupValues;
  const [form] = Form.useForm();

  const handleChange = name => event => {
    setSignupValues({
      ...signupValues,
      error: false,
      [name]: event.target.value
    });
  };

  const onFinish = values => {
    console.log("Success:", values);
    const temp = { ...values };
    console.log(temp);

    console.log(signupValues);

    signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setSignupValues({
            ...signupValues,
            error: data.error,
            success: false
          });
        } else {
          setSignupValues({
            ...signupValues,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
    form.resetFields();
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  const successMessage = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            <Alert
              message={`New account was created successfully. Please LOGIN`}
              type="success"
            />
            {/* <Link to="/signin">Login here </Link> */}
          </div>
        </div>
      </div>
    );
  };

  const SignupForm = () => {
    return (
      <div className="formContainer">
        <Row className="formbox">
          <Col className="form" xs={24} sm={24} md={24} lg={20} xl={20}>
            <Title className="pageHeading" level={2}>
              Sign Up
            </Title>
            <Form
              form={form}
              {...layout}
              className="center"
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              justify="center"
              align="center"
              validateMessages={validateMessages}
            >
              <Form.Item
                className="formitems center"
                label="Username"
                name="name"
                justify="center"
                align="center"
                onChange={handleChange("name")}
                rules={[
                  { required: true, message: "Please input your username!" }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="formitems center"
                label="Email"
                name="email"
                onChange={handleChange("email")}
                justify="center"
                align="center"
                rules={[{ type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                className="formitems center"
                label="Password"
                name="password"
                onChange={handleChange("password")}
                rules={[
                  { required: true, message: "Please input your password!" }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                className="center"
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item className="center" className="center">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <p>
              {" "}
              Already have an Account? <Link to="/signin">Login here </Link>
            </p>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      {successMessage()}
      {SignupForm()}
    </div>
  );
};

export default Signup;
