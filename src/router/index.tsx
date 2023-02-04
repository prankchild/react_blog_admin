import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Home from '@/views/home/home';

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
const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    ptah: '/home',
    element: <Home />,
  },
  {
    path: '/basicInformation/userManagement/userList',
    element: routeWithLoading(<UserList />),
  },
  {
    path: '/basicInformation/roleManagement/roleList',
    element: routeWithLoading(<RoleList />),
  },
  {
    path: '/basicInformation/menuManagement/menuList',
    element: routeWithLoading(<MenuList />),
  },
  {
    path: '/articleManagement/articleList',
    element: routeWithLoading(<ArticleList />),
  },
];
export default routes;
function routeWithLoading(component: JSX.Element) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {component}
    </React.Suspense>
  );
}
