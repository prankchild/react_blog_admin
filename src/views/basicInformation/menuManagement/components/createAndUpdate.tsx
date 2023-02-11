import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Select,
  TreeSelect,
} from 'antd';
import api from '@/api';
import _ from 'lodash';

const { TextArea } = Input;
// htmlType="submit"
const CreateAndUpdate = (props: any) => {
  const { createAndUpdateData, createAndUpdateChange } = props;
  const [title, setTitle] = useState('新增菜单');
  const [menuList, setMenuList] = useState([]);
  const [form] = Form.useForm();
  useEffect(() => {
    if (createAndUpdateData.create || createAndUpdateData.update) {
      searchMenuList();
    }
    if (createAndUpdateData.create) {
      setTitle('新增菜单');
      form.resetFields();
    } else {
      setTitle('编辑菜单');
      const menu = _.cloneDeep(createAndUpdateData.params);
      if (menu.otherProperties) {
        menu.otherProperties = JSON.stringify(menu.otherProperties);
      }
      form.setFieldsValue(menu);
    }
  }, [createAndUpdateData]);
  const handleOk = async () => {
    const formValue = _.cloneDeep(await form.validateFields());
    const menu = _.cloneDeep(formValue);
    if (menu.otherProperties) {
      menu.otherProperties = JSON.parse(menu.otherProperties);
    } else {
      menu.otherProperties = '';
    }
    if (createAndUpdateData.create) {
      // 创建
      await api.createMenu(formValue);
      message.success('创建菜单成功');
      createAndUpdateChange(true);
    } else {
      // 编辑
      formValue.id = createAndUpdateData.params.id;
      await api.updateMenu(formValue);
      message.success('修改菜单成功');
      createAndUpdateChange(true);
    }
  };
  const searchMenuList = async () => {
    const result = await api.findMenuList();
    setMenuList(result);
  };
  const handleCancel = () => {
    createAndUpdateChange(false);
  };
  return (
    <>
      <Modal
        forceRender
        title={title}
        open={createAndUpdateData.show}
        onOk={handleOk}
        okButtonProps={{ htmlType: 'submit' }}
        onCancel={handleCancel}
        cancelText="取消"
        okText="确认"
      >
        <div className="p-4">
          <Form
            labelAlign="right"
            className=""
            name="basic"
            form={form}
            labelCol={{ span: 5 }}
            // initialValues={}
            autoComplete="off"
          >
            <Form.Item
              required={false}
              label="菜单名称"
              name="menuName"
              rules={[{ required: true, message: '菜单名称不可为空' }]}
            >
              <Input placeholder="请输入菜单名称" />
            </Form.Item>
            <Form.Item
              label="菜单类型"
              name="menuType"
              rules={[{ required: true, message: '菜单类型不可为空' }]}
            >
              <Select
                options={[
                  { value: 0, label: '菜单夹' },
                  { value: 1, label: '普通页面' },
                  { value: 2, label: 'TAB页面' },
                  { value: 3, label: '按钮' },
                ]}
                placeholder="请选择菜单类型"
              />
            </Form.Item>
            <Form.Item label="上级菜单" name="parentId">
              {/* <Select
                options={menuList}
                placeholder="请选择上级菜单，若为菜单夹则无需选择"
              /> */}
              <TreeSelect
                treeData={menuList}
                fieldNames={{ label: 'menuName', value: 'id' }}
                placeholder="请选择上级菜单，若为菜单夹则无需选择"
              />
            </Form.Item>
            <Form.Item label="跳转路径" name="menuPath">
              <Input placeholder="请输入跳转路径" />
            </Form.Item>
            <Form.Item label="文件路径" name="filePath">
              <Input placeholder="请输入文件路径" />
            </Form.Item>
            <Form.Item
              label="状态"
              name="menuStatus"
              rules={[{ required: true, message: '状态不可为空' }]}
            >
              <Radio.Group>
                <Radio value={1}>开启</Radio>
                <Radio value={0}>关闭</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="排序"
              name="sort"
              rules={[{ required: true, message: '排序不可为空' }]}
            >
              <InputNumber
                placeholder="请输入排序"
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="菜单编码" name="menuCode">
              <InputNumber
                placeholder="无需填写，自动生成"
                disabled
                min={0}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="键值"
              name="menuKey"
              rules={[{ required: true, message: '键值不可为空' }]}
            >
              <Input placeholder="请输入键值" />
            </Form.Item>
            <Form.Item label="备注" name="remark">
              <Input placeholder="请输入备注" />
            </Form.Item>
            <Form.Item label="其他属性" name="otherProperties">
              <TextArea rows={4} placeholder="其他属性为JSON格式" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateAndUpdate;
