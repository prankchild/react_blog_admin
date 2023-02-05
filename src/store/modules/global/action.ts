import * as types from '@/store/mutation-types';

// * setToken
export const setToken = (token: number) => ({
  type: types.SET_TOKEN,
  token,
});
