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
export class CredentialsInterceptor implements HttpInterceptor {

    headerName = 'X-XSRF-TOKEN';
    constructor(private tokenService: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // req = req.clone({ withCredentials: true });
        // req.headers.set('withCredentials', 'true');
        // if (req.method === 'GET' || req.method === 'HEAD') {
        //     return next.handle(req);
        // }

        // const token = this.tokenService.getToken();
        // // Be careful not to overwrite an existing header of the same name.
        // if (token !== null && !req.headers.has(this.headerName)) {
        //     req = req.clone({ headers: req.headers.set(this.headerName, token) });
        // }

        return next.handle(req);
    }
}
