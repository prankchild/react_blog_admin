import { useEffect, useState } from 'react';
import { Table } from 'antd';
import './index.scss';

// scroll={{ y: '600px' }}
// scroll={{ y: '500px' }}
const CommonTable = (props: any) => {
  const { scroll } = props;
  return (
    <>
      <Table
        {...props}
        scroll={scroll ? scroll : { y: '520px' }}
        className="common-table"
      />
    </>
  );
};

export default CommonTable;
