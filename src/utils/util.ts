export const getToken = () => {
  const authorization = localStorage.getItem('authorization');
  const refreshToken = localStorage.getItem('refreshToken');
  const expiresIn = localStorage.getItem('expiresIn');
  const smallTown = localStorage.getItem('smallTown');
  const permissions = localStorage.getItem('ENUM_PERMISSIONS');
  return {
    authorization,
    refreshToken,
    expiresIn,
    smallTown,
    permissions: permissions ? JSON.parse(permissions) : [],
  };
};
export const saveToken = (token: any) => {
  const { authorization } = token;
  authorization && localStorage.setItem('authorization', authorization);
};
export const to2 = () => {
  window.localStorage.setItem('authorization', '');
  window.localStorage.setItem('userInfo', '');
  window.localStorage.setItem('tabArr', '');
  window.localStorage.setItem('btnArr', '');
  // router.push('/login');
  // location.reload();
};
