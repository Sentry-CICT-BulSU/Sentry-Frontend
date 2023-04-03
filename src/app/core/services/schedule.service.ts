import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISchedule, IScheduleCollection } from '../models/schedule.model';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService {
    options = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    };
    user?: IUser;
    constructor(private authService: AuthService, private http: HttpClient) {
        this.authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => (this.user = user)
        );
    }

    get url() {
        if (this.user?.type === 'Admin') {
            return environment.apiRootRoute + '/api/admin/schedules';
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            return environment.apiRootRoute + '/api/schedules';
        } else {
            throw new Error('User is not an admin');
        }
    }

    loadSchedules$(): Observable<IScheduleCollection> {
        return this.http.get<IScheduleCollection>(this.url, {
            headers: this.options.headers,
        });
    }

    loadSchedule$(id: ISchedule['id']): Observable<ISchedule> {
        return this.http.get<ISchedule>(this.url + '/' + id, {
            headers: this.options.headers,
        });
    }
}
