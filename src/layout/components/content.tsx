import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;
function LayoutContent(props: any) {
  const { colorBgContainer } = props;
  return (
    <Content style={{ margin: '0 16px' }}>
      <div
        style={{
          minHeight: 'calc(100vh - 160px)',
          background: colorBgContainer,
        }}
      >
        <Outlet />
      </div>
    </Content>
  );
}

export default LayoutContent;
