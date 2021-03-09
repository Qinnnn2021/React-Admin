import React, { Component } from 'react'
import { Redirect,Route,Switch } from 'react-router-dom'
import { Layout } from 'antd';

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../chars/bar'
import Line from '../chars/line'
import Pie from '../chars/pie'

const { Footer, Sider, Content } = Layout;

// 后台管理的路由组件
export default class Admin extends Component {
    
    render() {
        const user = memoryUtils.user
        // 如果内存中没有存储user ==> 当前没有登录
        if(!user || !user._id) {
            // 自动跳转到登录页面（在render()中）
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight:'100%'}}>
              <Sider>
                  <LeftNav/>
              </Sider>
              <Layout>
                <Header>Header</Header>
                <Content style={{margin:'20px', backgroundColor:'#fff'}}>
                  <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/category' component={Category}/>
                    <Route path='/product' component={Product}/>
                    <Route path='/role' component={Role}/>
                    <Route path='/user' component={User}/>
                    <Route path='/chars/bar' component={Bar}/>
                    <Route path='/chars/line' component={Line}/>
                    <Route path='/chars/pie' component={Pie}/>
                    <Redirect to='/home'/>
                  </Switch>
                </Content>
                <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验！</Footer>
              </Layout>
            </Layout>
        )
    }
}
