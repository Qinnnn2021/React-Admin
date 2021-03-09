import React, { Component } from 'react'
import { Card,Table,Button,message,Modal } from 'antd'
import {PlusOutlined,ArrowRightOutlined} from  '@ant-design/icons'

import LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategorys,reqUpdateCategorys} from '../../api/index'
import AddForm from './add-form'
import UpdateForm from './update-form'

// 商品分类路由
export default class Category extends Component {
    // 定义状态
    state = {
      loading:false,  //标识数据是否正在加载中
      categorys: [], //一级分类列表
      subCategorys: [], //二级分类列表
      parentId: '0', //当前需要显示的分类列表的父分类ID
      parentName: '', //当前需要显示的分类列表的父分类名称
      showStatus: 0, //标识添加/更新的确认框是否显示 
      // 0: 都不显示  1: 显示添加  2:显示更新  
    }

    // 初始化TABLE所有列的数组
    initColumns = () => {
      //   显示列的分类
      this.columns = [
        {
          title: '分类名称',
          dataIndex: 'name',  //显示数据对应的属性名
        },
        {
          title: '操作',
          width: 300,
          render: (category) => (  //返回需要显示的界面标签
            <span>
              <LinkButton onClick={() => {this.showUpdate(category)}}>修改分类</LinkButton>
              {/* 如何向事件回调函数传递参数：先定义一个匿名函数 在函数调用处理的函数并传入数据 */}
              
              {this.state.parentId==='0'?<LinkButton onClick={()=>{this.showSubCategorys(category)}}>查看子分类</LinkButton>:null}
            </span>
          )
        },
      ]; 
    }

    // 异步获取一级/二级分类列表显示
    // parentId: 如果没有指定根据状态中的parentId请求 如果有则为指定的
    getCategorys = async (parentId) => {
      // 发送请求前 显示loading
      this.setState({loading:true})

      parentId = parentId || this.state.parentId
      //reqCategorys('0') 得到的是一个promise对象
      // 获取结果数据
      const result = await reqCategorys(parentId) 

      // 请求完成后 隐藏Loading
      this.setState({loading:false})

      if (result.status === 0) {
        // 说明成功取出分类数组 （可能是一级的也可能是二级）
        const categorys = result.data
        if (parentId === '0') {
          // 说明是一级列表
          // 更新状态
        this.setState({categorys})
        } else {
          // 二级列表 
          this.setState({subCategorys:categorys})
        }
      } else {
        message.error('获取数据失败')
      }
    }

    // 显示指定一级分类对象的二级子列表
    showSubCategorys = (category) => {
      // 更新状态----> 异步
      this.setState({
        parentId: category._id,
        parentName: category.name,
      },()=>{
        // 回调函数会在状态更新并且重新render()后执行

      // console.log('parentId',this.state.parentId); parentId,'xxxxx'

          // 获取二级分类列表
          this.getCategorys()
      })
      // setState()不能立即获取最新的状态：因为是异步更新状态的
      // console.log('parentId',this.state.parentId);  parentId,0
    }

    // 显示一级分类列表
    showCategorys = () => {
      // 更新为显示一级列表的状态
      this.setState({
        parentId: '0',
        parentName: '',
        subCategorys: []
      })
    }

    // 响应点击取消
    handleCancel = () => {
      // 清除输入文本框数据
      this.form.resetFields()
      // 隐藏确认框
      this.setState({
        showStatus: 0
      })
      
    }

    // 显示添加的确认框
    showAdd = () => {
      this.setState({
        showStatus: 1
      })
    }

    // 添加分类
    addCategory = () => {
      // 进行表单验证
      this.form.validateFields(async (err,values)=>{
        if (!err) {
          // 隐藏确认框
          this.setState({showStatus:0})
          // 收集数据并提交添加分类请求
          const {parentId,categoryName} = values
          // 清除输入数据
          this.form.resetFields()
          const result = await reqAddCategorys(categoryName,parentId)
          if (result.status === 0) {
            // 代表成功
            
            // 添加的分类就是当前分类列表下的分类
            if (parentId === this.state.parentId) {
              // 重新获取当前分类列表显示
              this.getCategorys()
            } else if (parentId==='0') {
              // 在二级分类列表下添加一级分类 重新获取一级分类列表 但是不需要显示一级列表
              this.getCategorys('0')
            }
          }
        }
      }) 
    }

    // 显示更新对话框
    showUpdate = (category) => {
      
      // 保存分类对象
      this.category = category
      // console.log('this', this.category);
      
      this.setState({
        showStatus: 2,
      })

    }
    
    // 更新分类
    updateCategory = () => {
      // 进行表单验证 只有通过才能验证
      this.form.validateFields(async (err,values)=>{
        if (!err) {
          // 1、隐藏显示框
          this.setState({
            showStatus:0
          })

          // 准备数据
          const categoryId = this.category._id

          // console.log('fansili ',this.form);
          
          // const categoryName = this.form.getFieldValue('categoryName')
          const {categoryName} = values

          // 清除输入文本框数据
          this.form.resetFields()

          // 2、发请求更新分类
          const result = await reqUpdateCategorys({categoryId,categoryName})
          if (result.status  === 0) {
            // 3、重新显示列表
            this.getCategorys()
          } 
        }
      }
      )
      

      
    }

    // 为第一次render() 准备数据
    UNSAFE_componentWillMount() {
      this.initColumns()
    }

    // 发送异步ajax请求
    componentDidMount() {
      // 获取一级列表
      this.getCategorys()
    }

    render() {

        // 读取状态数据
        const {categorys,loading,subCategorys,parentId,parentName,
        showStatus} = this.state              

        // 读取指定的分类
        const category = this.category || {}  //如果没有则先选择一个空对象以防报错
        // console.log( 'undefined',category.name);
        // const {category} = this
        // console.log('category',category);

        // card的左侧
        const title = parentId==='0'? '一级分类列表' : (
          <span>
            <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
            <ArrowRightOutlined style={{margin:5}}/>
            <span>{parentName}</span>
          </span>
        )

        // card的右侧
        const extra = (
          <Button onClick={this.showAdd} type='primary'>
            <PlusOutlined />
            添加
          </Button>
      )

        return (
            <Card title={title} extra={extra}>
              <Table loading={loading} pagination={{defaultPageSize:5,showQuickJumper:true}} 
              bordered rowKey='_id' dataSource={parentId === '0' ? categorys : subCategorys} 
              columns={this.columns} />
              <Modal
                visible={showStatus===1}
                title="添加分类"
                onOk={this.addCategory}
                onCancel={this.handleCancel}      
              >
                <AddForm categorys={categorys} parentId={parentId}
                setForm={(form)=>{this.form = form}}/>
              </Modal>

              <Modal
                visible={showStatus===2}
                title="更新分类"
                onOk={this.updateCategory}
                onCancel={this.handleCancel}
              >
                <UpdateForm categoryName={category.name} 
                setForm={(form) => {this.form = form}}/>
              </Modal>

            </Card>
        )
    }
}
