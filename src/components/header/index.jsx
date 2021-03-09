import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd'
import {connect} from 'react-redux'

import {formateDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import LinkButton from '../../components/link-button'
import {logout} from '../../redux/actions'
import './index.less'

 class Header extends Component {

  // 设计状态
  state = {
    currentTime: formateDate(Date.now()), //当前时间的字符串形式
    weather: ''  //天气的文本
  }
  
  getTime = () => {
    // 每隔一秒钟获取当前时间 并更新状态数据currentTime
    this.timer = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({currentTime})
    }, 1000);
  }

  getWeather = async() => {
    // 调用接口请求异步获取
    const weather = await reqWeather(110101)
    // 更新状态
    this.setState({weather})
  }

  /* getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item=>{
      if (item.key === path) {  //如果当前item对象的key与path匹配 则item的title就是需要显示的title
        title = item.title
      } else if (item.children) {
        // 在所有的子item中进行查找匹配 返回一个布尔值
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        // 如果有值则说明成功匹配 且取出他的title显示
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  } */

  // 退出登录
  logout = () => {
    // 显示确认框
    Modal.confirm({
      content: '确认退出?',
      onOk: () => {
        console.log('退出');
        this.props.logout()
      }
      /* ,
      onCancel() {
        console.log('取消');
      } */

    })
  }

  // 在第一次render()之后执行一次
  // 一般在此执行异步操作：发送ajax请求以及启动定时器
  componentDidMount(){
    // 获取当前时间
    this.getTime()
    // 获取当前天气文本
    this.getWeather()
  }

  // 清除定时器
  componentWillUnmount() {
    clearInterval(this.timer)
  }

    render() {
      // console.log('render');
      const {currentTime,weather} = this.state
      const username = this.props.user.username
      // 得到当前需要显示的title
      // const title = this.getTitle()
      const title = this.props.headTitle
        return (
            <div className="header">
                <div className="header-top">
                  <span>欢迎，{username}</span>
                  {/* <a href="javascript:" onClick={this.logout}>退出</a> */}
                  <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                  <div className="header-bottom-left">{title}</div>
                  <div className="header-bottom-right">
                    <span>{currentTime}</span>
                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1178787126,2434974534&fm=26&gp=0.jpg" alt="天气"/>
                    <span>{weather}</span>
                  </div>
                </div>
            </div>
        )
    }
}

export default connect(
  state => ({headTitle: state.headTitle, user: state.user}),
  {logout}
)(withRouter(Header)) 
