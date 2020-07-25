import React, { useState } from "react";

import { Form, Input, Button, Checkbox } from "antd";
import { Row, Col } from "antd";
import "./Signin.css";
import { Typography } from "antd";
import { Alert } from "antd";
import { Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../auth";

const { Title } = Typography;

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const Signin = () => {
  const [form] = Form.useForm();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onFinish = inputData => {
    console.log("Success:", inputData);
    setValues({ ...values, error: false, loading: true });
    console.log(values);
    signin({ email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          form.resetFields();
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
          form.resetFields();
        }
      })
      .catch(console.log("signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user) {
        return <Redirect to="/user/todos" />;
      }
    }
    // if (isAuthenticated()) {
    //   return <Redirect to="/abc" />;
    // }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        {/* <div className="col-md-6 offset-sm-3 text-left"> */}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          <Alert message={error} type="error" />
          {/* </div> */}
        </div>
      </div>
    );
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const SigninForm = () => {
    return (
      <div className="formContainer">
        <Row className="formbox">
          <Col className="form" xs={24} sm={24} md={24} lg={20} xl={20}>
            <Title className="pageHeading" level={2}>
              Sign In
            </Title>
            <Form
              {...layout}
              form={form}
              className="center"
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              // onSubmit={onSubmit}
              onFinishFailed={onFinishFailed}
              justify="center"
              align="center"
            >
              <Form.Item
                className="formitems center"
                label="Email"
                name="email"
                onChange={handleChange("email")}
                justify="center"
                align="center"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your email correctly"
                  }
                ]}
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
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
    </div>
  );
};

export default Signin;
