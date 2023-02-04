import React from 'react';
import { Layout } from 'antd';
import LayoutContent from './components/content';
import LayoutFooter from './components/footer';
import LayoutHeader from './components/header';
import LayoutSider from './components/sider';

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <LayoutSider></LayoutSider>
      <Layout className="site-layout">
        <LayoutHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};

export default App;
