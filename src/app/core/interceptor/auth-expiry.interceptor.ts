import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpXsrfTokenExtractor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthExpiryInterceptor implements HttpInterceptor {

    headerName = 'X-XSRF-TOKEN';
    constructor(private tokenService: HttpXsrfTokenExtractor, private route: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req);
        // .pipe(
        //     tap((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //             // do stuff with response if you want
        //         }
        //     }, (err: any) => {
        //         if (err instanceof HttpErrorResponse) {
        //             if (err.status === 401) {
        //                 // redirect to the login route
        //                 // or show a modal
        //                 this.route.navigate(['/auth/sign-in']);
        //             }
        //         }
        //     })
        // );
    }
}
