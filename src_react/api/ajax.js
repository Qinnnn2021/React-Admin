// 可以发送异步ajax请求的函数模块 封装ajax库
// 函数的返回值是一个promise对象

/* 
  1、优化1：统一处理请求异常
      在外层包一个自己创建的promise对象
      在请求出错时 不执行reject(error) 而是显示错误提示
  
  2、优化2：异步得到不是reponse 而是response.data
      在请求成功resolve时：resolve(response.data)
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){

  return new Promise((resolve,reject)=>{
    let promise

    // 1、执行异步ajax请求
    if (type === 'GET') { //发送GET请求
      promise = axios.get(url,{ //配置对象
          params: data   //指定请求参数
      })
    } else {　//发送POST请求
      promise = axios.post(url,data)
    }
    promise.then(response=>{
      // 2、如果成功了 调用resolve(value)
      resolve(response.data)
    }).catch(error=>{
    // 3、如果失败了 不调用reject(reason) 而是提示异常信息
      message.error('请求出错了：' + error.message)
    })

  })

}

// 请求登录接口
// ajax('/login',{username:'tom',password:'12345'},'POST').then
// 添加用户
// ajax('/manage/user/add',{username:'tom',password:'12345',phone:'13765433456'},'POST').then