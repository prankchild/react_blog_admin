import React, { useEffect, useState } from 'react';
import { Modal, Select } from 'antd';
import api from '@/api';
import CommonSearchItem from '@/components/common/commonSearchItem';

const ModifyPassword: React.FC = (props: any) => {
  const { showModifyPassword, roleId, editShowModifyPassword } = props;
  const [role, setRole] = useState(undefined);
  useEffect(() => {
    setRole(roleId);
  }, [roleId]);
  // 角色枚举
  const [roleEnum, setRoleEnum] = useState([]);
  const getRoleEnum = async () => {
    const roleEnum = await api.getRoleEnum();
    setRoleEnum(roleEnum);
  };
  useEffect(() => {
    getRoleEnum();
  }, []);
  const handleOk = () => {
    editShowModifyPassword();
  };
  const handleCancel = () => {
    editShowModifyPassword();
  };
  const useUserRole = (value: any) => {
    setRole(value);
  };
  return (
    <>
      <Modal
        title="更改用户角色"
        open={showModifyPassword}
        onOk={handleOk}
        onCancel={handleCancel}
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
export default ModifyPassword;
