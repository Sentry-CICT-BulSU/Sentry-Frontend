import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { IUser, ISchedule, IScheduleCollection } from '../models';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PropertiesService } from './properties.service';

@Injectable({
    providedIn: 'root',
})
export class ScheduleService extends PropertiesService {
    user?: IUser;
    constructor(private authService: AuthService, private http: HttpClient) {
        super();
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
