import React, { Component } from 'react'
import {Row,Col, Button} from 'antd'

export default class NotFound extends Component {
    goHome = () => {
      this.props.history.replace('/home')
    }
    render() {
        return (
          <Row className='not-found'>
            <Col span={12} className='left'></Col>
            <Col span={12} className='right'>
              <h1>404</h1>
              <h2>抱歉 您所访问的界面不存在</h2>
              <div>
                <Button type='primary' onClick={this.goHome}>
                  回到首页
                </Button>
              </div>
            </Col>
          </Row>
        )
    }
}


