import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import {
  IAttendanceCollection,
  IAttendanceStatistics,
  IScheduleCollection,
  IUser,
} from '../models';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends PropertiesService {
  user?: IUser;
  constructor(private http: HttpClient, private authService: AuthService) {
    super();
    authService.current_user_subject$?.subscribe((user) => (this.user = user));
  }

  get url() {
    if (this.user?.type === 'Admin') {
      return env.apiRootRoute + '/api/admin/attendances';
    } else if (
      this.user?.type === 'Attendance Checker' ||
      this.user?.type === 'Faculty'
    ) {
      return env.apiRootRoute + '/api/attendances';
    } else {
      throw new Error('User is not an admin');
    }
  }

  loadAttendances$(id?: number) {
    return id
      ? this.http.get<IAttendanceCollection>(this.url + '/user/' + id, {
          headers: this.options.headers,
        })
      : this.http.get<IScheduleCollection>(this.url, {
          headers: this.options.headers,
        });
  }
  loadAttendance$(id: number) {
    return this.http.get<IAttendanceCollection>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }
  addAttendance$(schedule_id: number, body: any) {
    return this.http.post<IAttendanceCollection>(
      env.apiRootRoute + '/api/schedules/' + schedule_id + '/attendances',
      body
    );
  }

  loadStatistics$() {
    return this.http.get<IAttendanceStatistics>(this.url + '/stats', {
      headers: this.options.headers,
    });
  }
}
