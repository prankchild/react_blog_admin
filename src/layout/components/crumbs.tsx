import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { routes } from '@/routers';
import { RouteObject } from '@/routers/interface';

function LayoutCrumbs() {
  const { pathname } = useLocation();
  const pathList: Array<string> = pathname.split('/').slice(1) as [string];
  // 获取面包屑
  const getBreadcrumb = () => {
    const breadcrumb = [];
    let cache: Array<RouteObject> = routes;
    for (const key in pathList) {
      const index: number = cache.findIndex((item: RouteObject) => {
        if (item.meta && item.meta.key === (pathList[key] as string)) {
          return true;
        }
        return false;
      });
      if (index !== -1) {
        breadcrumb.push(cache[index]?.meta?.title);
        cache = cache[index].children as RouteObject[];
      }
    }
    return breadcrumb;
  };
  const breadcrumb = getBreadcrumb();
  return (
    <div className="crumbs ml-6">
      <Breadcrumb style={{ margin: '8px 0' }} separator=">">
        {/* <Breadcrumb.Item>User</Breadcrumb.Item>
      <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
        {breadcrumb.map((item, index) => {
          return (
            <Breadcrumb.Item key={item} className="text-sm">
              {item}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
}

export default LayoutCrumbs;
