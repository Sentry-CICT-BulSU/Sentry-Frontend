import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { environment as env } from 'src/environments/environment';
import { ISectionCollection, IUser } from '../models';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SectionService extends PropertiesService {
  user?: IUser;
  constructor(private authService: AuthService, private http: HttpClient) {
    super();
    this.authService.current_user_subject$?.subscribe(
      (user: IUser | undefined) => (this.user = user)
    );
  }

  get url() {
    if (!this.user) throw new Error('User is not defined');
    if (this.user.type === 'Admin') {
      return env.apiRootRoute + '/api/admin/sections';
    } else if (
      this.user.type === 'Attendance Checker' ||
      this.user.type === 'Faculty'
    ) {
      return env.apiRootRoute + '/api/sections';
    } else {
      throw new Error('User is not an admin');
    }
  }

  loadSections$(query?: string) {
    return query
      ? this.http.get<ISectionCollection>(this.url, {
          headers: this.options.headers,
          params: { q: query },
        })
      : this.http.get<ISectionCollection>(this.url, {
          headers: this.options.headers,
        });
  }

  loadSection$(id: number) {
    return this.http.get<ISectionCollection>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }

  addSection$(body: any) {
    return this.http.post<ISectionCollection>(this.url, body, {
      headers: this.options.headers,
    });
  }
}
