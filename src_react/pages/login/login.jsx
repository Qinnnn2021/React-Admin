import React from 'react'
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

import './login.less'
import logo from '../../assets/imgs/logo.png'
// import {reqLogin} from '../../api'
// import memoryUtils from '../../utils/memoryUtils'
// import storeageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

const Login = (props) => {

  const [form] = Form.useForm();

  // 如果用户已经登录 自动跳转到管理界面
  const user = memoryUtils.user
  if (user._id) {
    return <Redirect to='/'/>
  }
  
  const onFinish = (async (values) => {
    // console.log('Received values of form: ', values);

    // 请求登录
    const {username,password} = values

    /* reqLogin(username,password).then(response => {
      console.log('成功了',response.data);
    }).catch(error => {
      console.log('失败了',error.message);
    }) */
    
    //#region 
    // 优化1
      /* const response = await reqLogin(username,password)
      console.log('请求成功了',response.data);
      
      // 验证登录成功还是失败
      const result = response.data  //{status:0, data:user}  {status:1,msg:'xxx'}
      if (result.status === 0) {  //登录成功
        // 提示登录成功
        message.success('登录成功')
        // 跳转到管理界面（不需要再回退回到登录）
        props.history.replace('/')
      } else {   //登录失败
        message.error(result.msg)  //提示错误信息
      } */

      // 优化2
      //{status:0, data:user}  {status:1,msg:'xxx'}
      /* const result = await reqLogin(username,password)  
    
      if (result.status === 0) {  //登录成功
        // 提示登录成功
        message.success('登录成功')

        // 保存user
        const user = result.data
        memoryUtils.user = user  //保存在内存中
        storeageUtils.saveUser(user)  //保存到local中去

        // 跳转到管理界面（不需要再回退回到登录）
        props.history.replace('/home')
      } else {   //登录失败
        message.error(result.msg)  //提示错误信息
      } */
    //#endregion
    
  });

  return (
    <div className="login">
      <header className="login-header">
        <img src={logo} alt="logo"/>
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login-content">
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
              /*  输入的用户名/密码要求：
                    必须输入
                    必须大于4位
                    必须小于12位
                    必须是英文 数字或者下划线组成
               */
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

export default Login

/* 
async 和 await
  1、作用？
      简化promise对象的使用：不再使用then() 来指定成功/失败的回调函数
      以同步编码(没有回调函数) 方式实现异步流程
  2、哪里写await
      在返回promise的表达式左侧写await: 不想要promise 想要promise异步执行的
        成功的value数据
  3、哪里写async
      await所在函数(最近的)的左侧写async
*/





