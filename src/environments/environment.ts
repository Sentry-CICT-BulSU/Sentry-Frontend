// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// frontend env
// const app_url = 'http://localhost:4200';
// const api_url = 'https://sentry-backend.up.railway.app';
// const app_id = '2';

// vreiln's env
const app_url = 'http://app.cict-sentry.test:4200';
const api_url = 'http://cict-sentry.test';
const app_id = '1';

export const environment = {
  production: false,
  apiRootRoute: api_url,
  clientRoot: app_url,

  oauthClientId: app_id,
  oauthLoginUrl: api_url + '/oauth/authorize',
  oauthTokenUrl: api_url + '/oauth/token',
  oauthCallbackUrl: app_url + '/auth/callback',

  MAX_FILE_SIZE: 15000,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
