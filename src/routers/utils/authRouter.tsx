import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '@/utils/util';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const { authorization } = getToken();
  if (location.pathname !== '/login' && !authorization)
    return <Navigate to="/login" replace />;
  if (location.pathname === '/login' && authorization)
    return <Navigate to="/home" replace />;
  // if ((location.pathname = '/login' && authorization)) return <ToHome />;

  return props.children;
};

export default AuthRouter;
