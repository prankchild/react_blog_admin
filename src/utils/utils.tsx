export const to2 = () => {
  window.location.hash = '/login';
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('tokenTime');
  window.localStorage.removeItem('refreshToken');
};
