import React from 'react';
import ReactDOM from 'react-dom/client';
// 状态管理工具
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';
import 'animate.css';
import { PersistGate } from 'redux-persist/integration/react';
import 'reset-css';
import App from './App';
import './assets/styles/antd.scss';
import './assets/styles/main.scss';
import { persistor, store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <Provider store={store}>
  //   <React.StrictMode>
  //     <App />
  //   </React.StrictMode>
  // </Provider>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
