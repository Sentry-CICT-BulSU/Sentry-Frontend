import { IUserTypes } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ISemester } from '../models/semester.model';
import { IUser } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SemesterService {
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

    get loadSemesters() {
        let url;
        if (this.user?.type === 'Admin') {
            url = environment.apiRootRoute + '/api/admin/semesters';
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            url = environment.apiRootRoute + '/api/semesters';
        } else {
            throw new Error('User is not an admin');
        }
        return this.http.get<ISemester>(url, { headers: this.options.headers });
    }

    loadSemester(id: ISemester['id']) {
        let url;
        if (this.user?.type === 'Admin') {
            url = environment.apiRootRoute + '/api/admin/semesters/' + id;
        } else if (
            this.user?.type === 'Attendance Checker' ||
            this.user?.type === 'Faculty'
        ) {
            url = environment.apiRootRoute + '/api/semesters/' + id;
        } else {
            throw new Error('User is anonymous');
        }
        return this.http.get<ISemester>(url, { headers: this.options.headers });
    }
}
