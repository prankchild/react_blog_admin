import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import api from '@/api';
import _ from 'lodash';
import CreateAndUpdate from './components/createAndUpdate';
import CommonTable from '@/components/common/commonTable';
import './index.scss';

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
  const [tableData, setTableData] = useState<Array<any>>([]);
  const menuTypeList = ['菜单夹', '功能模块', 'tab页', '按钮'];
  useEffect(() => {
    searchMenuList();
  }, []);
  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: (_: any, record: { menuType: string }) => (
        <>{menuTypeList[Number(record.menuType)]}</>
      ),
    },
    {
      title: '菜单状态',
      dataIndex: 'menuStatus',
      key: 'menuStatus',
      width: 100,
      render: (_: any, record: { menuStatus: string }) => (
        <>
          {Number(record.menuStatus) === 0 ? (
            <span>关闭</span>
          ) : (
            <span>开启</span>
          )}{' '}
        </>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 100,
    },
    {
      title: '键值',
      dataIndex: 'menuKey',
      key: 'menuKey',
    },
    {
      title: '备注',
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
      width: 140,
      render: (_: any, record: MenuType) => (
        <>
          <Button
            size="small"
            type="link"
            className="mr-1"
            onClick={() => updateMenu(record)}
          >
            编辑
          </Button>
          <Button size="small" danger type="link" className="mr-1">
            删除{' '}
          </Button>
        </>
      ),
    },
  ];
  const [createAndUpdateData, setCreateAndUpdateData] = useState({
    show: false,
    params: {},
    create: false,
    update: false,
  });
  const createAndUpdateChange = (bol: boolean) => {
    setCreateAndUpdateData({
      show: false,
      params: {},
      create: false,
      update: false,
    });
    if (bol) {
      searchMenuList();
    }
  };
  const [tableLoading, setTableLoading] = useState(false);
  const searchMenuList = async () => {
    setTableLoading(true);
    const result = await api.findMenuList();
    setTableData(result);
    setTableLoading(false);
  };
  const createMenu = () => {
    setCreateAndUpdateData({
      show: true,
      params: {},
      create: true,
      update: false,
    });
  };
  const updateMenu = (record: any) => {
    setCreateAndUpdateData({
      show: true,
      params: record,
      create: false,
      update: true,
    });
  };
  return (
    <div className="menu_list">
      <div className="table-card ">
        <div className="button-area">
          <Button type="primary" onClick={createMenu}>
            新增菜单
          </Button>
        </div>
        <CommonTable
          rowKey="id"
          scroll={{ y: '630px' }}
          columns={columns}
          loading={tableLoading}
          dataSource={tableData}
          pagination={false}
        />
      </div>
      <CreateAndUpdate
        createAndUpdateData={createAndUpdateData}
        createAndUpdateChange={createAndUpdateChange}
      />
    </div>
  );
}

export default MenuList;
