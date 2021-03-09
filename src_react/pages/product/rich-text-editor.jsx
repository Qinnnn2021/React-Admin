import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Editor } from 'react-draft-wysiwyg'
import {ContentState, convertToRaw, EditorState} from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

// 用来指定商品详情的富文本编程器组件
export default class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }
    state = {
      // 创建一个没有内容的编辑对象
      editorState: EditorState.createEmpty()
    }

    constructor(props) {
      super(props)
      const html = this.props.detail
      if (html) {  //如果有值创建包含内容的html对象
        const contentBlock = htmlToDraft(html)
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editorState = EditorState.createWithContent(contentState)
            this.state = {
              editorState,
            }
          }
        } else {
          this.state = {
          editorState: EditorState.createEmpty()
        }
      } 
    }
      


    // 输入过程中实时的回调
    onEditorStateChange = (editorState) => {
        this.setState({editorState})
    }

    getDetail = () => {
      // 返回输入数据对应的html格式的文本
      return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }

    uploadImageCallback = (file) => {
      return new Promise(
        (resolve,reject) => {
          const xhr = new XMLHttpRequest()
          xhr.open('POST','/manage/img/upload')
          const data = new FormData()
          data.append('image',file)
          xhr.send(data)
          xhr.addEventListener('load',()=>{
            const response = JSON.parse(xhr.responseText)
            const url = response.data.url  //得到图片的url
            resolve({data:{link:url}})
          })
          xhr.addEventListener('load',()=>{
            const error = JSON.parse(xhr.responseText)
            reject(error)
          })
        }
      )
    }

    render() {
        const {editorState} = this.state
        return (
              <Editor
                editorState={editorState}
                editorStyle={{border: '1px solid #ddd', minHeight: 200, paddingLeft: 10}}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  image: {uploadCallback: this.uploadImageCallback,alt: {present: true, mandatory: true}}
                }}
              />
        )
    }
}
