import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ISemesterCollection } from '../models/semester.model';
import { IResponse, IUser } from '../models';
import { environment } from 'src/environments/environment';
import { PropertiesService } from './properties.service';

@Injectable({
  providedIn: 'root',
})
export class SemesterService extends PropertiesService {
  user?: IUser;
  constructor(private authService: AuthService, private http: HttpClient) {
    super();
    this.authService.current_user_subject$?.subscribe(
      (user: IUser | undefined) => (this.user = user)
    );
  }

  get url() {
    if (this.user?.type === 'Admin') {
      return environment.apiRootRoute + '/api/admin/semesters';
    } else if (
      this.user?.type === 'Attendance Checker' ||
      this.user?.type === 'Faculty'
    ) {
      return environment.apiRootRoute + '/api/semesters';
    } else {
      throw new Error('User is not an admin');
    }
  }

  loadSemesters$(query?: any) {
    return query
      ? this.http.get<ISemesterCollection>(this.url, {
          headers: this.options.headers,
          params: query,
        })
      : this.http.get<ISemesterCollection>(this.url, {
          headers: this.options.headers,
        });
  }

  loadSemester$(id: number) {
    return this.http.get<ISemesterCollection>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }

  addSemester$(semester: any) {
    return this.http.post<ISemesterCollection>(this.url, semester, {
      headers: this.options.headers,
    });
  }

  editSemester$(id: number, body: any) {
    return this.http.patch<ISemesterCollection>(this.url + '/' + id, body, {
      headers: this.options.headers,
    });
  }

  softDeleteSemester$(id: number) {
    return this.http.delete<IResponse>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }

  restoreSemester$(id: number) {
    return this.http.post<IResponse>(this.url + '/' + id + '/restore', null, {
      headers: this.options.headers,
    });
  }
}
