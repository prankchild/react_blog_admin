import * as types from '@/store/mutation-types';

// * setToken
export const setToken = (token: object) => ({
  type: types.SET_TOKEN,
  token,
});
