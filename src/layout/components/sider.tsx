import { useState } from 'react';
import { Layout } from 'antd';
import LayoutMenu from './menu';

const { Sider } = Layout;

function LayoutSider() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
        }}
      />
      <LayoutMenu />
    </Sider>
  );
}

export default LayoutSider;
