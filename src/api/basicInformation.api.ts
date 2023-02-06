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
