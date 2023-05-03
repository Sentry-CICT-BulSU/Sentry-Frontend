import { environment as env } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserConfig, IResponse, IUserCollection } from '../models';
import { PropertiesService } from './properties.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends PropertiesService {
  constructor(private http: HttpClient) {
    super();
  }

  get adminApiRoute() {
    return env.apiRootRoute + '/api/admin';
  }

  getLists$(type: string) {
    return this.http.get<any>(this.adminApiRoute + '/list', {
      headers: this.options.headers,
      params: { q: type },
    });
  }

  getUsers$(query?: any) {
    return query
      ? this.http.get<IUserCollection>(this.adminApiRoute + '/users', {
          headers: this.options.headers,
          params: query,
        })
      : this.http.get<IUserCollection>(this.adminApiRoute + '/users', {
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

  forceResetPassword$(user_id: number) {
    return this.http.post<IUserCollection>(
      this.adminApiRoute + '/reset-password',
      { user_id: user_id },
      { headers: this.options.headers }
    );
  }

  softDeleteUser$(id: number) {
    return this.http.delete<IResponse>(this.adminApiRoute + '/users/' + id, {
      headers: this.options.headers,
    });
  }

  restoreUser$(id: number) {
    return this.http.post<IResponse>(
      this.adminApiRoute + '/users/' + id + '/restore',
      null,
      { headers: this.options.headers }
    );
  }
}
