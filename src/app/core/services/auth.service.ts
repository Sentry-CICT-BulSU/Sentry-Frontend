import { IUserTypes } from './../models/user.model';
import { Router } from '@angular/router';
import { environment as env } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { BehaviorSubject, forkJoin, map, pipe, tap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from './local-storage.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { PropertiesService } from './properties.service';

@Injectable()
export class AuthService extends PropertiesService {
    deviceInfo?: any;
    deviceName?: string;

    access_token: any;
    refresh_token: any;

    current_user!: IUser;
    current_user_type?: string;
    user_types: string[] = ['Faculty', 'Admin', 'Attendance Checker'];

    current_user_subject$?: BehaviorSubject<IUser | undefined> =
        new BehaviorSubject<IUser | undefined>(undefined);

    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private localStorage: LocalStorageService,
        private router: Router,
        private oauthService: OAuthService
    ) {
        super();
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
        return this.http.get<IUser>(env.apiRootRoute + '/api/user', {
            headers: this.options.headers,
        });
    }

    loadUser$() {
        const obs$ = forkJoin([this.getUser$()]);

        return obs$.pipe(
            tap(([user]: [IUser]): void => {
                this.current_user = user;
                this.current_user_type = user.type;
                this.current_user_subject$?.next(user);
            })
        );
    }

    getUserTypes$() {
        this.options.headers = this.options.headers.set(
            'Authorization',
            this.oauthService.authorizationHeader()
        );
        return this.http.get<IUserTypes>(env.apiRootRoute + '/api/user/types', {
            headers: this.options.headers,
        });
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
        if (chars.indexOf('!') > -1)
            result += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}
