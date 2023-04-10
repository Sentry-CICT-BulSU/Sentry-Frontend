/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
    Resolve,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models';

@Injectable({
    providedIn: 'root',
})
export class AuthResolver implements Resolve<IUser> {
    constructor(private authService: AuthService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IUser> {
        return this.authService.getUser$();
    }
}
