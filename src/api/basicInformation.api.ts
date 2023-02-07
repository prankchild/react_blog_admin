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
