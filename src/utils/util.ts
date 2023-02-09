// export const getToken = () => {
//   const authorization = localStorage.getItem('authorization');
//   const refreshToken = localStorage.getItem('refreshToken');
//   const expiresIn = localStorage.getItem('expiresIn');
//   const smallTown = localStorage.getItem('smallTown');
//   const permissions = localStorage.getItem('ENUM_PERMISSIONS');
//   return {
//     authorization,
//     refreshToken,
//     expiresIn,
//     smallTown,
//     permissions: permissions ? JSON.parse(permissions) : [],
//   };
// };
export const getToken = () => {
  const authorization = localStorage.getItem('accessToken');
  return {
    authorization,
  };
};
export const saveToken = (token: {
  accessToken: string;
  refreshToken: string;
  tokenTime: Date;
}) => {
  const { accessToken, refreshToken, tokenTime } = token;
  accessToken && localStorage.setItem('accessToken', accessToken);
  tokenTime && localStorage.setItem('tokenTime', tokenTime.toString());
  refreshToken && localStorage.setItem('refreshToken', refreshToken);
};
