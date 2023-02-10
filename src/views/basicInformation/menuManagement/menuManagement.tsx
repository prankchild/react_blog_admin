import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import api from '@/api';
import _ from 'lodash';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';
import CommonTable from '@/components/common/commonTable';

interface MenuType {
  id: string;
  name: string;
  remark: string;
  status: number;
  availableRange: number;
  createDate: string;
  updateDate: string;
}
function MenuList() {
  const [tableData, setTableData] = useState<{
    list: MenuType[];
    total: Number;
  }>({
    list: [],
    total: 1,
  });
  useEffect(() => {
    searchMenuList();
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
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      width: 140,
      render: (_: any, record: MenuType) => (
        <>
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
  const [tableLoading, setTableLoading] = useState(false);
  // 初始化查询用户列表信息
  const [params, setParams] = useState({
    name: undefined,
    page: 1,
    size: 10,
  });
  const search = async () => {
    searchMenuList();
  };
  const searchMenuList = async (data = params) => {
    setTableLoading(true);
    const result = await api.findMenuList(data);
    setTableData(result);
    setTableLoading(false);
  };
  const paginationChange = (page: number, size: number) => {
    const param = _.cloneDeep(params);
    param.page = page;
    param.size = size;
    setParams(param);
    searchMenuList(param);
  };
  return (
    <div className="Menu_list">
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
    </div>
  );
}

export default MenuList;
