import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        // private oauthService: OAuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        if (this.route.snapshot.data['response']) {
            console.log(this.route.snapshot.data['response']);
            this.router.navigate(['/dashboard']);
        } else {
            console.log('unable to login, please try again');
            localStorage.clear();
            this.router.navigate(['/auth/sign-in']);
        }
    }
}
