import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/views/home/home';

const LayoutIndex = () => <Layout />;
const UserList = lazy(
  () => import('@/views/basicInformation/userManagement/userManagement')
);
const RoleList = lazy(
  () => import('@/views/basicInformation/roleManagement/roleManagement')
);
const MenuList = lazy(
  () => import('@/views/basicInformation/menuManagement/menuManagement')
);
const basicInformation = [
  {
    path: '/',
    element: <LayoutIndex />,
    meta: {
      title: '基础信息管理',
      key: 'basicInformation',
    },
    children: [
      {
        path: '/basicInformation/menuManagement',
        element: routeWithLoading(<MenuList />),
        meta: {
          title: '菜单管理',
          key: 'menuManagement',
        },
      },
      {
        path: '/basicInformation/roleManagement',
        element: routeWithLoading(<RoleList />),
        meta: {
          title: '角色管理',
          key: 'roleManagement',
        },
      },
      {
        path: '/basicInformation/userManagement',
        element: routeWithLoading(<UserList />),
        meta: {
          title: '用户管理',
          key: 'userManagement',
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
