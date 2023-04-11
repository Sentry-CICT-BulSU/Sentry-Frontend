// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiRootRoute: 'http://la-passport.test',
    clientRoot: 'http://app.la-passport.test:4200',
    clientId: '2',
    clientSecret: 'M14ZncSPP7dTzXjXpYzuaQImjBUvJOd3QfYsg7TJ',

    oauthClientId: '1',
    oauthLoginUrl: 'http://la-passport.test/oauth/authorize',
    oauthTokenUrl: 'http://la-passport.test/oauth/token',
    oauthCallbackUrl: 'http://app.la-passport.test:4200/auth/callback',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
