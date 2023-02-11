import { useEffect, useState } from 'react';
import { message, Modal, Tree } from 'antd';
import api from '@/api';

const title = '分配权限';
const RolePermissions = (props: any) => {
  const { rolePermissionsData, rolePermissionsChange } = props;
  useEffect(() => {
    if (rolePermissionsData.show) {
      findRoleMenu(rolePermissionsData.params.id);
      searchMenuList();
    }
  }, [rolePermissionsData]);
  const handleOk = async () => {
    const result = await api.assignPermissions({
      roleId: rolePermissionsData.params.id,
      menuIds: backgroundCheckKeys,
    });
    if (result) {
      message.success('分配角色菜单成功');
      rolePermissionsChange(true);
    }
  };
  const handleCancel = () => {
    rolePermissionsChange(false);
  };
  const findRoleMenu = async (roleId: string) => {
    const result = await api.findRoleMenu({ roleId });
    setBackgroundCheckKeys(result.allList);
    setCheckedKeys(result.filterList);
  };
  // 获取菜单列表
  const [menuList, setMenuList] = useState([]);
  const searchMenuList = async () => {
    const result = await api.findMenuList();
    setMenuList(result);
  };
  // 默认勾选
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const [backgroundCheckKeys, setBackgroundCheckKeys] = useState<React.Key[]>(
    []
  );
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue: React.Key[], e: any) => {
    const check = [...checkedKeysValue, ...e.halfCheckedKeys];
    // 显示在页面上的数据，无需包含父元素的ID
    setCheckedKeys(checkedKeysValue);
    // 回传给后端的数据，必须包含父元素的ID
    setBackgroundCheckKeys(check);
  };
  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };
  return (
    <Modal
      forceRender
      title={title}
      open={rolePermissionsData.show}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText="取消"
      okText="确认"
    >
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={menuList}
        fieldNames={{ title: 'menuName', key: 'id' }}
      />
    </Modal>
  );
};

export default RolePermissions;
