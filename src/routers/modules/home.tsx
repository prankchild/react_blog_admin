import React from 'react';
import Layout from '@/layout';
import Home from '@/views/home/home';

const LayoutIndex = () => <Layout />;
const home = [
  {
    path: '/',
    element: <LayoutIndex />,
    meta: {
      title: '首页',
      key: 'home',
    },
    children: [
      {
        path: '/home',
        element: <Home />,
        meta: {
          title: '首页',
          key: 'home',
        },
      },
    ],
  },
];

export default home;
