import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { theme } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import { log } from 'console';

const menuItems = [
  {
    label: '首页',
    key: '/home',
    icon: <PieChartOutlined />,
  },
  {
    label: '基础信息管理',
    key: '/basicInformation',
    icon: <PieChartOutlined />,
    children: [
      {
        label: '菜单管理',
        key: '/basicInformation/menuManagement/menuList',
        icon: <PieChartOutlined />,
      },
      {
        label: '角色管理',
        key: '/basicInformation/roleManagement/roleList',
        icon: <PieChartOutlined />,
      },
      {
        label: '用户管理',
        key: '/basicInformation/userManagement/userList',
        icon: <PieChartOutlined />,
      },
    ],
  },
  {
    label: '文章管理',
    key: '/articleManagement',
    icon: <PieChartOutlined />,
    children: [
      {
        label: '文章列表',
        key: '/articleManagement/articleList',
        icon: <PieChartOutlined />,
      },
    ],
  },
];
function LayoutMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  // 获取刚进入页面时如若有嵌套则获取父元素
  const currentOpenKey = '/' + location.pathname.split('/')[1];
  const [defaultKey, setDefaultKey] = useState(location.pathname);
  const [openKey, setOpenKey] = useState([currentOpenKey]);
  const onMenuChange = (value: { key: string }) => {
    navigate(value.key);
  };
  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[defaultKey]}
      defaultOpenKeys={openKey}
      mode="inline"
      items={menuItems}
      onClick={onMenuChange}
    />
  );
}
export default LayoutMenu;
