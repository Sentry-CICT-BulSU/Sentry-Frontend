import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { environment as env } from 'src/environments/environment';
import {
  IResponse,
  IRoomCollection,
  IRoomKeyCollection,
  IUser,
} from '../models';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends PropertiesService {
  user?: IUser;
  constructor(private authService: AuthService, private http: HttpClient) {
    super();
    this.authService.current_user_subject$?.subscribe(
      (user: IUser | undefined) => (this.user = user)
    );
  }

  get url() {
    if (this.user?.type === 'Admin') {
      return env.apiRootRoute + '/api/admin/rooms';
    } else if (
      this.user?.type === 'Attendance Checker' ||
      this.user?.type === 'Faculty'
    ) {
      return env.apiRootRoute + '/api/rooms';
    } else {
      throw new Error('User is not an admin');
    }
  }

  loadRooms$(query?: { q: string }) {
    return query
      ? this.http.get<IRoomCollection>(this.url, {
          headers: this.options.headers,
          params: { q: query.q },
        })
      : this.http.get<IRoomCollection>(this.url, {
          headers: this.options.headers,
        });
  }

  loadRoom$(id: number) {
    return this.http.get<IRoomCollection>(this.url + '' + id, {
      headers: this.options.headers,
    });
  }

  addRoom$(body: { name: string; location: string; status: string }) {
    return this.http.post<IRoomKeyCollection>(this.url, body, {
      headers: this.options.headers,
    });
  }

  deleteRoom$(id: number) {
    return this.http.delete<IResponse>(this.url + '/' + id, {
      headers: this.options.headers,
    });
  }
}
