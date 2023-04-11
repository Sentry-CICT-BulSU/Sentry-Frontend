import { Router } from '@angular/router';
import { environment as env } from './../../../environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IUser, IUserTypes } from '../models';
import {
    BehaviorSubject,
    Observable,
    catchError,
    forkJoin,
    map,
    of,
    tap,
} from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from './local-storage.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { PropertiesService } from './properties.service';
import CryptoJS from 'crypto-js';
import sha256 from 'crypto-js/sha256';

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

    isAuth = false;
    public onLogin: EventEmitter<boolean> = new EventEmitter();
    public onLogout: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private http: HttpClient,
        private deviceService: DeviceDetectorService,
        private router: Router // private oauthService: OAuthService
    ) {
        super();
        this.initDevice();
        const acessToken: string = localStorage.getItem('accessToken') || '';
        this.isAuth = acessToken.length > 0;
    }

    initDevice() {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        this.deviceName = this.deviceInfo.userAgent ?? 'Unknown';
    }

    handleCallback$() {
        this.loadUser$();
    }

    getUser$() {
        return this.http
            .get<IUser>(env.apiRootRoute + '/api/user', {
                headers: this.options.headers,
            })
            .pipe(
                tap((user: IUser): void => {
                    console.log(user);
                    this.current_user = user;
                    this.current_user_type = user.type;
                    this.current_user_subject$?.next(user);
                }),
                catchError((err) => {
                    // TODO: flash error to login page that user is logout and need to relogin
                    this.logout();
                    return of(null);
                })
            );
    }

    loadUser$() {
        const obs$ = forkJoin([this.getUser$()]);

        return obs$.pipe(
            tap(([user]: [IUser | null]): void => {
                this.current_user = user as IUser;
                this.current_user_type = this.current_user.type;
                this.current_user_subject$?.next(this.current_user);
            })
        );
    }

    get isAuthenticated() {
        return this.isAuth;
    }

    login() {
        const state = this.strRandom(40);
        const codeVerifier = this.strRandom(128);
        localStorage.setItem('state', state);
        localStorage.setItem('codeVerifier', codeVerifier);
        const codeVerifierHash = sha256(codeVerifier).toString(
            CryptoJS.enc.Base64
        );
        const codeChallenge = codeVerifierHash
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
        const params = [
            'client_id=' + env.oauthClientId,
            'redirect_uri=' + encodeURIComponent(env.oauthCallbackUrl),
            'response_type=code',
            'scope=',
            'state=' + state,
            'code_challenge=' + codeChallenge,
            'code_challenge_method=S256',
        ];
        window.location.href = env.oauthLoginUrl + '?' + params.join('&');
    }

    logout(): void {
        localStorage.clear();
        this.isAuth = false;
        this.onLogout.emit(false);
        this.router.navigate(['/auth/sign-in']);
    }

    getAccessToken$(code: string, state: string) {
        if (state !== localStorage.getItem('state')) {
            return new Observable((o) => {
                o.next(false);
            });
        }
        const payload = new HttpParams()
            .append('grant_type', 'authorization_code')
            .append('client_id', env.oauthClientId)
            .append('redirect_uri', env.oauthCallbackUrl)
            .append(
                'code_verifier',
                <string>localStorage.getItem('codeVerifier')
            )
            .append('code', code);
        return this.http
            .post(env.oauthTokenUrl, payload, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .pipe(
                map((response: any) => {
                    localStorage.setItem('tokenType', response.token_type);
                    localStorage.setItem('expiresIn', response.expires_in);
                    localStorage.setItem('accessToken', response.access_token);
                    localStorage.setItem(
                        'refreshToken',
                        response.refresh_token
                    );
                    this.isAuth = true;
                    this.onLogin.emit(true);
                    return response;
                })
            );
    }

    get accessToken() {
        return localStorage.getItem('accessToken');
    }
    get expiresIn() {
        return localStorage.getItem('expiresIn');
    }
    get refreshToken() {
        return localStorage.getItem('refreshToken');
    }
    get tokenType() {
        return localStorage.getItem('tokenType');
    }

    handleError(error: any) {
        console.log(error);
        return error;
    }
    private strRandom(length: number) {
        let result = '';
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
}
