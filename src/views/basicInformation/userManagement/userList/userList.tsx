import React, { useEffect, useState } from 'react';
import { Button, Input, Select } from 'antd';
import api from '@/api';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';

const { Option } = Select;
function UserList() {
  const getRoleEnum = async () => {
    const roleEnum = await api.getRoleEnum();
    setRoleEnum(roleEnum);
  };
  const [userInfo, setUserInfo] = useState({
    account: undefined,
    state: undefined,
    roleId: undefined,
    page: 1,
    size: 10,
  });
  useEffect(() => {
    getRoleEnum();
  }, []);
  const [roleEnum, setRoleEnum] = useState([]);
  const useUserState = (value: any) => {
    setUserInfo({ ...userInfo, state: value });
  };
  const useUserAccount = (change: any) => {
    // userInfo.account = change.target.value;
    const account = change.target.value;
    setUserInfo({ ...userInfo, account });
  };
  const useUserRole = (value: any) => {
    const roleId = value;
    setUserInfo({ ...userInfo, roleId });
  };
  const searchReset = () => {
    setUserInfo({
      account: undefined,
      state: undefined,
      roleId: undefined,
      page: 1,
      size: 10,
    });
    searchUserList();
  };
  const searchUserList = async () => {
    const result = await api.findUserList(userInfo);
    console.log(result, 'result');
  };
  return (
    <div className="user_list">
      <CommonSearch>
        <div className="search-condition">
          <CommonSearchItem label="用户名称">
            <Input
              placeholder="请输入用户名称"
              className="w-44"
              onChange={useUserAccount}
              value={userInfo.account}
            />
          </CommonSearchItem>
          <CommonSearchItem label="用户状态">
            <Select
              className="w-44"
              placeholder="请选择用户状态"
              onChange={useUserState}
              allowClear
              value={userInfo.state}
            >
              <Option value="0">禁用</Option>
              <Option value="1">启用</Option>
            </Select>
          </CommonSearchItem>
          <CommonSearchItem label="用户角色">
            <Select
              value={userInfo.roleId}
              className="w-44"
              placeholder="请选择用户角色"
              onChange={useUserRole}
              options={roleEnum}
              fieldNames={{ label: 'name', value: 'id' }}
              allowClear
            ></Select>
          </CommonSearchItem>
        </div>
        <div className="search-button">
          <Button className="mr-4" onClick={searchReset}>
            重置
          </Button>
          <Button onClick={searchUserList}>查询</Button>
        </div>
      </CommonSearch>
    </div>
  );
}

export default UserList;
