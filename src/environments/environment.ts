const url = {
  protocol: 'https',
  // domain: 'localhost:3000',
  domain: 'api-textil-umg.vercel.app',
  path: 'api',
};



export const environment = {
  production: false,
  appVersion: 'v726demo1',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  API_URL: `${url.protocol}://${url.domain}/${url.path}`,
  LIMIT_SIZE_FILES: 5 * 1024 * 1024,
};
