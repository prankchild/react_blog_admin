import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table } from 'antd';
import api from '@/api';
import _ from 'lodash';
import ModifyPasswordModel from './components/modifyPassword';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';
import './index.scss';

const { Option } = Select;
function UserList() {
  const getRoleEnum = async () => {
    const roleEnum = await api.getRoleEnum();
    setRoleEnum(roleEnum);
  };
  // 初始化查询用户列表信息
  const [params, setParams] = useState({
    account: undefined,
    state: undefined,
    roleId: undefined,
    page: 1,
    size: 10,
  });
  useEffect(() => {
    getRoleEnum();
    searchUserList();
  }, []);
  // 角色枚举
  const [roleEnum, setRoleEnum] = useState([]);
  // 用户列表
  const [tableData, setTableData] = useState({
    list: [],
    total: 1,
  });
  const useUserState = (value: any) => {
    setParams({ ...params, state: value });
  };
  const useUserAccount = (change: any) => {
    // params.account = change.target.value;
    const account = change.target.value;
    setParams({ ...params, account });
  };
  const useUserRole = (value: any) => {
    const roleId = value;
    setParams({ ...params, roleId });
  };
  const searchReset = async () => {
    const reset = {
      account: undefined,
      state: undefined,
      roleId: undefined,
      page: 1,
      size: 10,
    };
    // 异步
    setParams(reset);
    searchUserList(reset);
  };
  const searchUserList = async (data = params) => {
    const result = await api.findUserList(data);
    setTableData(result);
  };
  const search = () => {
    searchUserList();
  };
  const [roleId, setRoleId] = useState(undefined);
  const showModifyPasswordChange = (roleId: any) => {
    setRoleId(roleId);
    setShowModifyPassword(true);
  };
  const columns = [
    {
      title: '唯一值',
      dataIndex: 'id',
      key: '',
    },
    // {
    //   title: '头像',
    //   dataIndex: 'avatar',
    //   key: 'avatar',
    //   render: (_, record) => (
    //     <div className="user_avatar_container">
    //       <img src={record.avatar} alt="" />
    //     </div>
    //   ),
    // },
    {
      title: '名称',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: { status: string }) => (
        <>
          {Number(record.status) === 0 ? <span>禁用</span> : <span>启用</span>}{' '}
        </>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '描述',
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 250,
      render: (_: any, record: { roleId: number }) => (
        <>
          <Button
            size="small"
            className="mr-4"
            onClick={() => showModifyPasswordChange(record.roleId)}
          >
            更改角色
          </Button>
          <Button type="primary" size="small" className="mr-4">
            编辑
          </Button>
          <Button type="primary" danger size="small">
            删除
          </Button>
        </>
      ),
    },
  ];
  const [showModifyPassword, setShowModifyPassword] = useState(false);
  const paginationChange = (page: number, size: number) => {
    const param = _.cloneDeep(params);
    param.page = page;
    param.size = size;
    setParams(param);
    searchUserList(param);
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
              value={params.account}
            />
          </CommonSearchItem>
          <CommonSearchItem label="用户状态">
            <Select
              className="w-44"
              placeholder="请选择用户状态"
              onChange={useUserState}
              allowClear
              value={params.state}
            >
              <Option value="0">禁用</Option>
              <Option value="1">启用</Option>
            </Select>
          </CommonSearchItem>
          <CommonSearchItem label="用户角色">
            <Select
              value={params.roleId}
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
          <Button onClick={search}>查询</Button>
        </div>
      </CommonSearch>
      <div className="table-card">
        <Table
          columns={columns}
          dataSource={tableData.list}
          rowKey="id"
          pagination={{
            pageSize: params.size,
            showSizeChanger: true,
            pageSizeOptions: [2, 10, 20, 50, 100],
            onChange: paginationChange,
          }}
        />
      </div>
      <ModifyPasswordModel
        showModifyPassword={showModifyPassword}
        roleId={roleId}
        setShowModifyPassword={setShowModifyPassword}
      />
    </div>
  );
}

export default UserList;
