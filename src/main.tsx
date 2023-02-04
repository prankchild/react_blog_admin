import React from 'react';
import ReactDOM from 'react-dom/client';
// 定义当前项目的路由模式
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/reset.css';
import 'animate.css';
import 'reset-css';
import App from './App';
import './assets/styles/antd.scss';
import './assets/styles/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
