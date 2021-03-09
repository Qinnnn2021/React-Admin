import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import {connect} from 'react-redux'


import logo from '../../assets/imgs/logo.png'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import {setHeadTitle} from '../../redux/actions'
import './index.less'

const { SubMenu } = Menu;
// 左侧导航的组件
 class LeftNav extends Component {

  // 判断当前登录的用户对item的权限
  hasAuth = (item) => {
    const {key,isPublic} = item
    const menus = memoryUtils.user.role.menus
    // console.log(memoryUtils.user);
    const username = memoryUtils.user.username
    // 如果当前用户是 admin
    // 如果当前item是公开的
    // 如果用户有此 item 的权限: key有没有menus中
    if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
      return true
    } else if(item.children) {
      // 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key)!==-1)
    }
    return false
  }
   
  // 定义方法 根据menu 的数据数组生成对应的标签数组
  // 使用map + 递归调用
   getMenuNodes = (menuList) => {
   
    // 得到当前请求的路由路径
    const path = this.props.location.pathname

    return menuList.map(item => {
      /* 
        这里的item的形式如下：
        {
          title: '首页', //菜单标题名称
          key: '/home',  //对应的path
          icon: 'home',  //图标名称
          children: []  可能有也可能没有
        },
      */

      // 如果当前用户有item对应的权限 才需要显示对应的菜单项
      if (this.hasAuth(item)) {
        if (!item.children) { 

          // 判断item是否是当前对应的item
          if (item.key === path || path.indexOf(item.key)===0) {
            // 更新redux中的headTitle状态
            this.props.setHeadTitle(item.title)
          }

          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.key} onClick={()=>this.props.setHeadTitle(item.title)}>{item.title}</Link>
            </Menu.Item>
          )
        } else {
          // 查找一个与当前请求路径匹配的子item
          const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0 )
          // 如果存在 说明当前item的子列表需要打开
          if (cItem) {this.openKey = item.key}
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
               {/* 递归调用 */}
               {
                this.getMenuNodes(item.children)
              }
            </SubMenu>
          )
        }
      }
     
    })
  } 

  // 在第一次render() 之前执一次 为第一次render()准备数据（同步的）
  UNSAFE_componentWillMount(){
    //组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次 
    this.menuNodes =this.getMenuNodes(menuList) 
  }
  
//#region
/*   // 定义方法 reduce() + 递归调用
  getMenuNodes = (menuList) => {
    return menuList.reduce((pre,item)=>{
      // 向pre添加 Menu.Item 或者 SubMenu
      if (!item.children) {
        // 添加 Menu.Item
        pre.push(
          (<Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>)
        )
      } else {
        // 添加 SubMenu
        pre.push((
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {
              this.getMenuNodes(item.children)
            }
          </SubMenu>
        ))
      }
      return pre
    },[ ])
  } */
  //#endregion

    render() {

      // const menuNodes = this.getMenuNodes(menuList)

      // 得到当前请求的路由路径
      let path = this.props.location.pathname

      if (path.indexOf('/product')===0) {
        // 说明现在显示 product或者product的子页面
        // 修改path
        path = '/product'
      }
      
      // 得到需要打开菜单项的key
      const openKey = this.openKey
        return (
            <div className="left-nav">
              <Link to="/" className="left-nav-header">
                <img src={logo} alt="logo"/>
                <h1>硅谷后台</h1>
              </Link>
              <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
                theme="dark"
              >
                {/* <Menu.Item key='/home' icon={<DesktopOutlined />}>
                  <Link to='/home'>首页</Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
                  <Menu.Item key='/category' icon={<MailOutlined />}><Link to='/category'>品类管理</Link></Menu.Item>
                  <Menu.Item key='/product' icon={<MailOutlined />}><Link to='/product'>商品管理</Link></Menu.Item>
                </SubMenu> */}

                {/* 根据导入的menuList动态生成菜单导航 */}
                {
                  this.menuNodes
                }
                
              </Menu>
            </div> 
          )
    }
}

// 高阶组件：包装非路由组件 返回一个新的组件 
    // 新的组件会向非路由组件传递三个属性： histroy location match
// export default withRouter(LeftNav)

export default connect(
  state => ({}),
  {setHeadTitle}
)(withRouter(LeftNav))
