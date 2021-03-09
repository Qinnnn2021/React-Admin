import React,{Component} from 'react'
import {Form,Input,Tree} from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'


const Item = Form.Item 

// 创建角色的form组件
export default class AuthForm extends Component {

    static propTypes = {
      role: PropTypes.object
    }

    // state = {
    //     treeData: [{
    //         title: '平台权限',
    //         key: 'all',
    //         children: []
    //     }],
    //     checkedKeys:[]
    // }

    constructor(props) {
      super(props)
      // console.log('role',this.props.role);
      const {menus} = this.props.role

      this.state = {
        treeData: [{
          title: '平台权限',
          key: 'all',
          children: []
      }],
        checkedKeys: menus,
      }
      // console.log('menus',menus);
      // console.log('state-checkedKeys',this.state.checkedKeys);
    }

    getTreeNodes = (menuList) => {
      return menuList.reduce((pre,item)=>{
        pre.push(
          {
            title: item.title,
            key: item.key,
            children: item.children ? this.getTreeNodes(item.children):null
          }
        )
        return pre
      },[])
    }

    // 为父组件获取最新menus的方法
    getMenus = () => this.state.checkedKeys
    

    // 选中某个node 
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        // setCheckedKeys(checkedKeys);
        this.setState({checkedKeys})
    };

    // 根据新传入的role来更新checkedKeys状态
    // 当组件接收到新的属性时自动调用
    UNSAFE_componentWillReceiveProps(nextProps){
      const menus = nextProps.role.menus
      this.setState({
        checkedKeys: menus
      })
      // this.state.checkedKeys = menus
    }


    UNSAFE_componentWillMount(){
        //   this.state.treeData[0].children = this.getTreeNodes(menuList)
        let treeDatas = this.state.treeData
        treeDatas[0].children = this.getTreeNodes(menuList)
        this.setState({
        treeData: treeDatas
        })

    } 
    
    render() {
      const {role} = this.props
      const {treeData,checkedKeys} = this.state
      // console.log('render之前,',checkedKeys);
      // console.log('render',this.state.checkedKeys);
        // console.log('treeData',treeData);
        return (
            <div>
              <Item label='角色名称'>
                <Input value={role.name} disabled/>
              </Item>
              <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={{checked:checkedKeys}}
                onCheck={this.onCheck}
                treeData={treeData} 
                />
            </div>
        )
    }
}

// import React, { useState } from 'react';
// import { Tree } from 'antd';
// const treeData = [
//   {
//     title: '0-0',
//     key: '0-0',
//     children: [
//       {
//         title: '0-0-0',
//         key: '0-0-0',
//         children: [
//           {
//             title: '0-0-0-0',
//             key: '0-0-0-0',
//           },
//           {
//             title: '0-0-0-1',
//             key: '0-0-0-1',
//           },
//           {
//             title: '0-0-0-2',
//             key: '0-0-0-2',
//           },
//         ],
//       },
//       {
//         title: '0-0-1',
//         key: '0-0-1',
//         children: [
//           {
//             title: '0-0-1-0',
//             key: '0-0-1-0',
//           },
//           {
//             title: '0-0-1-1',
//             key: '0-0-1-1',
//           },
//           {
//             title: '0-0-1-2',
//             key: '0-0-1-2',
//           },
//         ],
//       },
//       {
//         title: '0-0-2',
//         key: '0-0-2',
//       },
//     ],
//   },
//   {
//     title: '0-1',
//     key: '0-1',
//     children: [
//       {
//         title: '0-1-0-0',
//         key: '0-1-0-0',
//       },
//       {
//         title: '0-1-0-1',
//         key: '0-1-0-1',
//       },
//       {
//         title: '0-1-0-2',
//         key: '0-1-0-2',
//       },
//     ],
//   },
//   {
//     title: '0-2',
//     key: '0-2',
//   },
// ];

// const  AuthForm = () => {
//   const [expandedKeys, setExpandedKeys] = useState(['0-0-0', '0-0-1','0-1']);
//   const [checkedKeys, setCheckedKeys] = useState(['0-0-0']);
//   const [selectedKeys, setSelectedKeys] = useState([]);
//   const [autoExpandParent, setAutoExpandParent] = useState(true);

//   const onExpand = (expandedKeys) => {
//     console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
//     // or, you can remove all expanded children keys.

//     setExpandedKeys(expandedKeys);
//     setAutoExpandParent(false);
//   };

//   const onCheck = (checkedKeys) => {
//     console.log('onCheck', checkedKeys);
//     setCheckedKeys(checkedKeys);
//   };

//   const onSelect = (selectedKeys, info) => {
//     console.log('onSelect', info);
//     setSelectedKeys(selectedKeys);
//   };

//   return (
//     <Tree
//       checkable
//       onExpand={onExpand}
//       expandedKeys={expandedKeys}
//       autoExpandParent={autoExpandParent}
//       onCheck={onCheck}
//       checkedKeys={checkedKeys}
//       onSelect={onSelect}
//       selectedKeys={selectedKeys}
//       treeData={treeData}
//     />
//   );
// };

// export default AuthForm

