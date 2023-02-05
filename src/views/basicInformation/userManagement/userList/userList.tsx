import { useState } from 'react';
import { Button, Input, Select } from 'antd';
import CommonSearch from '@/components/common/commonSearch';
import CommonSearchItem from '@/components/common/commonSearchItem';

function UserList() {
  // 用户名称
  const userNameInput = <Input />;
  const userName = (
    <CommonSearchItem content={userNameInput} label="用户名称" />
  );

  return (
    <div className="user_list">
      <CommonSearch content={userName} />
    </div>
  );
}

export default UserList;
