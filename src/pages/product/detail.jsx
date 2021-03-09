import React, { Component } from 'react'
import {Card,List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';

import LinkButton from '../../components/link-button'
// import {BASE_IMG_URL} from '../../utils/constants'
import  {reqCategory} from '../../api/index'

const Item = List.Item

// Product 的详情子路由组件
export default class ProductDetail extends Component {

  // 定义状态储存两个分类名称
  state = {
    cName1: '',  //一级分类名称
    cName2: '',  //二级分类名称
  }

  // 异步发送请求
  async componentDidMount() {
    // 取出两个分类名称ID数值
    const {pCategoryId,categoryId} = this.props.location.state.product
    // 进行一级分类及二级分类的名称判断
    if (pCategoryId === '0') {
      // 说明显示的是一级分类的商品
      const result = await reqCategory(categoryId)
      // 得到分类名称
      const cName1 = result.data.name
      // 更新状态对象
      this.setState({cName1})
    } else {
      /* 
      // 通过多个await方式发送多个请求：效果不影响但存在效率问题
      // 即：后一个请求必须在前一个请求发送后得到响应结果之后才会发送

      // 二级分类下的产品
      const result1 = await reqCategory(pCategoryId)
      const result2 = await reqCategory(categoryId)
      // 得到分类名称
      const cName1 = result1.data.name
      const cName2 = result2.data.name 
      */

      // 解决方法：一次性发送多个请求 只有都成功了才正常处理
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name 

      // 更新状态
      this.setState({cName1,cName2})

    }
  }

  render() {
      // console.log('detail',this.props.location.state.product);

    // 读取携带过来的state数据
    const {name,desc,price} = this.props.location.state.product
    // console.log('detail',detail);

    const {cName1,cName2} = this.state

    const title = (
      <span>
          <LinkButton>
            <ArrowLeftOutlined 
            style={{marginRight:10,fontSize:20}}
            onClick={()=>this.props.history.goBack()}/>
          </LinkButton>
        <span>商品详情</span>
      </span>
    )
  return (
    <Card title={title} className='product-detail'>
      <List>
          <Item>
            <p className='left'>商品名称:</p>
            <p className='left-desc'>{name}</p>
          </Item>
          <Item>
            <p className='left'>商品描述:</p>
            <p className='left-desc'>{desc}</p>
          </Item>
          <Item>
            <p className='left'>商品价格:</p>
            <p className='left-desc'>{price}</p>
          </Item>
          <Item>
            <p className='left'>所属分类:</p>
            <p className='left-desc'>{cName1} {cName2 ? '--->' + cName2 : ''}</p>
          </Item>
          <Item>
            <p className='left'>商品图片:</p>
            <p className='left-desc'>
            {/* {
              imgs.map(img => {
                  return(
                    <img 
                    key={img}
                    className='product-img'
                    src={BASE_IMG_URL + img} alt="图片1"
                    style={{width:200,height:200}}
                    /> 
                  )
              })
            } */}
              <img 
              className='product-img'
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2343860813,4292986121&fm=15&gp=0.jpg" alt="图片1"
              />
              <img className='product-img'
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2343860813,4292986121&fm=15&gp=0.jpg" alt="图片"
              />
            </p>
          </Item>
          <Item>
            <p className='left'>商品详情:</p>
            {/* <span dangerouslySetInnerHTML={{__html: detail}}></span> */}
            <p className='left-desc' dangerouslySetInnerHTML={{__html: name}}></p>
          </Item>
      </List>
    </Card>
    )
  }
}
