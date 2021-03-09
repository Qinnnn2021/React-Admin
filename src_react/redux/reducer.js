// reducer函数模块： 根据当前的state和指定action返回一个新的state

import {combineReducers} from 'redux'
import storageUtils from '../utils/storageUtils'

import {
  SET_HEAD_TITLE,
  RECEIVE_USER,
  SHOW_ERROR_MSG
} from './action-types'

// 管理headTitle状态数据的reducer
const initHeadTitle = '首页'
function headTitle(state=initHeadTitle,action){
  switch(action.type) {
    case SET_HEAD_TITLE:
      return action.data
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
    //   state.errorMsg = errorMsg  不要直接修改原本的状态数据
      return {...state,errorMsg}
    default:
      return state
  }
}

// 管理user状态数据的reducer
const initUser = storageUtils.getUser()
function user(state = initUser,action){
  switch(action.type) {
    case RECEIVE_USER:
      return action.user
    default:
      return state
  }
}


//默认向外暴露的是合并成一个对象之后的reducer
// 其中各自reducer是这个合并reducer对象的属性
export default combineReducers({
  headTitle,
  user
})