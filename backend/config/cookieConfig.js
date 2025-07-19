import dotenv from 'dotenv';
dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

export const getCookieConfig = (options = {}) => {
  const secure = isDevelopment 
    ? process.env.COOKIE_SECURE === 'true'
    : process.env.PRODUCTION_COOKIE_SECURE === 'true';

  return {
    httpOnly: true,
    secure,
    sameSite: 'none',
    domain: '.vercel.app',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

export const getAuthCookieConfig = () => {
  return getCookieConfig({
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const getYoutubeAuthCookieConfig = () => {
  return getCookieConfig({
    maxAge: 1 * 60 * 60 * 1000 // 1 hour
  });
};

export const getClearCookieConfig = () => {
  return getCookieConfig();
}; 