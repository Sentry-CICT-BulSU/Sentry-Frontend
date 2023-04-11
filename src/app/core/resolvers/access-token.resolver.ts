/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    Resolve,
    ActivatedRoute,
} from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AccessTokenResolver implements Resolve<any> {
    constructor(
        private authService: AuthService,
        private route: ActivatedRoute
    ) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        console.log(route.queryParams);
        return this.authService.getAccessToken$(
            route.queryParams['code'] as string,
            route.queryParams['state'] as string
        );
    }
}
