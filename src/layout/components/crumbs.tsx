import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { routes } from '@/routers';

function LayoutCrumbs() {
  const { pathname } = useLocation();
  const index = routes.findIndex((item) => item.meta?.default === true);
  const pathList = pathname.split('/').slice(1);
  console.log(pathList, 'pathList');
  const router = routes[index];
  const breadcrumb = [];
  return (
    <Breadcrumb style={{ margin: '8px 0' }} separator=">">
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default LayoutCrumbs;
