import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, message} from 'antd';
import {API_ROOT} from "../constants"
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log('Received values of form: ', values);
        $.ajax({
          url: `${API_ROOT}/login`,
          method: 'POST',
          data: JSON.stringify({
            username: values.username,
            password: values.password,
          }),
        }).then((response) => {
          //message.success(response);
          this.props.loginHandler(response);
        }, (error) => {
          message.error(error.responseText);
        }).catch((error) => {
          console.log(error);
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/register">Register Now</Link>
        </FormItem>
      </Form>
    );
  }
}

export const Login = Form.create()(NormalLoginForm);