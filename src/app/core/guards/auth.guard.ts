import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        // private oauthService: OAuthService,
        private authService: AuthService,
        private router: Router
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        //   restrict access to un-authenticated users
        // TODO: https://niceprogrammer.com/laravel-api-and-angular-client-tutorial-part-2-client-oauth-login/
        // if (!this.oauthService.hasValidAccessToken()) {
        if (!this.authService.isAuthenticated) {
            this.authService.logout();
            return false;
        }
        return true;
        //

        // Dev mode: uncomment below, comment above
        // return true;
    }
}
