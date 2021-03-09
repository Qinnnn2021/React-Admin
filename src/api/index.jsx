/* 
要求： 能够根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
  每个函数的返回值都是promise

  基本要求：能够根据接口文档定义接口请求函数
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

const BASE = ''

// 登录接口
/* export function reqLogin(username,password) {
  return ajax('/login',{username,password},'POST')
} */
export const reqLogin = (username,password) => ajax(BASE + '/login',{username,password},'POST')

// 添加新用户
// export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')

// jsonp请求的接口请请求函数  获取天气查询的接口
export const reqWeather = (cityCode) => {

  return new Promise((resolve,reject)=>{
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=36cc4d40112f012a9568e75cd1d8332e`
    // 发送jsonp请求
    jsonp(url,{},(err,data)=>{
      // console.log(err,data);
      // 如果成功了
      if (!err && data.status === '1') {
        const {weather} = data.lives[0]
        // console.log(weather);
        resolve(weather)
      } else {
        // 如果失败了
        message.error('获取天气信息失败...')
      }
    })
  })
  
}
// reqWeather(110101)

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})
// 添加分类
export const reqAddCategorys = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')

// 更新分类
export const reqUpdateCategorys = ({categoryId,categoryName}) => ajax(BASE + '/manage/category/update',{categoryName,categoryId},'POST')

// 获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE+'/manage/product/list',{pageNum,pageSize})

// 搜索商品分页列表 (根据商品名称 / 商品描述)
// searchType: 搜索的类型, productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(BASE+'/manage/product/search',{
  pageNum,pageSize,
  // 将一个变量的值变成属性名 就要加[]
  [searchType]: searchName
})

// 搜索商品分页列表 (根据商品描述)
// export const reqSearchProducts2 = ({pageNum,pageSize,searchName}) => ajax(BASE+'/manage/product/search',{
//   pageNum,pageSize,productDesc: searchName
// })

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info',{categoryId})

// 更新商品的状态(上架或下架)
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'POST')

// 删除指定名称图片的接口
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')

// 添加或者修改商品
// export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + (product._id ? 'update':'add') ,product,'POST')
// debugger
export const reqAddProduct = (product) => ajax(BASE + '/manage/product/add',product,'POST')

// 修改商品
export const reaUpdateProduct = (product) => ajax(BASE+'/manage/product/update',product,'POST')

// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')

// 添加角色
export const reqAddRole = (roleName) => ajax(BASE+'/manage/role/add',{roleName},'POST')

// 更新角色
export const reqUpdateRole = (role) => ajax(BASE+'/manage/role/update',role,'POST')

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE+'/manage/user/list')

// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE+'/manage/user/delete',{userId},'POST')

//添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE+'/manage/user/'+(user._id?'update':'add'),user,'POST')

     