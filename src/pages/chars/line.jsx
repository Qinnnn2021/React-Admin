import React, { Component } from 'react'
import {Card,Button} from 'antd'
import ReactEchars from 'echarts-for-react'

// 柱形图
export default class Line extends Component {

    state = {
      // 销量的数组
      datas: [820, 987, 901, 1074, 1290, 1330, 1590],
      // 库存的数组
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }

    // 更新回调
    update = () => {
      this.setState(state => ({
        datas: state.datas.map(data => data + Math.floor(Math.random() * 500 + 1)),
      }))
    }

    // 返回折线图的配置对象
    getOption = (datas,days) => {
        return {
            title: {
                text: '动态数据 + 时间坐标轴'
            },
            xAxis: {
                type: 'category',
                data: days
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: datas,
                type: 'line',
                smooth: true
            }]
        };
        
      }

    render() {
        const {datas,days} = this.state
        return (
            <div>
              <Card>
                <Button onClick={this.update} type='primary'>更新</Button>
              </Card>
              
              <Card title='折线图'>
                <ReactEchars style={{marginTop: '70px'}} 
                  option={this.getOption(datas,days)}/>
              </Card>
            </div>
        )
    }
}
