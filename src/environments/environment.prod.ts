const app_url = 'https://cict-sentry.web.app';
const api_url = 'https://sentry-backend.up.railway.app';
const app_id = '3';
export const environment = {
  production: true,
  apiRootRoute: api_url,
  clientRoot: app_url,

  oauthClientId: app_id,
  oauthLoginUrl: api_url + '/oauth/authorize',
  oauthTokenUrl: api_url + '/oauth/token',
  oauthCallbackUrl: app_url + '/auth/callback',

  MAX_FILE_SIZE: 15000,
};
