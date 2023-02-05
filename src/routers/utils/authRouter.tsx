import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/layout/index';
import Home from '@/views/home/home';
import Login from '@/views/login/login';
import { getToken } from '@/utils/util';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const location = useLocation();
  console.log(props, 'props');
  //   const route = searchRoute(pathName,rootRouer)
  const { authorization } = getToken();
  if (location.pathname !== '/login' && !authorization)
    return <Navigate to="/login" replace />;
  if (location.pathname === '/login' && authorization)
    return <Navigate to="/home" replace />;
  // if ((location.pathname = '/login' && authorization)) return <ToHome />;

  return props.children;
};

export default AuthRouter;
