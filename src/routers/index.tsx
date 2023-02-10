import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Login from '@/views/login/login';
import basicInformation from './modules/basicInformation';
import home from './modules/home';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  ...home,
  ...basicInformation,
  {
    path: '*',
    element: <Login />,
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
