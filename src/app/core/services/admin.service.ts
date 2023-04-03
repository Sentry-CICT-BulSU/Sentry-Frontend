import { IUser, IUserCollection } from './../models/user.model';
import { environment as env } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserConfig } from '../models/admin.model';
import { IResponse } from '../models/response.model';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    adminApiRoute = env.apiRootRoute + '/api/admin';
    options = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': '*',
        }),
    };

    constructor(private http: HttpClient) {}

    getUsers$() {
        return this.http.get<IUserCollection>(
            this.adminApiRoute + '/users',
            { headers: this.options.headers }
        );
    }

    getUser$(user: IUser) {
        return this.http.get<IUserCollection>(
            this.adminApiRoute + '/users' + user.id,
            { headers: this.options.headers }
        );
    }

    createUser$(newUser: IUserConfig) {
        return this.http.post<IResponse>(
            this.adminApiRoute + '/users',
            newUser,
            { headers: this.options.headers }
        );
    }

    editUser$(updatedUser: IUserConfig) {
        return this.http.patch<IUserCollection>(
            this.adminApiRoute + '/users/' + updatedUser.id,
            updatedUser,
            { headers: this.options.headers }
        );
    }

    softDeleteUser$(deleteUser: IUserConfig) {
        return this.http.delete<IResponse>(
            this.adminApiRoute + '/users/' + deleteUser.id,
            { headers: this.options.headers }
        );
    }

    restoreUser$(restoreUser: IUserConfig) {
        return this.http.post<IResponse>(
            this.adminApiRoute + '/users/' + restoreUser.id + '/restore',
            null,
            { headers: this.options.headers }
        );
    }
}
