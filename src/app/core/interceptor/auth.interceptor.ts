import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    headerName = 'X-XSRF-TOKEN';
    constructor(private tokenService: HttpXsrfTokenExtractor, private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authService.getToken()}`
                }
            });
        }
        return next.handle(req);
    }
}
