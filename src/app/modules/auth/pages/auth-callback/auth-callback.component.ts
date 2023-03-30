import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

    constructor(
        private oauthService: OAuthService,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit(): void {
        console.log('access token: ', this.oauthService.getAccessToken());
        console.log('refresh token: ', this.oauthService.getRefreshToken());

        this.authService.handleCallback();

        this.router.navigate(['/dashboard']);
    }
}
