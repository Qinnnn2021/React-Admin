import React, { Component } from 'react'
import {Card,Button} from 'antd'
import ReactEchars from 'echarts-for-react'

// 柱形图
export default class Bar extends Component {

    state = {
      // 销量的数组
      sales: [5, 20, 36, 10, 10, 20],
      // 库存的数组
      stores: [15, 23, 43, 16, 14, 29]
    }

    // 更新回调
    update = () => {
      this.setState(state => ({
        sales: state.sales.map(sale => sale + 1),
        stores: state.stores.reduce((pre,store)=>{
          pre.push(store - 1)
          return pre
        },[])
      }))
    }

    // 返回柱状图的配置对象
    getOption = (sales,stores) => {
        return {
              title: {
                  text: 'ECharts 入门示例'
              },
              tooltip: {},
              legend: {
                  data:['销量','库存']
              },
              xAxis: {
                  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
              },
              yAxis: {},
              series: [{
                  name: '销量',
                  type: 'bar',
                  data: sales
              },
              {
                name: '库存',
                type: 'bar',
                data: stores
              }]
          }
        
      }

    render() {
        const {sales,stores} = this.state
        return (
            <div>
              <Card>
                <Button onClick={this.update} type='primary'>更新</Button>
              </Card>
              
              <Card title='柱状图'>
                <ReactEchars style={{marginTop: '70px'}} option={this.getOption(sales,stores)}/>
              </Card>
            </div>
        )
    }
}
