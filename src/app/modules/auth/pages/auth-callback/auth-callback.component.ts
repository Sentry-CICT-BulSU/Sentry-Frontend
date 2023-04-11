import { AuthService } from 'src/app/core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Component({
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.scss'],
})
export class AuthCallbackComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        this.route.queryParams.subscribe((tokens) => {
            if (tokens['code']) {
                this.authService
                    .getAccessToken$(tokens['code'], tokens['state'])
                    .pipe(
                        map((tokens) => tokens),
                        catchError((err) => {
                            console.error(err);
                            return of({ tokens: null, error: err });
                        })
                    );
            } else {
                // localStorage.clear();
                console.log('unable to login, please try again');
            }
        });
        // if (this.route.snapshot.data['response']) {
        //     console.log('callback');
        //     this.router.navigate(['/dashboard']);
        // } else {
        //     console.log('unable to login, please try again');
        //     localStorage.clear();
        //     this.router.navigate(['/auth/sign-in']);
        // }
    }
}
