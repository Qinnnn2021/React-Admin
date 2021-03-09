import React from 'react'
import {Form,Input} from 'antd'

const Item = Form.Item

// 更新分类的form组件
const UpdateForm = (props) => {
  const [form] = Form.useForm();

  const {categoryName} = props
  
  props.setForm(form)

  return (
    <Form form={form}>
      <Item name='categoryName' 
      initialValue={categoryName}
      rules={[{ required: true,message: '分类名称必须输入' }]}>
          <Input placeholder='请输入分类名称'/>
      </Item>
    </Form>
  );
};


export default  UpdateForm 

