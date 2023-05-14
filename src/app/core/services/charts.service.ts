import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from './auth.service';
import { environment as env } from 'src/environments/environment';
import { PropertiesService } from './properties.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartsService extends PropertiesService {
  user?: IUser;
  constructor(private http: HttpClient, private auth: AuthService) {
    super();
    auth.current_user_subject$?.subscribe((user) => (this.user = user));
  }

  get url() {
    return env.apiRootRoute + '/api/charts';
  }

  loadCharts$() {
    return this.http
      .get<any>(this.url, { headers: this.options.headers })
      .pipe(tap((data) => console.log('charts: ', data)));
  }
}
