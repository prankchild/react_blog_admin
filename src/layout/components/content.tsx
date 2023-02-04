import { useRoutes } from 'react-router-dom';
import { Layout } from 'antd';
import routes from '@/router';
import LayoutCrumbs from './crumbs';

const { Content } = Layout;
function LayoutContent(props: any) {
  const outlet = useRoutes(routes);
  const { colorBgContainer } = props;
  return (
    <Content style={{ margin: '0 16px' }}>
      <LayoutCrumbs />
      <div
        style={{
          padding: 24,
          minHeight: 'calc(100vh - 160px)',
          background: colorBgContainer,
        }}
      >
        {outlet}
      </div>
    </Content>
  );
}

export default LayoutContent;
