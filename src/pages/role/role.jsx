import React, { PureComponent } from 'react'
import { Card , Button, Table,Modal, message} from 'antd'
import { connect } from 'react-redux'

import {reqRoles,reqAddRole,reqUpdateRole} from '../../api/index'
import ADDForm from './add-form'
import AuthForm from './auth-form'
// import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import {logout} from '../../redux/actions'


// 角色路由
class Role extends PureComponent {
    state = {
      roles: [],  //用来存放各种角色的数组
      role: {},  //选中的role
      isShowAdd: false,  //是否显示添加界面
      isShowAuth: false, //是否显示设置权限界面
    }


    constructor(props){
      super(props)
      
      this.auth = React.createRef()
    }

    initColumn = () => {
      this.columns = [
        {
          title: '角色名称',
          dataIndex: 'name',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          render: (create_time) => formateDate(create_time)
        },
        {
          title: '授权时间',
          dataIndex: 'auth_time',
          render: formateDate
        },
        {
          title: '授权人',
          dataIndex: 'auth_name'
        }
      ] 
    }

    // 获取角色的列表数据
    getRoles = async () => {
      const result = await reqRoles()
      if (result.status === 0) {
        const roles = result.data
        this.setState({roles})
      }
    }

    onRow = (role) => {
      return {
        onClick: event => {
          this.setState({role})
        }
      }
    }

    // 添加角色成功的回调函数
    addRole = () => {
      //进行表单验证
    //   console.log(this.form);
    this.form.validateFields()
    .then(async (values)=>{
        //隐藏确认框
        this.setState({isShowAdd:false})
        //收集输入数据
        const {roleName} = values
        this.form.resetFields()
        //发请求添加
        const result = await reqAddRole(roleName)
        if (result.status===0) {
        //   this.getRoles()
        // 新产生的角色
        const role = result.data
        // 更新roles状态  更新后的数据和之前的状态数据有关
        this.setState(state=>({
          roles: [...state.roles,role]
        }))
        } else {
          message.error('添加角色失败')
        }
      }
    )
    .catch(errorInfo => {
        alert('出错',errorInfo)
      });
    }

    //取消添加角色的回调
    handleCancel = () => {
      this.form.resetFields()
      this.setState({isShowAdd:false})
    }

    // 更新角色的回调函数
    updateRole = async () => {
      // 隐藏确认框
      this.setState({
        isShowAuth: false
      })
      const role = this.state.role
      // 得到最新的menus
      const menus = this.auth.current.getMenus()
      role.menus = menus
      role.auth_time = Date.now()
      role.auth_name = this.props.user.username

      // 请求更新
      const result = await reqUpdateRole(role)
      if (result.status === 0) {
        // 如果当前更新的是自己角色的权限 需要强制退出
        if (role._id === this.props.user.role_id) {
          this.props.logout()
          message.success('用户权限已更新,请重新登录!')
        } else {
          message.success('设置权限成功')
          // 获取显示列表的两种方式
          // this.getRoles()
          this.setState({
            roles: [...this.state.roles]
          })
        }

        
      }
    }

    // 取消更新角色的回调
    handleCancelUpdate = () => {
      this.setState({isShowAuth:false})
      // this.form.resetFields()
    }

    UNSAFE_componentWillMount(){
      this.initColumn()
    }

    componentDidMount(){
      //发送请求获取角色列表数据
      this.getRoles()
    }
    render() {
        const {roles,role, isShowAdd,isShowAuth} = this.state

        const title = (
          <span>
            <Button onClick={()=>{this.setState({isShowAdd: true})}} type='primary'>创建角色</Button> &nbsp; &nbsp;
            <Button type='primary' disabled={!role._id}
             onClick={()=>{this.setState({isShowAuth: true})}} >设置角色权限</Button>
          </span>
        )
        return (
          <Card title={title}>
            <Table 
            bordered  
            rowKey='_id'
            dataSource={roles}
            columns={this.columns}
            pagination={{defaultPageSize: 3}}
            rowSelection={{type:'radio',selectedRowKeys:[role._id],
              // 当选择某个radio的回调
              onSelect: (role)=>{this.setState({role})}
            }}
            onRow={this.onRow} />
            <Modal 
            title='添加角色'
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={this.handleCancel}
            >
              <ADDForm setForm={form=>this.form = form} />
            </Modal>
            <Modal 
              title='设置角色权限'
              visible={isShowAuth}
              onOk={this.updateRole}
              onCancel={this.handleCancelUpdate}
            >
              <AuthForm ref={this.auth} role={role}/>
            </Modal>
          </Card>
        )
    }
}

export default connect(
  state => ({user:state.user}),
  {logout}
)(Role)
