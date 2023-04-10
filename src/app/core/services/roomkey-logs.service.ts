import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoomKeyLogCollection, IUser } from '../models';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { PropertiesService } from './properties.service';

@Injectable({
    providedIn: 'root',
})
export class RoomKeyLogsService extends PropertiesService {
    user?: IUser;
    constructor(private http: HttpClient, private authService: AuthService) {
        super();
        this.authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => (this.user = user)
        );
    }
    get url() {
        if (this.user?.type === 'Admin') {
            return env.apiRootRoute + '/api/admin/logs';
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            return env.apiRootRoute + '/api/logs';
        } else {
            throw new Error('User is not an admin');
        }
    }

    getRoomKeyLogs$() {
        return this.http.get<IRoomKeyLogCollection>(this.url, {
            headers: this.options.headers,
        });
    }
}