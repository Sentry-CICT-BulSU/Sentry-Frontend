import { environment as env } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserConfig, IResponse, IUser, IUserCollection } from '../models';
import { PropertiesService } from './properties.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends PropertiesService {
  adminApiRoute = env.apiRootRoute + '/api/admin';

  constructor(private http: HttpClient) {
    super();
  }

  getUsers$() {
    return this.http.get<IUserCollection>(this.adminApiRoute + '/users', {
      headers: this.options.headers,
    });
  }

  getUser$(id: number) {
    return this.http.get<IUserCollection>(this.adminApiRoute + '/users/' + id, {
      headers: this.options.headers,
    });
  }

  createUser$(newUser: IUserConfig) {
    return this.http.post<IResponse>(this.adminApiRoute + '/users', newUser, {
      headers: this.options.headers,
    });
  }

  editUser$(id: number, updatedUser: IUserConfig) {
    return this.http.patch<IUserCollection>(
      this.adminApiRoute + '/users/' + id,
      updatedUser,
      { headers: this.options.headers }
    );
  }

  softDeleteUser$(id: number) {
    return this.http.delete<IResponse>(this.adminApiRoute + '/users/' + id, {
      headers: this.options.headers,
    });
  }

  restoreUser$(restoreUser: IUserConfig) {
    return this.http.post<IResponse>(
      this.adminApiRoute + '/users/' + restoreUser.id + '/restore',
      null,
      { headers: this.options.headers }
    );
  }
}
