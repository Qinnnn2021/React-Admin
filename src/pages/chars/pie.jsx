import React, { Component } from 'react'
import {Card,Button} from 'antd'
import ReactEchars from 'echarts-for-react'

// 柱形图
export default class Line extends Component {

    state = {
      // 库存的数组
      categorys: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    }

    // 更新回调
    update = () => {
      this.setState(state => ({
        radiuses: state.radiuses.map(radius => radius.value + Math.floor(Math.random() * 10 + 1)),
        areas: state.areas.map(area => area.value + Math.floor(Math.random() * 10 + 1)),
      }))
    }

    // 返回折线图的配置对象
    getOption = () => {
        return  {
            // height: '460px',
            title: {
                text: '某站点用户访问来源',
                // subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: '50%',
                    data: [
                        {value: 1048, name: '搜索引擎'},
                        {value: 735, name: '直接访问'},
                        {value: 580, name: '邮件营销'},
                        {value: 484, name: '联盟广告'},
                        {value: 300, name: '视频广告'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
      }

    render() {
        // const {categorys,radiuses,areas} = this.state
        return (
            <div>
              <Card>
                <Button onClick={this.update} type='primary'>更新</Button>
              </Card>
              
              <Card title='饼型图'>
                <ReactEchars style={{marginTop: '70px'}}
                  option={this.getOption()}/>
              </Card>
            </div>
        )
    }
}
