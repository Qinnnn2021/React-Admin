// 包含n个用来创建action的工厂函数(action creator)
//  同步action: 对象 {type:'xxx',data: 数据值}
//  异步action: 函数 dispatch => {}


import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG
} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'

// 设置头部标题的同步action对象
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE, data: headTitle})

// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER,user})

// 显示错误信息的同步action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG,errorMsg})

// 登录的异步action 
export const login = (username,password) => {
  return async dispatch => {
    // 1、执行异步ajax请求
    const result = await reqLogin(username,password)  
    //{status: 0,data: user} {status: 1,msg: 'xxx'}
    // 2.1、如果成功 分发成功的同步action
    if (result.status === 0){
      const user = result.data
      //保存user
      storageUtils.saveUser(user)
      //分发接收用户的同步action
      dispatch(receiveUser(user))
    }
    // 2.2、如果失败 分发失败的同步action
    const msg = result.msg
    dispatch(showErrorMsg(msg))
  }
}
