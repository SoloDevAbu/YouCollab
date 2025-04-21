import dotenv from 'dotenv';
dotenv.config();

const isDevelopment = process.env.NODE_ENV === 'development';

export const getCookieConfig = (options = {}) => {
  const domain = isDevelopment 
    ? process.env.COOKIE_DOMAIN 
    : process.env.PRODUCTION_COOKIE_DOMAIN;

  const secure = isDevelopment 
    ? process.env.COOKIE_SECURE === 'true'
    : process.env.PRODUCTION_COOKIE_SECURE === 'true';

  const sameSite = isDevelopment 
    ? process.env.COOKIE_SAME_SITE 
    : process.env.PRODUCTION_COOKIE_SAME_SITE;

  return {
    httpOnly: true,
    secure,
    sameSite,
    domain,
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
  return getCookieConfig();
}; 