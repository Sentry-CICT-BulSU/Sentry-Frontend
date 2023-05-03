import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { AuthService } from './auth.service';
import { IUser } from '../models';
import { environment as env } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportsService extends PropertiesService {
  user?: IUser;
  constructor(private auth: AuthService, private http: HttpClient) {
    super();
    this.auth.current_user_subject$?.subscribe((user) => (this.user = user));
  }
  get url() {
    if (!this.user) throw new Error('User is not defined');
    if (this.user.type === 'Admin') {
      return env.apiRootRoute + '/api/admin/reports';
    } else if (
      this.user.type === 'Attendance Checker' ||
      this.user.type === 'Faculty'
    ) {
      return env.apiRootRoute + '/api/reports';
    } else {
      throw new Error('User is not an admin');
    }
  }

  getReport$(query: any) {
    return this.http.get(this.url, {
      headers: this.options.headers,
      params: query,
    });
  }
}
