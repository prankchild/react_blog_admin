import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, message } from 'antd';
import api from '@/api';
import { setToken } from '@/store/modules/global/action';
import { LoginFormType } from '@/types/requestData';
import { LoginResult } from '@/types/requestResult';
import { InfoOutlined, UserOutlined } from '@ant-design/icons';
import { saveToken } from '@/utils/util';

const LoginForm: React.FC = (props: any) => {
  const { setToken } = props;
  const navigate = useNavigate();
  const onFinish = async (form: LoginFormType) => {
    try {
      const result: LoginResult = await api.login(form);
      const tokenTime = new Date();
      const token = {
        ...result,
        tokenTime,
      };
      // 保存到redux
      setToken(token);
      // 保存token到localStorage
      saveToken(token);
      // 跳转到Home
      navigate('/home');
      message.success('登录成功');
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      className="w-96"
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="account"
        rules={[{ required: true, message: '请输入用户名/手机号/邮箱' }]}
      >
        <Input
          size="large"
          placeholder=" 用户名/手机号/邮箱"
          prefix={<UserOutlined />}
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password
          size="large"
          placeholder=" 密码"
          prefix={<InfoOutlined />}
        />
      </Form.Item>

      <div className="py-4">
        <Checkbox>记住我</Checkbox>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        style={{ background: '#1677ff', width: '100%' }}
        className="h-10"
      >
        登录
      </Button>
    </Form>
  );
};
const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setToken };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
