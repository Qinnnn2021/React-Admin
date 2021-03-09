import React, { Component } from 'react'
import {Button,Table,Modal,Card, message} from 'antd'

import {formateDate} from '../../utils/dateUtils'
import LinkButton from '../../components/link-button/index'
import {reqDeleteUser, reqUsers,reqAddOrUpdateUser} from '../../api/index'
import UserForm from './user-form'


// 用户路由
export default class User extends Component {
    state = {
      users: [],  //用来存放用户列表的数组
      roles: [],  //所有角色的列表
      isShow: false,  //是否显示对话框
    }

    initColumns = () => {
      this.columns = [
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '电话',
          dataIndex: 'phone',
        },
        {
          title: '注册时间',
          dataIndex: 'create_time',
          render: formateDate
        },
        {
          title: '所属角色',
          dataIndex: 'role_id',
          render: (role_id) =>  //this.roleNames[role_id]
            (this.state.roles.find(role => role._id===role_id) || this.state.roles[0] ).name
            // console.log('this',this.state.roles)
        },
        {
          title: '操作',
          render: (user) => (
            <span>
              <LinkButton onClick={()=>this.showUpdate(user)}>修改</LinkButton>
              <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
            </span>
          )
        }
      ]
    }

    // 根据role的数组，生成包含所有角色名的对象(属性名用角色id值)
    initRoleNames = (roles) => {
      const roleNames = roles.reduce((pre,role) => {
        pre[role._id] = role.name
        return pre
      },{})
      //保存值
      this.roleNames = roleNames
    }

    // 创建用户
    showAdd = () => {
      // 去除前面的user
      this.user = null
      this.setState({isShow:true})
    }

    // 显示修改界面
    showUpdate = (user) => {
      // 保存user的值
      this.user = user
      // 显示界面
      this.setState({
        isShow: true,
      })
    }

    // 添加/更新用户
    addOrUpdateUser = async () => {

      this.setState({isShow:false})
      // console.log(this.form);

      // 收集输入数据
      const user = this.form.getFieldsValue()
      // console.log(user);
      this.form.resetFields()

      // 如果是更新 需要给user指定_id属性
      if (this.user) {
        user._id = this.user._id
      }

      // 提交添加的请求
      const result = await reqAddOrUpdateUser(user)
      if (result.status === 0) {
        message.success(`${this.user?'修改':'添加'}用户成功！`)
        // 更新显示的列表
        this.getUsers()
      }
    }

    // 取消的回调
    handleCancel = () => {
      this.setState({isShow: false})
      this.form.resetFields()
    }

    // 获取用户
    getUsers = async () => {
      const result = await reqUsers()
      if (result.status === 0) {
        const {users,roles} = result.data
        // console.log(result.data);
        this.initRoleNames(roles)
        this.setState({
          users,
          roles,
        })
      }
    }

    // 删除指定用户
    deleteUser = (user) => {
      Modal.confirm({
        title: `确认删除${user.username}吗？`,
        onOk: async () => {
          const result = await reqDeleteUser(user._id)
          if (result.status === 0) {
            message.success('删除用户成功！')
            this.getUsers()
          }
        }
      })
    }

    UNSAFE_componentWillMount() {
      this.initColumns()
    }

    componentDidMount(){
      this.getUsers()
    }

    render() {
        const title = <Button onClick={()=>this.showAdd} 
          type='primary'>创建用户</Button>
        const {users,roles,isShow} = this.state
        const user = this.user || {}
        return (
          <Card title={title}>
            <Table
              bordered
              rowKey='_id' 
              dataSource={users}
              columns={this.columns}
              pagination={{defaultPageSize: 3}}/>

            <Modal 
              title={user._id ? '修改用户' : '添加用户'}
              visible={isShow}
              onOk={this.addOrUpdateUser}
              onCancel={this.handleCancel}>
              <UserForm roles={roles}
               setForm={form => this.form = form}
               user={user}/>    
            </Modal>
          </Card>
        )
    }
}
