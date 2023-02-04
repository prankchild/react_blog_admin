import { Breadcrumb } from 'antd';

function LayoutCrumbs() {
  return (
    <Breadcrumb style={{ margin: '8px 0' }}>
      <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default LayoutCrumbs;
