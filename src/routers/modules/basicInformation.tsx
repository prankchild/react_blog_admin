import React, { lazy } from 'react';
import Layout from '@/layout';
import Home from '@/views/home/home';

const LayoutIndex = () => <Layout />;
const UserList = lazy(
  () => import('@/views/basicInformation/userManagement/userList/userList')
);
const RoleList = lazy(
  () => import('@/views/basicInformation/roleManagement/roleList/roleList')
);
const MenuList = lazy(
  () => import('@/views/basicInformation/menuManagement/menuList/menuList')
);
const ArticleList = lazy(
  () => import('@/views/articleManagement/articleList/articleList')
);
const basicInformation = [
  {
    path: '/',
    element: <LayoutIndex />,
    meta: {},
    children: [
      {
        path: '/home',
        element: <Home />,
        meta: {
          name: '首页',
        },
      },
      {
        path: '/basicInformation/roleManagement/roleList',
        element: routeWithLoading(<RoleList />),
        meta: {},
      },
      {
        path: '/basicInformation/menuManagement/menuList',
        element: routeWithLoading(<MenuList />),
      },
      {
        path: '/basicInformation/articleManagement/articleList',
        element: routeWithLoading(<ArticleList />),
      },
      {
        path: '/basicInformation/userManagement/userList',
        element: routeWithLoading(<UserList />),
        meta: {
          name: '用户列表',
        },
      },
    ],
  },
];

export default basicInformation;
function routeWithLoading(component: JSX.Element) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {component}
    </React.Suspense>
  );
}
