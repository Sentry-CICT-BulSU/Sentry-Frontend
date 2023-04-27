import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { HttpClient } from '@angular/common/http';
import { IResponse, ISubjectCollection, IUser } from '../models';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubjectService extends PropertiesService {
  user?: IUser;
  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    this.authService.current_user_subject$?.subscribe(
      (user: IUser | undefined) => (this.user = user)
    );
  }

  get url() {
    if (this.user?.type === 'Admin') {
      return env.apiRootRoute + '/api/admin/subjects';
    } else if (
      this.user?.type === 'Attendance Checker' ||
      this.user?.type === 'Faculty'
    ) {
      return env.apiRootRoute + '/api/subjects';
    } else {
      throw new Error('User is not an admin');
    }
  }

  loadSubjects$(query?: { q: string }) {
    return query
      ? this.http.get<ISubjectCollection>(this.url, {
          headers: this.options.headers,
          params: { q: query.q },
        })
      : this.http.get<ISubjectCollection>(this.url, {
          headers: this.options.headers,
        });
  }

  loadSubject$(id: number) {
    return this.http.get<ISubjectCollection>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }

  addSuject$(body: { title: string; code: string; status: string }) {
    return this.http.post<ISubjectCollection>(this.url, body, {
      headers: this.options.headers,
    });
  }

  deleteSubject$(id: number) {
    return this.http.delete<IResponse>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }
}
