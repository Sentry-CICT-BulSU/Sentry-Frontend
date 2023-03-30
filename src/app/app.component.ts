import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// Import the Component and ThemeService from Angular core.
import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { OAuthService, JwksValidationHandler, AuthConfig, ReceivedTokens } from 'angular-oauth2-oidc';

export function randomString(length: any, chars: any) {
    let result = '';
    if (chars.indexOf('a') > -1) result += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) result += '0123456789';
    if (chars.indexOf('!') > -1) result += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    for (var i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
export const authConfig: AuthConfig = {
    issuer: environment.apiRootRoute + '/oauth/authorize',
    tokenEndpoint: environment.apiRootRoute + '/oauth/token',
    loginUrl: environment.apiRootRoute + '/oauth/authorize',
    redirectUri: window.location.origin,
    clientId: '1',
    scope: '',
    oidc: false,
    responseType: 'code',
    disableAtHashCheck: true,
    useSilentRefresh: true,
    requireHttps: false,
    showDebugInformation: true,
    checkOrigin: true,
    strictDiscoveryDocumentValidation: false,
    sessionChecksEnabled: true,
    customQueryParams: {
        // Your API's name
        audience: environment.apiRootRoute + '/api',
    },
    // dummyClientSecret: 'test',
};

// Define a component with metadata using the @Component decorator.
@Component({
    selector: 'app-root', // Define the selector for the component.
    templateUrl: './app.component.html', // Define the template for the component.
    styleUrls: ['./app.component.scss'], // Define the styles for the component.
})

// Define the AppComponent class.
export class AppComponent {
    title = 'Tean 404 System'; // Define a title property for the component.

    // Define a constructor that takes the ThemeService as a dependency. Constructor is a special method that is called
    //when a new instance of a class is created
    constructor(
        public themeService: ThemeService,
        private oauthService: OAuthService
    ) {
        this.configureWithNewConfigApi();
        console.log(window.location.origin);
    }

    private configureWithNewConfigApi() {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.setupAutomaticSilentRefresh();
        this.oauthService.tryLoginCodeFlow({
            onLoginError: (err: object) => {
                console.debug(err);
            },
            onTokenReceived: (info: ReceivedTokens) => {
                console.debug(info);
                console.debug(info.state); //state
            }
        });
    }
}

// This code represents the main component of an Angular application and sets up the theme service to toggle
// the dark class on the application's root element based on the current theme.
