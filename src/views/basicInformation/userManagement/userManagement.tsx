import React, { useEffect, useState } from 'react';
import { Button, Input, Select, Table } from 'antd';
import api from '@/api';
import _ from 'lodash';
import AssignRoleModel from './components/assignRole';
import CreateAndUpdate from './components/createAndUpdate';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';
import CommonTable from '@/components/common/commonTable';
import WarningModal from '@/components/common/warningModal';
import './index.scss';

const { Option } = Select;
const UserList = () => {
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
  // 列表的表头
  const columns = [
    {
      title: '唯一值',
      dataIndex: 'id',
      key: '',
    },
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
      width: 280,
      render: (_: any, record: any) => (
        <>
          <Button
            size="small"
            type="link"
            className="mr-1"
            onClick={() => showAssignRoleChange(record)}
          >
            指派角色
          </Button>
          <Button
            size="small"
            type="link"
            className="mr-1"
            onClick={() => resetPassword(record)}
          >
            重置密码
          </Button>
          <Button
            type="link"
            size="small"
            className="mr-1"
            onClick={() => showCreateAndUpdateChange(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            size="small"
            onClick={() => showDelModalChange(record)}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
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
  // 查询的loading
  const [tableLoading, setTableLoading] = useState(false);
  const searchUserList = async (data = params) => {
    setTableLoading(true);
    const result = await api.findUserList(data);
    setTableData(result);
    setTableLoading(false);
  };
  const search = () => {
    searchUserList();
  };

  const [assignRoleUserInfo, setAssignRoleUserInfo] = useState({});
  // 点击更改角色的回调
  const showAssignRoleChange = (userInfo: any) => {
    setAssignRoleUserInfo(userInfo);
    setShowAssignRole(true);
  };
  const [editUserInfo, setEditUserInfo] = useState(undefined);
  // 点击编辑回调
  const showCreateAndUpdateChange = (record: any) => {
    setEditUserInfo(record);
    setShowCreateAndUpdate(true);
  };
  // 显示更改密码模块
  const [showAssignRole, setShowAssignRole] = useState(false);
  // 显示创造编辑模块
  const [showCreateAndUpdate, setShowCreateAndUpdate] = useState(false);
  // Table表格组件的分页组件的回调
  const paginationChange = (page: number, size: number) => {
    const param = _.cloneDeep(params);
    param.page = page;
    param.size = size;
    setParams(param);
    searchUserList(param);
  };
  const createAndUpdateChange = () => {
    setShowCreateAndUpdate(false);
    search();
  };
  const assignRoleChange = () => {
    setShowAssignRole(false);
    search();
  };
  // 警告框的数据
  const [warningOptions, setWarningOptions] = useState({
    showWarning: false,
    content: '请确认是否该操作？',
    option: 'delete',
    params: {},
  });
  // 重置警告框的数据
  const resetWarningOptions = (showWarning: boolean) => {
    setWarningOptions({
      showWarning: showWarning,
      content: '请确认是否该操作？',
      option: 'delete',
      params: {},
    });
  };
  // 删除用户
  const showDelModalChange = (record: any) => {
    setWarningOptions({
      showWarning: true,
      content: `是否删除该用户${record.account}？`,
      option: 'delete',
      params: { record },
    });
  };
  // 警告框的回调
  const warningConfirm = () => {
    resetWarningOptions(false);
  };
  const warningCancel = () => {
    resetWarningOptions(false);
  };
  // 重置密码
  const resetPassword = (record: any) => {
    setWarningOptions({
      showWarning: true,
      content: `是否重置${record.account}的密码？`,
      option: 'resetPassword',
      params: { record },
    });
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
      <div className="table-card ">
        <div className="button-area">
          <Button type="primary" onClick={showCreateAndUpdateChange}>
            新增用户
          </Button>
        </div>
        <CommonTable
          loading={tableLoading}
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
      {/* 更改角色模块 */}
      <AssignRoleModel
        showAssignRole={showAssignRole}
        userInfo={assignRoleUserInfo}
        assignRoleChange={assignRoleChange}
      />
      <CreateAndUpdate
        showCreateAndUpdate={showCreateAndUpdate}
        editUserInfo={editUserInfo}
        createAndUpdateChange={createAndUpdateChange}
      />
      <WarningModal
        showModal={warningOptions.showWarning}
        content={warningOptions.content}
        danger={true}
        confirm={warningConfirm}
        cancel={warningCancel}
      />
    </div>
  );
};

export default UserList;
