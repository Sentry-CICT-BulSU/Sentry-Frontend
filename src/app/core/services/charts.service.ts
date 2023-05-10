import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../models';
import { AuthService } from './auth.service';
import { environment as env } from 'src/environments/environment';
import { PropertiesService } from './properties.service';
import { delay, of } from 'rxjs';

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
    // return this.http.get<any>(this.url, { headers: this.options.headers });
    return of({
      presentees: [1, 1, 2, 1, 1, 3, 1],
      period: [
        '2023-05-03',
        '2023-05-04',
        '2023-05-05',
        '2023-05-06',
        '2023-05-07',
        '2023-05-08',
        '2023-05-09',
        '2023-05-10',
      ],
      absentees: [0, 1, 1, 0, 0, 1, 0],
    }).pipe(delay(1000));
  }
}
