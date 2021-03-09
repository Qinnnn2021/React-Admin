
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'

import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import store from './redux/store'

// 读取local中保存的user 保存到内存中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'))
