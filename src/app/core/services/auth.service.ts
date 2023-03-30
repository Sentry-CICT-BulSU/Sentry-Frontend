import { Router } from '@angular/router';
import { IToken } from './../models/user.model';
import { environment as env } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { BehaviorSubject, catchError, combineLatest, map, Observable, ReplaySubject, switchMap, tap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from './local-storage.service';
import { OAuthService, JwksValidationHandler, AuthConfig, OAuthErrorEvent } from 'angular-oauth2-oidc';

@Injectable()
export class AuthService {
    deviceInfo?: any;
    deviceName?: string;
    options?: any;

    access_token: any;
    refresh_token: any;

    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private localStorage: LocalStorageService,
        private router: Router,
        private oauthService: OAuthService
    ) {
        this.initDevice();
        this.initHeaders();
    }

    initHeaders() {
        this.options = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            }),
        };
    }

    initDevice() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.deviceName = this.deviceInfo.userAgent ?? 'Unknown';
    }

    handleCallback() {
        // this.access_token = this.oauthService.getAccessToken();
        // this.refresh_token = this.oauthService.getRefreshToken();
        this.getUser().subscribe((user) => {
            localStorage.setItem('user', JSON.stringify(user));
        });
        this.getUserTypes().subscribe((types) => {
            localStorage.setItem('types', JSON.stringify(types));
        });
    }

    getHeaders() {
        return new HttpHeaders().set('Authorization', this.oauthService.authorizationHeader());
    }

    getUser() {
        this.options.headers = this.options.headers.set('Authorization', this.oauthService.authorizationHeader());
        return this.http.get(env.apiRootRoute + '/api/user', this.options);
    }

    getUserTypes() {
        this.options.headers = this.options.headers.set('Authorization', this.oauthService.authorizationHeader());
        return this.http.get(env.apiRootRoute + '/api/user/types', this.options);
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
