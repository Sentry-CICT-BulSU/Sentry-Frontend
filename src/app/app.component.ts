import { environment } from 'src/environments/environment';
// Import the Component and ThemeService from Angular core.
import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { OAuthService, JwksValidationHandler, AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
    issuer: environment.apiRootRoute + '/oauth2/default',
    redirectUri: window.location.origin,
    clientId: '{yourClientId}'
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
    constructor(public themeService: ThemeService, private oauthService: OAuthService) {
        this.oauthService.configure(authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();
        this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
    login() {
        this.oauthService.initImplicitFlow();
    }

    logout() {
        this.oauthService.logOut();
    }

    get givenName() {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) {
            return null;
        }
        return claims['name'];
    }
}

// This code represents the main component of an Angular application and sets up the theme service to toggle
// the dark class on the application's root element based on the current theme.
