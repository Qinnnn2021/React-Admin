import React, { Component } from 'react'
import {Card,Select,Input,Button,Table, message} from 'antd'
import {PlusOutlined} from  '@ant-design/icons'

import LinkButton from '../../components/link-button'
import { reqProducts,reqSearchProducts,reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constants'


const Option = Select.Option

// Product的默认子路由组件
export default class ProductHome extends Component {

    state = {
        products: [], //商品的数组
        total: 0,  //商品的总数量
        loading: false,  //标识数据正在加载
        searchName: '',  //搜索的关键字
        searchType: 'productName',  //根据哪个字段进行搜索
    }
    
    // 初始化table表格的列的数组
    initColumns = () => {
      this.columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
        },
        {
          title: '价格',
          dataIndex: 'price',
          render: (price) => '￥' + price //当前指定了对应的属性 传入的是对应的属性值
        },
        {
            width: '100px',
            title: '状态',
            // dataIndex: 'status',

            render: (product) => {
              const {status,_id} = product
              return (
                <span>
                    <Button onClick={()=>{this.updateStatus(_id,status===1?2:1)}} 
                    type='primary'>{status===1?'下架':'上架'}</Button>
                    <span>{status===1?'在售':'已下架'}</span>
                </span>
              )
            }
          },
          {
            width: '100px',
            title: '操作',
            render: (product) => {
              return (
                <span>
                  {/* 将product 对象使用state传递给目标路由组件 */}
                  <LinkButton onClick={()=>{this.props.history.push('/product/detail', {product} )}}>详情</LinkButton>
                  <LinkButton onClick={()=>this.props.history.push('/product/addupdate',product)}>修改</LinkButton>
                </span>
              )
            }
          },
      ];
      
    }

    // 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {

      // 保存当前页码为下面更新商品状态中重新更新页面准备
      this.pageNum = pageNum

      // 发请求之前改为true 显示loading 
      this.setState({loading:true})
      
      const {searchName,searchType} = this.state
      // 如果搜索关键字有值，说明我们要做搜索分页
      let result
      if (searchName) {
        result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
      } else {  //一般分页
        result = await reqProducts(pageNum,PAGE_SIZE)
      }

      // 发完请求之后标识loading 
      this.setState({loading:false})
      
      if (result.status === 0) {
        // 取出分页数据 更新状态 显示分页列表
        const {total,list} = result.data
        this.setState({
          total,
          products: list
        })
      }
    }

    // 更新商品指定的状态
    updateStatus = async (productId,status) => {
      const result = await reqUpdateStatus(productId,status)
      if (result.status===0) {
        message.success('更新状态成功')
        // 重新渲染页面
        this.getProducts(this.pageNum)
      }
    }

    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    // 发请求动态获取商品信息
    componentDidMount() {
      this.getProducts(1)
    }

    render() {

        // 取出状态数据
        const {products,total,loading,searchName,searchType} = this.state
        // console.log('样式不对',products);

        const title = (
          <span>
            <Select value={searchType} style={{width:120}}
            onChange={value => this.setState({searchType:value})}>
              <Option value='productName'>按名称搜索</Option>
              <Option value='productDesc'>按描述搜索</Option>
            </Select>
            <Input onChange={e => this.setState({searchName:e.target.value})}
            value={searchName} placeholder='关键字' style={{width:150,margin: '0 15px'}}/>
            <Button onClick={()=>{this.getProducts(1)}} type='primary'>搜索</Button>
          </span>
        )

        const extra = (
            <Button 
             onClick={() => this.props.history.push('/product/addupdate')}
             type='primary'>
              <PlusOutlined/>
              添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
              <Table 
              loading={loading}
              bordered
              rowKey='_id' 
              dataSource={products}
              columns={this.columns}
              pagination={{
                current: this.pageNum,
                defaultPageSize:PAGE_SIZE,
                showQuickJumper: true,
                total,
                onChange:this.getProducts}}/>
            </Card>
        )
    }
}
