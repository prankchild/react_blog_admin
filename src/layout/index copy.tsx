import { useRoutes } from 'react-router-dom';
import routes from '@/router';

function Layout() {
  const Outlet = useRoutes(routes);
  return <div>{Outlet}</div>;
}

export default Layout;
