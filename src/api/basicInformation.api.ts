import { request } from '@/network/request';

// 查询用户列表
export async function findUserList(data: any) {
  return request({
    url: `/user/findUserList`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
// 创建用户
export async function register(data: any) {
  return request({
    url: `/register`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
// 修改用户信息 ----
export async function updateUser(data: any) {
  return request({
    url: `/user/update`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
// 修改用户角色
export async function createAndUpdateRole(data: any) {
  return request({
    url: `/user/createAndUpdateRole`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
// 用户角色列表
export async function findRoleList(data: any) {
  return request({
    url: `/role/findRoleList`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
//
// 菜单列表
export async function findMenuList(data: any) {
  return request({
    url: `/menu/findMenuList`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
export async function createMenu(data: any) {
  return request({
    url: `/menu/createMenu`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
