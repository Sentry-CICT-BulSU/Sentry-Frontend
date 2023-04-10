import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRoomKey, IRoomKeyCollection } from '../models/room-key.model';
import { IUser } from '../models/user.model';
import { environment as env } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class RoomKeyService {
    options = {
        headers: new HttpHeaders({
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }),
    };
    user?: IUser;
    constructor(private http: HttpClient, private authService: AuthService) {
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

    getRoomKeys() {
        return this.http.get<IRoomKeyCollection>(this.url, {
            headers: this.options.headers,
        });
    }
    getRoomKey(id: number) {
        return this.http.get<IRoomKeyCollection>(this.url + '/' + id, {
            headers: this.options.headers,
        });
    }
}
