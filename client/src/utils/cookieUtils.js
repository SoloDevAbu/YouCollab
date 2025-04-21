import Cookies from 'js-cookie';

export const getToken = () => {
  return Cookies.get('token');
};

export const getYoutubeAuthToken = () => {
  return Cookies.get('youtubeAuth');
};

export const removeTokens = () => {
  Cookies.remove('token');
  Cookies.remove('youtubeAuth');
};

export const setToken = (token) => {
  // In development, we don't need special cookie settings
  if (import.meta.env.MODE === 'development') {
    Cookies.set('token', token);
    return;
  }

  // In production, we need to set the domain and secure flags
  Cookies.set('token', token, {
    secure: true,
    sameSite: 'none',
    domain: import.meta.env.VITE_COOKIE_DOMAIN || window.location.hostname
  });
};