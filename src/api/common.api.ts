import { request } from '@/network/request';

export async function login(data: any) {
  return request({
    url: `/login`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
// 获取角色枚举
export async function getRoleEnum() {
  return request({
    url: `/common/getRoleEnum`,
    method: 'GET',
    showLoading: true,
  });
}
