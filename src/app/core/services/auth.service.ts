import { IUserTypes } from './../models/user.model';
import { Router } from '@angular/router';
import { environment as env } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { BehaviorSubject, catchError, combineLatest, forkJoin, map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from './local-storage.service';
import { OAuthService, JwksValidationHandler, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {
    deviceInfo?: any;
    deviceName?: string;
    options?: any = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        })
    };

    access_token: any;
    refresh_token: any;

    current_user!: IUser;
    current_user_type: any;
    user_types!: IUserTypes;

    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private localStorage: LocalStorageService,
        private router: Router,
        private oauthService: OAuthService
    ) {
        this.initDevice();
    }

    initDevice() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.deviceName = this.deviceInfo.userAgent ?? 'Unknown';
    }

    handleCallback$() {
        this.loadUser$();
    }

    getUser$() {
        // this.options.headers = this.options.headers.set('Authorization', this.oauthService.authorizationHeader());
        return this.http.get<IUser>(env.apiRootRoute + '/api/user', { headers: this.options.headers });
    }

    loadUser$() {
        const obs$ = forkJoin([
            this.getUserTypes$(),
            this.getUser$()
        ]);

        return obs$.pipe(
            tap(([types, user]) => {
                this.current_user = user;
                this.user_types = types;
                this.current_user_type = this.user_types.cast[+this.current_user.type];
            }),
        );
    }

    getUserTypes$() {
        this.options.headers = this.options.headers.set('Authorization', this.oauthService.authorizationHeader());
        return this.http.get<IUserTypes>(env.apiRootRoute + '/api/user/types', { headers: this.options.headers });
    }

    getRefreshToken() {
        return this.oauthService.getRefreshToken();
    }
    getToken() {
        return this.oauthService.getAccessToken();
    }

    isAuthenticated(): boolean {
        // TODO: check if token is expired
        return !!this.getToken();
    }

    login() {
        return this.oauthService.initCodeFlow();
    }

    logout(): void {
        this.oauthService.logOut();
        this.router.navigate(['/auth/sign-in']);
    }

    handleError(error: any) {
        console.log(error);
        return error;
    }
    private randomString(length: any, chars: any) {
        let result = '';
        if (chars.indexOf('a') > -1) result += 'abcdefghijklmnopqrstuvwxyz';
        if (chars.indexOf('A') > -1) result += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (chars.indexOf('#') > -1) result += '0123456789';
        if (chars.indexOf('!') > -1) result += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        for (var i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}
