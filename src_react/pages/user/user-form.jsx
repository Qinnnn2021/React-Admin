import React from 'react'
import {Form,Input,Select} from 'antd'

const Item = Form.Item
const Option = Select.Option

// 创建角色的form组件
const UserForm = (props) => {
    const [form] = Form.useForm();
    props.setForm(form)
    const roles = props.roles
    // const user = props.user || {}
    const user = props.user
    // console.log(user.role_id);
        return (
            <Form form={form}>   
               <Item label='用户名称'  
                  name='username' initialValue={user.username}
                  rules={[{ required: true, message: '用户名必须输入' }]}>
                <Input placeholder='请输入用户名称'/>
               </Item>
               {
                 user._id ? null : <Item label='密码'  
                 name='password' initialValue={user.password}
                 rules={[{ required: true, message: '用户密码必须输入' }]}>
                  <Input type='password' placeholder='请输入用户密码'/>
                </Item>
               }
               <Item label='手机号码'  
                  name='phone' initialValue={user.phone}>
                <Input placeholder='请输入用户手机号码'/>
               </Item>
               <Item label='邮箱'  
                  name='email' initialValue={user.email}>
                <Input placeholder='请输入用户邮箱'/>
               </Item>
               <Item label='角色'  
                  name='role' initialValue={user._id ? user.role_id : undefined}>
                <Select placeholder="请选择用户所属角色">
                  {
                    roles.map(role => <Option value={role._id} key={role._id}>{role.name}</Option>)
                  }
                </Select>
               </Item>
            </Form>
        )
    }

export default UserForm
