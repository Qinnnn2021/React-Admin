import React from 'react'
import {Form,Select,Input} from 'antd'

const Item = Form.Item
const Option = Select.Option


// 添加分类的form组件
const ADDForm = (props) => {
    const [form] = Form.useForm();
    const {categorys,parentId} = props
    props.setForm(form)
  
    // console.log('add',categorys);
        return (
            <Form form={form}>
                <Item name='parentId' initialValue={parentId}>
                  <Select>
                  <Option value='0'>一级分类</Option>
                    {
                      categorys.map((c,c_id) => {
                        return(
                          <Option key={c._id} value={c._id}>{c.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Item>
               
               <Item name='categoryName' initialValue=''
               rules={[{ required: true,message: '分类名称必须输入' }]}>
                <Input placeholder='请输入分类名称'/>
               </Item>
            </Form>
        )
    }

export default ADDForm
