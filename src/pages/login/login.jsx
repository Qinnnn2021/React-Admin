import React from 'react'
import { Form, Input, Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

import './login.less'
import logo from '../../assets/imgs/logo.png'
import {login} from '../../redux/actions'

import { Redirect } from 'react-router-dom';

const Login = (props) => {

  const [form] = Form.useForm();

  // 如果用户已经登录 自动跳转到管理界面
  const user = props.user
  if (user._id) {
    return <Redirect to='/home'/>
  }
  
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);

    // 请求登录
    const {username,password} = values

    // 调用分发异步action的函数 ===》发送ajax请求 
    // 有了结果之后更新状态
    props.login(username,password)
     
  };

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
        <div className={user.errorMsg ? 'error-msg show':'error-msg'}>{user.errorMsg}</div>
        <h2>用户登陆</h2>
        <Form form={form} name="normal_login" className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            // 声明式验证：直接使用别人定义好的验证规则进行验证
            rules={[
              {required: true, whitespace: true, message: '请输入用户名!'},
              {min: 4, message: '用户名最少4位'},
              {max: 12, message: '用户名最多12位'},
              {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文 数字或者下划线组成'},
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" style={{ color: 'rgba(0,0,0,.25)' }} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" style={{ color: 'rgba(0,0,0,.25)' }}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)






