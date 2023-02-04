import { Navigate, useLocation } from 'react-router-dom';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const location = useLocation();
  console.log(props, 'props');
  //   const route = searchRoute(pathName,rootRouer)
  const token = localStorage.getItem('token');
  // if (!token) return <Navigate to={'/login'} replace></Navigate>;
  return props.children;
};

export default AuthRouter;
