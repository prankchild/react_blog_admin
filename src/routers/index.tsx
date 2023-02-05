import React, { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '@/layout';
import Home from '@/views/home/home';
import Login from '@/views/login/login';

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

const LayoutIndex = () => <Layout />;
const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <LayoutIndex />,
    children: [
      {
        path: '/home',
        element: <Home />,
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
        path: '/basicInformation/articleManagement/articleList',
        element: routeWithLoading(<ArticleList />),
      },
      {
        path: '/basicInformation/userManagement/userList',
        element: routeWithLoading(<UserList />),
      },
    ],
  },
  {
    path: '*',
    element: <Login />,
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
function routeWithLoading(component: JSX.Element) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {component}
    </React.Suspense>
  );
}
