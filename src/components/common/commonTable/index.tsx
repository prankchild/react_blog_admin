import { Table } from 'antd';
import './index.scss';

const CommonTable = (props: any) => {
  return (
    <>
      <Table {...props} className="common-table" />
    </>
  );
};

export default CommonTable;
