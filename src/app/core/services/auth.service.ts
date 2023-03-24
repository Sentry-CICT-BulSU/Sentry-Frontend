import { Router } from '@angular/router';
import { IToken } from './../models/user.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { catchError, map, Observable, switchMap, tap } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {
    deviceInfo?: any;
    deviceName?: string;
    options?: any;
    authURL: string = `${environment.apiRootRoute}/oauth/token`;
    apiURL: string = `${environment.apiRootRoute}/api`;
    // cookieURL: string = `${environment.apiRootRoute}/sanctum/cookie`;
    clientId: string = environment.clientId;
    clientSecret: string = environment.clientSecret;
    grantType: string = 'client_credentials';

    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private localStorage: LocalStorageService,
        private router: Router,
    ) {
        this.initDevice();
        this.initHeaders();
    }

    initHeaders() {
        this.options = {
            headers: new HttpHeaders({
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }),
        };
    }

    initDevice() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.deviceName = this.deviceInfo.userAgent ?? 'Unknown';
    }

    getUser() {
        return this.localStorage.get('user') ?? '';
    }
    getRefreshToken() {
        return this.localStorage.get('refresh_token') ?? '';
    }
    getToken() {
        return this.localStorage.get('access_token') ?? '';
    }

    isAuthenticated(): boolean {
        // TODO: check if token is expired
        return !!this.getToken();
    }

    login(req: {
        email: string,
        password: string;
    }): Observable<any> {

        // return this.http.post<any>(
        //     this.authURL, req, this.options
        // ).pipe(
        //     tap((response: any) => {
        //         this.localStorage.set('access_token', response.token);
        //         this.localStorage.set('refresh_token', response.refresh_token);
        //     }),
        // );

        return this.http.post<any>(
            this.authURL, {
            grant_type: this.grantType,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            username: req.email,
            password: req.password
        }, this.options
        ).pipe(
            tap((response: any) => {
                this.localStorage.set('access_token', response.token);
                this.localStorage.set('refresh_token', response.refresh_token);
            }),
        );
    }

    logout(): void {
        this.localStorage.remove('user');
        this.localStorage.remove('access_token');
        this.localStorage.remove('refresh_token');
        this.router.navigate(['/auth/sign-in']);
    }

    handleError(error: any) {
        console.log(error);
        return error;
    }
}
