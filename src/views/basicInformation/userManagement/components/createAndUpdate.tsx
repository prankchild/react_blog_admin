import { useEffect, useState } from 'react';
import { Form, Input, message, Modal, Radio } from 'antd';
import api from '@/api';
import _ from 'lodash';
import { emailRule, nameRule, phoneRule, pwdRule } from '@/utils/validator';

// htmlType="submit"
const CreateAndUpdate = (props: any) => {
  const { showCreateAndUpdate, createAndUpdateChange, editUserInfo } = props;
  const [title, setTitle] = useState('创建用户');
  const [form] = Form.useForm();
  useEffect(() => {
    if (editUserInfo && editUserInfo.id) {
      const edit = _.cloneDeep(editUserInfo);
      form.setFieldsValue(edit);
      setTitle('编辑用户');
    } else {
      form.setFieldsValue({
        account: undefined,
        password: undefined,
        confirmPassword: undefined,
        describe: undefined,
        email: undefined,
        phone: undefined,
        status: 0,
      });
      setTitle('创建用户');
    }
    console.log(form, 'form');
  }, [editUserInfo]);
  const handleOk = async () => {
    const formValue = _.cloneDeep(await form.validateFields());
    formValue.avatar =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    console.log(formValue, 'formValue');
    if (title === '创建用户') {
      await api.register(formValue);
      message.success('创建用户成功');
      createAndUpdateChange();
    } else {
      formValue.id = editUserInfo.id;
      await api.updateUser(formValue);
      message.success('修改用户信息成功');
      createAndUpdateChange();
    }
  };
  const handleCancel = () => {
    createAndUpdateChange();
  };
  const verifySecondaryPassword = {
    validator: (regExpObj: any, value: any) => {
      if (form.getFieldsValue().password === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('两次输入密码不一致！'));
    },
  };
  return (
    <>
      <Modal
        forceRender
        title={title}
        open={showCreateAndUpdate}
        onOk={handleOk}
        okButtonProps={{ htmlType: 'submit' }}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认"
      >
        <Form
          className=""
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="名称"
            name="account"
            rules={[{ required: true, message: '名称不可为空' }, nameRule]}
          >
            <Input placeholder="请输入名称，名称限制2~25个字，支持中英文、数字、字符" />
          </Form.Item>
          <Form.Item label="描述" name="describe">
            <Input placeholder="请输入描述" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[{ required: true, message: '邮箱不可为空！' }, emailRule]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '状态不可为空！' }]}
          >
            <Radio.Group>
              <Radio value={0}> 禁用 </Radio>
              <Radio value={1}> 开启 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="手机号码"
            name="phone"
            rules={[
              { required: true, message: '手机号码不可为空！' },
              phoneRule,
            ]}
          >
            <Input placeholder="请输入手机号码" />
          </Form.Item>
          {title === '创建用户' ? (
            <>
              <Form.Item label="密码" name="password" rules={[pwdRule]}>
                <Input.Password placeholder="请输入第一次密码" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="confirmPassword"
                rules={[verifySecondaryPassword]}
              >
                <Input.Password placeholder="请再次输入密码" />
              </Form.Item>
            </>
          ) : (
            ''
          )}
        </Form>
      </Modal>
    </>
  );
};

export default CreateAndUpdate;
