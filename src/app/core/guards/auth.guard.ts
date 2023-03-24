import { LocalStorageService } from './../services/local-storage.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private localStorage: LocalStorageService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        //   restrict access to un-authenticated users
        if (this.localStorage.get('access_token') === null || this.localStorage.get('user') === null) {
            // navigate to login page if user is not authenticated
            this.localStorage.remove('access_token');
            this.localStorage.remove('user');
            this.router.navigate(['/auth/sign-in']);
            return false;
        }
        return true;
    }
}
