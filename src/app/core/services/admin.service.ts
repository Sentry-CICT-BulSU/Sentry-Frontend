import { environment as env } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserConfig } from '../models/admin.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    adminApiRoute = env.apiRootRoute + '/api/admin';
    options: any = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*'
        })
    };

    constructor(private http: HttpClient) { }

    createUser(newUser: IUserConfig) {
        return this.http.post(
            this.adminApiRoute + '/users',
            newUser, { headers: this.options.headers }
        );
    }

    editUser(updatedUser: IUserConfig) {
        return this.http.patch(
            this.adminApiRoute + '/users/' + updatedUser.id,
            updatedUser, { headers: this.options.headers }
        );
    }

    softDeleteUser(deleteUser: IUserConfig) {
        return this.http.delete(
            this.adminApiRoute + '/users/' + deleteUser.id,
            { headers: this.options.headers }
        );
    }

    restoreUser(restoreUser: IUserConfig) {
        return this.http.post(
            this.adminApiRoute + '/users/' + restoreUser.id + '/restore',
            null, { headers: this.options.headers }
        );
    }
}
