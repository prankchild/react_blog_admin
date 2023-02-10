import { Table } from 'antd';
import './index.scss';

// scroll={{ y: '600px' }}
const CommonTable = (props: any) => {
  // const
  return (
    <>
      <Table {...props} className="common-table" />
    </>
  );
};

export default CommonTable;
