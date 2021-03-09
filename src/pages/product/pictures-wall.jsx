import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Modal, message } from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import { reqDeleteImg } from '../../api'

// 用于图片上传的组件

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false,   //用来标识是否显示大图预览Modal
    previewImage: '',   //大图的url
    fileList: [
      /* {
        uid: '-1',  //文件的唯一标识 建议设置为负数 以防和内部id产生冲突
        name: 'image.png',  //文件名
        status: 'done',   //状态之一
        // done: 已经完成上传  uploading: 正在上传中  removed: 已删除
        // 图片地址
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }, */
    ],
  };

  constructor(props){

    super(props)

    let fileList = []

    // 如果传入了imgs属性
    const {imgs} = this.props
    if (imgs && imgs.length > 0 ) {
      fileList = imgs.map((img,index) => ({
        uid: -index,
        name: img,
        status: 'done',
        url: 'http:localhost:5000/upload/' + img
      }))
    }

    // 初始化状态
    this.state = ({
      previewVisible: false, 
      previewImage: '',
      fileList  
    })
  }

  //   获取所有已上传图片文件名的数组
  getImgs = () => {
      return this.state.fileList.map(file => file.name)
  }

  //隐藏Modal
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    // 显示指定file的大图
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  //file: 当前操作的图片文件（上传/删除）
//  fileList: 所有已上传图片文件对象的数组
  handleChange = async ({ file, fileList }) => {

    // console.log('handleChange',file.status,file,);

    // console.log(file === fileList[fileList.length-1]);   false
    // 这两个是同一个文件 但是指向两个内容一致的对象 

    //  一旦上传成功 将当前上传的file的信息修正(name url)
    if (file.status === 'done') {
        const result = file.response    //{status: 0,data:{name:'xxx',url:'图片地址'}}
        if (result.status === 0) {
            message.success('上传图片成功')
            const {name,url} = result.data
            file = fileList[fileList.length-1]
            file.name = name
            file.url = url
        } else {
            message.error('上传图片失败')
        }
    } else if (file.status === 'removed') {
        // 删除图片的操作
        const result = await reqDeleteImg(file.name)
        if (result.status === 0) {
            message.success('删除图片成功')
        } else {
            message.error('删除图片失败')
        }
    }

    //   在操作(上传/删除)过程中更新fileList的状态
    this.setState({ fileList })
    };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined /> 
        <div>Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"  //上传图片的接口地址
          accept='image/*'   //只接收图片格式
          name='image'   //请求参数名
          listType="picture-card"  //卡片样式
          fileList={fileList}    //所有已经上传的文件列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
