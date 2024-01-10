import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './pages/account/account'
import { RouterProvider } from 'react-router-dom'
import { globalRouters } from './router'
import { ConfigProvider } from 'antd'
import { store } from './store'
import { Provider } from 'react-redux'
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN'
// 全局样式
import '@/common/styles/frame.styl'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <React.StrictMode>
        <RouterProvider router={globalRouters} />
      </React.StrictMode>,
    </ConfigProvider>
  </Provider>


)
