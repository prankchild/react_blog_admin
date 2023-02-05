import { request } from '@/network/request';
import { LoginForm } from '@/types/requestData';

export async function login(data: LoginForm) {
  return request({
    url: `/login`,
    method: 'POST',
    data,
    showLoading: true,
  });
}
