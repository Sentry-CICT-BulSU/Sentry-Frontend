import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IRoomKeyLog, IRoomKeyCollection } from '../models';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { PropertiesService } from './properties.service';

@Injectable({
    providedIn: 'root',
})
export class RoomKeyService extends PropertiesService {
    user?: IUser;
    constructor(private http: HttpClient, private authService: AuthService) {
        super();
        this.authService.current_user_subject$?.subscribe(
            (user: IUser | undefined) => (this.user = user)
        );
    }

    get url() {
        if (this.user?.type === 'Admin') {
            return env.apiRootRoute + '/api/admin/keys';
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            return env.apiRootRoute + '/api/keys';
        } else {
            throw new Error('User is not an admin');
        }
    }

    getRoomKeys$() {
        return this.http.get<IRoomKeyCollection>(this.url, {
            headers: this.options.headers,
        });
    }
    getRoomKey$(id: number) {
        return this.http.get<IRoomKeyCollection>(this.url + '/' + id, {
            headers: this.options.headers,
        });
    }
    borrowRoomKey$(value: any) {
        console.log(value);
        const body = {
            room_key_id: value.room_key_id,
            faculty_id: value.faculty_id,
            subject_id: value.subject_id,
        };
        return this.http.post<IRoomKeyLog>(this.url, body, {
            headers: this.options.headers,
        });
    }
}
