export const getBaseUrl = (port) => {
  const { protocol, hostname } = window.location;

  let baseUrl = `${protocol}//${hostname}`;

  const ENVIRONMENT = window.location.hostname.includes('localhost') ? 'development' : 'production';

  if (ENVIRONMENT === 'development') baseUrl += `:${port}`;

  return baseUrl;
};

export const urls = {

};
