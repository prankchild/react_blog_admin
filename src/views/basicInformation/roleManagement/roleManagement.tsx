import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import api from '@/api';
import _ from 'lodash';
import RolePermissions from './components/rolePermissions';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';
import CommonTable from '@/components/common/commonTable';

interface RoleType {
  id: string;
  name: string;
  remark: string;
  status: number;
  availableRange: number;
  createDate: string;
  updateDate: string;
}
function RoleList() {
  const [tableData, setTableData] = useState<{
    list: RoleType[];
    total: Number;
  }>({
    list: [],
    total: 1,
  });
  useEffect(() => {
    searchRoleList();
  }, []);
  const availableRange = ['博客页面', '后台管理系统', '全部'];
  const columns = [
    {
      title: '唯一值',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      // align: 'center',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: '可用范围',
      dataIndex: 'availableRange',
      key: 'availableRange',
      render: (_: any, record: RoleType) => (
        <>{availableRange[Number(record.availableRange)]}</>
      ),
    },
    {
      title: '角色用户',
      dataIndex: 'user',
      key: 'user',
      render: (_: any, record: RoleType) => (
        <>
          <Button size="small" type="link" className="mr-1">
            查看
          </Button>
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: RoleType) => (
        <>
          {Number(record.status) === 0 ? <span>禁用</span> : <span>启用</span>}
        </>
      ),
    },
    {
      title: '描述',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      width: 200,
      render: (_: any, record: RoleType) => (
        <>
          <Button
            size="small"
            type="link"
            className="mr-1"
            onClick={() => assignPermissions(record)}
          >
            分配权限
          </Button>
          <Button size="small" type="link" className="mr-1">
            编辑
          </Button>
          <Button size="small" danger type="link" className="mr-1">
            删除{' '}
          </Button>
        </>
      ),
    },
  ];
  // 分配权限按钮回调
  const assignPermissions = (record: any) => {
    setRolePermissionsData({
      show: true,
      params: record,
    });
  };
  // 分配权限组件回调
  const rolePermissionsChange = (bol: boolean) => {
    setRolePermissionsData({
      show: false,
      params: {},
    });
    if (bol) {
      search();
    }
  };
  const [rolePermissionsData, setRolePermissionsData] = useState({
    show: false,
    params: {},
  });
  const [tableLoading, setTableLoading] = useState(false);
  // 初始化查询用户列表信息
  const [params, setParams] = useState({
    name: undefined,
    page: 1,
    size: 10,
  });
  const search = async () => {
    searchRoleList();
  };
  const searchRoleList = async (data = params) => {
    setTableLoading(true);
    const result = await api.findRoleList(data);
    setTableData(result);
    setTableLoading(false);
  };
  const paginationChange = (page: number, size: number) => {
    const param = _.cloneDeep(params);
    param.page = page;
    param.size = size;
    setParams(param);
    searchRoleList(param);
  };
  return (
    <div className="role_list">
      <CommonSearch>
        <div className="search-condition">
          <CommonSearchItem label="角色名称">
            <Input placeholder="请输入用户名称" className="w-44"></Input>
          </CommonSearchItem>
        </div>
        <div className="search-button">
          <Button className="mr-4">重置</Button>
          <Button>查询</Button>
        </div>
      </CommonSearch>
      <div className="table-card ">
        <div className="button-area">
          <Button type="primary">新增用户</Button>
        </div>
        <CommonTable
          rowKey="id"
          scroll={{ y: '600px' }}
          columns={columns}
          dataSource={tableData.list}
          pagination={{
            pageSize: params.size,
            showSizeChanger: true,
            pageSizeOptions: [2, 10, 20, 50, 100],
            onChange: paginationChange,
          }}
        />
      </div>
      <RolePermissions
        rolePermissionsData={rolePermissionsData}
        rolePermissionsChange={rolePermissionsChange}
      />
    </div>
  );
}

export default RoleList;
