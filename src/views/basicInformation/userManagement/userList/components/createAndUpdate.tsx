import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import _ from 'lodash';

// htmlType="submit"
const createAndUpdate: React.FC = (props: any) => {
  const [form] = Form.useForm();
  const { showCreateAndUpdate, setShowCreateAndUpdate, editUserInfo } = props;
  const [userInfo, setUserInfo] = useState({
    account: undefined,
    phone: undefined,
    email: undefined,
    describe: undefined,
    status: false,
  });
  const [title, setTitle] = useState('创建用户');
  useEffect(() => {
    if (editUserInfo !== undefined) {
      const edit = _.cloneDeep(editUserInfo);
      form.setFieldsValue(edit);
      setUserInfo(edit);
      setTitle('编辑用户');
    } else {
      setTitle('创建用户');
    }
    console.log(form, 'form');
  }, [editUserInfo]);
  const handleOk = async () => {
    const formValue = await form.validateFields();
    console.log(formValue, 'formValue');
    setShowCreateAndUpdate(false);
  };
  const handleCancel = () => {
    setShowCreateAndUpdate(false);
  };
  const statusChange = (value: any) => {
    console.log(value, `valuevalue`);
  };
  return (
    <>
      <Modal
        title={title}
        open={showCreateAndUpdate}
        onOk={handleOk}
        okButtonProps={{ htmlType: 'submit' }}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="account"
            rules={[{ required: true, message: '名称不可为空' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="describe">
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不可为空！' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '状态不可为空！' }]}
          >
            <Switch onChange={statusChange} />
          </Form.Item>
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[{ required: true, message: '手机号码不可为空！' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default createAndUpdate;
