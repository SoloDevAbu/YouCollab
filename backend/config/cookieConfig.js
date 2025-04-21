import dotenv from 'dotenv';
dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

export const getCookieConfig = (options = {}) => {
  return {
    httpOnly: true,
    secure: isDevelopment ? false : process.env.PRODUCTION_COOKIE_SECURE === 'true',
    sameSite: isDevelopment ? 'lax' : 'none',
    domain: isDevelopment ? process.env.COOKIE_DOMAIN : process.env.PRODUCTION_COOKIE_DOMAIN,
    path: '/',
    ...options
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
  return {
    httpOnly: true,
    secure: isDevelopment ? false : process.env.PRODUCTION_COOKIE_SECURE === 'true',
    sameSite: isDevelopment ? 'lax' : 'none',
    domain: isDevelopment ? process.env.COOKIE_DOMAIN : process.env.PRODUCTION_COOKIE_DOMAIN,
    path: '/'
  };
}; 