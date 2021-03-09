import React from 'react'
import {Form,Input} from 'antd'
import Layout from 'antd/lib/layout/layout';

const Item = Form.Item

// 创建角色的form组件
const ADDForm = (props) => {
    const [form] = Form.useForm();
    props.setForm(form)
    // //指定Item布局的配置对象
    // const Layout = {
    //   labelCol: {span:4},
    //   wrapperCol: {span: 16}
    // }
        return (
            <Form form={form}>   
               <Item label='角色名称' {...Layout} 
                  name='roleName' initialValue=''
                  rules={[{ required: true, message: '角色名称必须输入' }]}>
                <Input placeholder='请输入角色名称'/>
               </Item>
            </Form>
        )
    }

export default ADDForm
