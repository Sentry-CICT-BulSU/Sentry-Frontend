import { LocalStorageService } from './../services/local-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    constructor(
        private router: Router,
        private localStorage: LocalStorageService
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


        // restrict access for authenticated users
        if (this.localStorage.get('access_token') !== null && this.localStorage.get('user') !== null) {
            // navigate to root if user is authenticated
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }

}
