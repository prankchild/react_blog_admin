import React, { useEffect, useState } from 'react';
import { message, Modal, Select } from 'antd';
import api from '@/api';
import CommonSearchItem from '@/components/common/commonSearchItem';

const AssignRole = (props: any) => {
  const { showAssignRole, userInfo, assignRoleChange } = props;
  const [role, setRole] = useState(undefined);
  useEffect(() => {
    setRole(userInfo.roleId);
  }, [userInfo]);
  // 角色枚举
  const [roleEnum, setRoleEnum] = useState([]);
  const getRoleEnum = async () => {
    const roleEnum = await api.getRoleEnum();
    setRoleEnum(roleEnum);
  };
  useEffect(() => {
    getRoleEnum();
  }, []);
  const handleOk = async () => {
    try {
      await api.createAndUpdateRole({
        roleId: role,
        userId: userInfo.id,
      });
      message.success('修改用户角色成功');
      assignRoleChange();
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    assignRoleChange();
  };
  const useUserRole = (value: any) => {
    setRole(value);
  };
  return (
    <>
      <Modal
        title="更改用户角色"
        open={showAssignRole}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认"
      >
        <CommonSearchItem label="用户角色">
          <Select
            value={role}
            className="w-44"
            placeholder="请选择用户角色"
            onChange={useUserRole}
            options={roleEnum}
            fieldNames={{ label: 'name', value: 'id' }}
            allowClear
          ></Select>
        </CommonSearchItem>
      </Modal>
    </>
  );
};
export default AssignRole;
