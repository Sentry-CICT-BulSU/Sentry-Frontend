// const app_url = 'http://sentry-cict-bulsu.github.io/Sentry-Frontend';
const app_url = 'https://sentry-frontend.up.railway.app';
const api_url = 'https://sentry-backend.up.railway.app';
export const environment = {
  production: false,
  apiRootRoute: api_url,
  clientRoot: app_url,
  clientId: '2',
  clientSecret: 'M14ZncSPP7dTzXjXpYzuaQImjBUvJOd3QfYsg7TJ',

  oauthClientId: '1',
  oauthLoginUrl: api_url + '/oauth/authorize',
  oauthTokenUrl: api_url + '/oauth/token',
  oauthCallbackUrl: app_url + '/auth/callback',

  MAX_FILE_SIZE: 15000,
};
